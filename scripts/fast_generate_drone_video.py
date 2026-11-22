import os
import subprocess
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
import imageio_ffmpeg

def run():
    src_path = "public/images/kit_college_clean.png"
    if not os.path.exists(src_path):
        src_path = "C:/Users/Niraj/.gemini/antigravity/brain/11bcf3de-c127-4c6f-95fb-f47e64b1fc1a/.user_uploaded/media_1795014572997_371aba5e.png"

    raw_img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = raw_img.size

    # Watermark cleaning
    arr = np.array(raw_img, dtype=float)
    mask = np.zeros((70, 70), dtype=float)
    y_idx, x_idx = np.ogrid[:70, :70]
    dist = np.sqrt((x_idx - 35)**2 + (y_idx - 35)**2)
    mask = np.clip(1.0 - (dist - 25) / 10.0, 0.0, 1.0)
    source_patch = arr[orig_h-150:orig_h-80, 10:80]
    for c in range(3):
        arr[orig_h-80:orig_h-10, 10:80, c] = arr[orig_h-80:orig_h-10, 10:80, c] * (1.0 - mask) + source_patch[:, :, c] * mask

    clean_img = Image.fromarray(np.uint8(arr))

    # Canvas dimensions: 1920x1302 (ratio ~ 1.474)
    canvas_w = 1920
    canvas_h = int(canvas_w * (orig_h / orig_w))
    base_full = clean_img.resize((canvas_w, canvas_h), Image.Resampling.LANCZOS)

    # Save high-res aerial photo
    base_full.save("public/images/kit_campus_aerial.webp", "WEBP", quality=92)
    base_full.save("public/images/kit_campus_aerial.jpg", "JPEG", quality=90)
    print("Saved public/images/kit_campus_aerial.webp and .jpg")

    W, H = canvas_w, canvas_h

    # Create Alpha Masks for 3 Parallax Layers
    # Layer 1: Background (Full base image)
    layer1_bg = base_full.convert("RGBA")

    # Layer 2: Midground Building & Courtyard
    # Building y is between ~0.20*H and ~0.72*H
    y_arr = np.linspace(0, 1, H)[:, None] * np.ones((1, W))
    x_arr = np.linspace(0, 1, W)[None, :] * np.ones((H, 1))

    # Building mask: 1.0 in building area, soft falloff at top and bottom
    bldg_alpha = np.clip((y_arr - 0.15) / 0.10, 0, 1) * np.clip((0.75 - y_arr) / 0.10, 0, 1)
    bldg_alpha_img = Image.fromarray((bldg_alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(15))
    layer2_bldg = base_full.convert("RGBA")
    layer2_bldg.putalpha(bldg_alpha_img)

    # Layer 3: Foreground (lower trees on bottom-left, bottom-right, driveway)
    # Foreground y > 0.60*H
    fg_alpha = np.clip((y_arr - 0.60) / 0.12, 0, 1)
    # Boost trees on bottom left and right
    fg_alpha_img = Image.fromarray((fg_alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(12))
    layer3_fg = base_full.convert("RGBA")
    layer3_fg.putalpha(fg_alpha_img)

    # Output video specifications: 1280x720 (16:9 HD)
    out_w = 1280
    out_h = 720
    fps = 30
    duration_sec = 6.5
    total_frames = int(fps * duration_sec) # 195 frames

    # Pre-generate optical vignette at 1280x720
    vig_x = np.linspace(-1, 1, out_w)[None, :]
    vig_y = np.linspace(-1, 1, out_h)[:, None]
    vig_dist = np.sqrt(vig_x**2 + vig_y**2)
    vignette = np.clip(1.0 - 0.20 * (vig_dist**2), 0.80, 1.0)[:, :, None]

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
        "-preset", "fast",
        "-crf", "18",
        "-movflags", "+faststart",
        mp4_out
    ]

    proc_mp4 = subprocess.Popen(cmd_mp4, stdin=subprocess.PIPE)

    # Center of attention: central stone entrance tower
    # In canvas coords (1920x1302):
    cx = W * 0.49
    cy = H * 0.46

    # 16:9 base frame width and height inside 1920x1302 canvas
    # Let base crop width = 1600, height = 900
    crop_w0 = 1600.0
    crop_h0 = 900.0

    print(f"Generating {total_frames} frames with 3D parallax layers...")

    first_frame_saved = False

    for i in range(total_frames):
        t = i / float(total_frames)
        # Smooth cyclical push-in and glide: 0.0 -> 1.0 -> 0.0
        # Cosine ease
        ease = 0.5 - 0.5 * np.cos(2.0 * np.pi * t)
        curve = ease ** 1.25

        # Parallax zoom levels:
        # Layer 1 (Background): subtle zoom +5%
        # Layer 2 (Building): medium zoom +14%
        # Layer 3 (Foreground): strong zoom +24% + lateral sway
        z_bg = 1.0 + 0.05 * curve
        z_mid = 1.0 + 0.14 * curve
        z_fg = 1.0 + 0.24 * curve

        # Drone subtle drift
        drift_x = 7.0 * np.sin(2.0 * np.pi * t)
        drift_y = 12.0 * curve

        # Helper to crop a layer at a given center and zoom
        def get_cropped(img_layer, zoom, off_x=0.0, off_y=0.0):
            cur_w = crop_w0 / zoom
            cur_h = crop_h0 / zoom
            c_x = cx + off_x
            c_y = cy + off_y
            left = int(c_x - cur_w / 2.0)
            top = int(c_y - cur_h / 2.0)
            right = int(left + cur_w)
            bottom = int(top + cur_h)
            return img_layer.crop((left, top, right, bottom)).resize((out_w, out_h), Image.Resampling.BILINEAR)

        # 1. Render Background
        frame_bg = get_cropped(layer1_bg, z_bg, drift_x * 0.3, drift_y * 0.3)

        # 2. Render Building Layer
        frame_bldg = get_cropped(layer2_bldg, z_mid, drift_x * 0.6, drift_y * 0.6)

        # 3. Render Foreground Layer (fastest zoom, lateral sway, slight leaf flutter)
        flutter_x = 1.5 * np.sin(4.0 * np.pi * t)
        flutter_y = 0.8 * np.cos(3.0 * np.pi * t)
        frame_fg = get_cropped(layer3_fg, z_fg, drift_x * 1.2 + flutter_x, drift_y * 1.2 + flutter_y)

        # Composite layers
        composite = Image.alpha_composite(frame_bg, frame_bldg)
        composite = Image.alpha_composite(composite, frame_fg).convert("RGB")

        # Color grade & tone map
        frame_np = np.array(composite, dtype=np.float32) / 255.0

        # Cinematic S-Curve contrast
        frame_np = 3.0 * (frame_np**2) - 2.0 * (frame_np**3)

        # Daylight warmth
        frame_np[:, :, 0] = np.clip(frame_np[:, :, 0] * 1.025 + 0.008, 0, 1) # Red subtle golden glow
        frame_np[:, :, 1] = np.clip(frame_np[:, :, 1] * 1.012, 0, 1)         # Green vibrant leaves
        frame_np[:, :, 2] = np.clip(frame_np[:, :, 2] * 0.985, 0, 1)         # Blue balanced warm

        # Optical vignette
        frame_np = np.clip(frame_np * vignette * 255.0, 0, 255).astype(np.uint8)

        if not first_frame_saved:
            poster = Image.fromarray(frame_np)
            poster.save("public/images/kit_campus_poster.webp", "WEBP", quality=94)
            poster.save("public/images/kit_campus_poster.jpg", "JPEG", quality=92)
            print("Saved public/images/kit_campus_poster.webp & .jpg")
            first_frame_saved = True

        proc_mp4.stdin.write(frame_np.tobytes())

        if (i + 1) % 40 == 0 or (i + 1) == total_frames:
            print(f"Frame {i + 1}/{total_frames} ({int((i+1)/total_frames*100)}%) rendered...")

    proc_mp4.stdin.close()
    proc_mp4.wait()
    print("MP4 drone video successfully created:", mp4_out)

    # Generate WebM VP9
    print("Converting to WebM (VP9)...")
    cmd_webm = [
        ffmpeg_exe, "-y",
        "-i", mp4_out,
        "-c:v", "libvpx-vp9",
        "-b:v", "1600k",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        webm_out
    ]
    subprocess.run(cmd_webm, check=True)
    print("WebM drone video successfully created:", webm_out)

if __name__ == "__main__":
    run()
