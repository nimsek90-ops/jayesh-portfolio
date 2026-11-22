import os
import sys
import subprocess
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
import imageio_ffmpeg

def generate_drone_video():
    src_path = "public/images/kit_college_clean.png"
    if not os.path.exists(src_path):
        src_path = "C:/Users/Niraj/.gemini/antigravity/brain/11bcf3de-c127-4c6f-95fb-f47e64b1fc1a/.user_uploaded/media_1795014572997_371aba5e.png"

    raw_img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = raw_img.size

    # Remove Google Lens watermark at bottom left if present in raw
    arr = np.array(raw_img, dtype=float)
    # Check if bottom-left watermark exists
    sub = arr[orig_h-80:orig_h-10, 10:80]
    mask = np.zeros((70, 70), dtype=float)
    y_idx, x_idx = np.ogrid[:70, :70]
    dist = np.sqrt((x_idx - 35)**2 + (y_idx - 35)**2)
    mask = np.clip(1.0 - (dist - 25) / 10.0, 0.0, 1.0)
    source_patch = arr[orig_h-150:orig_h-80, 10:80]
    for c in range(3):
        arr[orig_h-80:orig_h-10, 10:80, c] = arr[orig_h-80:orig_h-10, 10:80, c] * (1.0 - mask) + source_patch[:, :, c] * mask

    clean_img = Image.fromarray(np.uint8(arr))
    os.makedirs("public/images", exist_ok=True)
    os.makedirs("public/videos", exist_ok=True)

    # 1. Base High-Res Canvas
    # We want 1280x720 video output (16:9).
    # To allow +18% camera zoom in and subtle pan without hitting borders,
    # we resize base image to 1536x1042 (retaining original proportions ~1.474)
    canvas_w = 1536
    canvas_h = int(canvas_w * (orig_h / orig_w))
    base_img = clean_img.resize((canvas_w, canvas_h), Image.Resampling.LANCZOS)
    base_np = np.array(base_img, dtype=np.float32)

    # Save high-res aerial photo for portfolio
    base_img.save("public/images/kit_campus_aerial.webp", "WEBP", quality=92)
    print("Saved public/images/kit_campus_aerial.webp")

    # 2. Compute Depth Map & Foliage Mask
    # Y-gradient from 0.15 (far sky/hills at top) to 1.0 (foreground at bottom)
    H, W, _ = base_np.shape
    y_coords, x_coords = np.mgrid[0:H, 0:W]
    depth_map = 0.15 + 0.85 * (y_coords / float(H))**1.3

    # Building boost: central academic building is around y: 0.25*H to 0.65*H
    # Keep building at mid-depth (0.45 - 0.55) so it zooms steadily
    bldg_mask = (y_coords > 0.22 * H) & (y_coords < 0.68 * H) & (x_coords > 0.08 * W) & (x_coords < 0.92 * W)
    depth_map[bldg_mask] = np.clip(depth_map[bldg_mask], 0.40, 0.60)

    # Foliage detection for leaf micro-flutter
    # In HSV: green hue is around G > R and G > B
    r, g, b = base_np[:, :, 0], base_np[:, :, 1], base_np[:, :, 2]
    is_green = (g > r * 1.05) & (g > b * 1.05) & (g > 60)
    # Exclude building roofs
    foliage_mask = is_green & (~bldg_mask)
    foliage_float = foliage_mask.astype(np.float32)

    # Smooth foliage mask
    foliage_pil = Image.fromarray((foliage_float * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=3))
    foliage_float = np.array(foliage_pil, dtype=np.float32) / 255.0

    # 3. Video Parameters
    out_w = 1280
    out_h = 720
    fps = 30
    duration_sec = 6.0
    total_frames = int(fps * duration_sec) # 180 frames

    # Center focus: Central entrance tower
    center_x = W * 0.49
    center_y = H * 0.46

    # Setup ffmpeg process for MP4 (H.264)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    mp4_out = "public/videos/kit_campus_drone_cinematic.mp4"
    webm_out = "public/videos/kit_campus_drone_cinematic.webm"

    cmd_mp4 = [
        ffmpeg_exe, "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{out_w}x{out_h}",
        "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "19",
        "-movflags", "+faststart",
        mp4_out
    ]

    print(f"Rendering {total_frames} cinematic drone frames...")
    proc_mp4 = subprocess.Popen(cmd_mp4, stdin=subprocess.PIPE)

    # Precompute meshgrid for output frame
    out_y, out_x = np.mgrid[0:out_h, 0:out_w]

    # Pre-generate optical vignette
    vig_x = (out_x - out_w / 2.0) / (out_w / 2.0)
    vig_y = (out_y - out_h / 2.0) / (out_h / 2.0)
    vig_dist = np.sqrt(vig_x**2 + vig_y**2)
    vignette = np.clip(1.0 - 0.22 * (vig_dist**2), 0.78, 1.0)[:, :, np.newaxis]

    first_frame_saved = False

    for frame_idx in range(total_frames):
        # Progress parameter t in [0, 1]
        t = frame_idx / float(total_frames)

        # Smooth cyclic drone movement (push-in then subtle majestic hover / return)
        # Using smooth half-cosine ease: t_cycle from 0.0 to 1.0 and back
        cycle = 0.5 - 0.5 * np.cos(2.0 * np.pi * t)
        # Eased push-in
        ease_cycle = cycle ** 1.3

        # Camera zoom: 1.0x to 1.15x
        zoom = 1.0 + 0.15 * ease_cycle

        # Camera translation: subtle forward glide + slight altitude drop + subtle lateral drift
        shift_y = 18.0 * ease_cycle
        shift_x = 8.0 * np.sin(2.0 * np.pi * t)

        # Compute source coordinates for output pixels with depth parallax
        # Base scale relative to output window size
        base_scale = (out_w / float(W)) * 1.12 # slightly zoomed in so 16:9 fits cleanly

        # Center in canvas coordinates
        src_cx = center_x + shift_x
        src_cy = center_y + shift_y

        # Output coordinate offsets from center
        dx = (out_x - out_w / 2.0) / (base_scale * zoom)
        dy = (out_y - out_h / 2.0) / (base_scale * zoom)

        # Parallax factor based on vertical position (near elements expand faster)
        parallax_scale = 1.0 + 0.08 * ease_cycle * (out_y / float(out_h) - 0.5)

        src_x = np.clip(src_cx + dx * parallax_scale, 0, W - 1)
        src_y = np.clip(src_cy + dy * parallax_scale, 0, H - 1)

        # Leaf micro-flutter in foliage
        flutter_amp = 1.2
        leaf_dx = flutter_amp * np.sin(4.0 * np.pi * t + src_x * 0.08) * np.cos(src_y * 0.05)
        leaf_dy = flutter_amp * 0.7 * np.cos(3.2 * np.pi * t + src_y * 0.08) * np.sin(src_x * 0.06)

        # Bilinear interpolation
        x0 = np.floor(src_x).astype(int)
        x1 = np.clip(x0 + 1, 0, W - 1)
        y0 = np.floor(src_y).astype(int)
        y1 = np.clip(y0 + 1, 0, H - 1)

        wx = (src_x - x0)[:, :, np.newaxis]
        wy = (src_y - y0)[:, :, np.newaxis]

        frame = (
            base_np[y0, x0] * (1 - wx) * (1 - wy) +
            base_np[y0, x1] * wx * (1 - wy) +
            base_np[y1, x0] * (1 - wx) * wy +
            base_np[y1, x1] * wx * wy
        )

        # Apply subtle foliage flutter on green pixels
        fol_crop = foliage_float[y0, x0][:, :, np.newaxis]
        frame += fol_crop * (np.sin(6.0 * np.pi * t + src_x * 0.05)[:, :, np.newaxis] * 2.5)

        # Cinematic color grade:
        # 1. Subtle S-curve contrast boost
        frame = frame / 255.0
        frame = frame ** 0.95 # slight shadow lift
        frame = 3.0 * (frame**2) - 2.0 * (frame**3) # smooth S-curve
        frame = np.clip(frame, 0.0, 1.0) * 255.0

        # 2. Warm ambient sunlight grading (slight golden warmth in highlights)
        frame[:, :, 0] = np.clip(frame[:, :, 0] * 1.02 + 1.0, 0, 255) # Red +2%
        frame[:, :, 1] = np.clip(frame[:, :, 1] * 1.01, 0, 255)       # Green +1%
        frame[:, :, 2] = np.clip(frame[:, :, 2] * 0.98, 0, 255)       # Blue -2%

        # 3. Apply subtle optical vignette
        frame = np.clip(frame * vignette, 0, 255).astype(np.uint8)

        # Save first frame as high-quality poster
        if not first_frame_saved:
            poster = Image.fromarray(frame)
            poster.save("public/images/kit_campus_poster.webp", "WEBP", quality=94)
            poster.save("public/images/kit_campus_poster.jpg", "JPEG", quality=92)
            print("Saved public/images/kit_campus_poster.webp & .jpg")
            first_frame_saved = True

        proc_mp4.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 45 == 0:
            print(f"Rendered {frame_idx + 1}/{total_frames} frames ({int((frame_idx+1)/total_frames*100)}%)...")

    proc_mp4.stdin.close()
    proc_mp4.wait()
    print("MP4 drone video generated successfully:", mp4_out)

    # Convert MP4 to WebM (VP9) for ultimate modern browser compatibility
    print("Generating WebM video...")
    cmd_webm = [
        ffmpeg_exe, "-y",
        "-i", mp4_out,
        "-c:v", "libvpx-vp9",
        "-b:v", "1800k",
        "-crf", "24",
        "-pix_fmt", "yuv420p",
        webm_out
    ]
    subprocess.run(cmd_webm, check=True)
    print("WebM drone video generated successfully:", webm_out)

if __name__ == "__main__":
    generate_drone_video()
