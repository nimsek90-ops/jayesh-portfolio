import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const commentSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(120),
  content: z.string().trim().min(5, "Comment must be at least 5 characters").max(1500, "Comment is too long"),
  // Honeypot field for bot & spam protection
  bot_field: z.string().max(0, "Bot detected").optional(),
});

// In-memory rate limiting map: max 3 comment submissions per 10 minutes per IP
const commentRateMap = new Map<string, { count: number; firstSeen: number }>();

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET() {
  try {
    // Only return strictly APPROVED comments, and NEVER expose visitor emails!
    const publicComments = await db.getPublicComments();
    return NextResponse.json({ success: true, comments: publicComments });
  } catch (error: any) {
    console.error("Comments GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve approved comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateWindow = 10 * 60 * 1000; // 10 minutes
    const maxRequests = 3;

    const record = commentRateMap.get(ip);
    if (record) {
      if (now - record.firstSeen < rateWindow) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { error: "Too many comment submissions. Please wait a few minutes before submitting again." },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        commentRateMap.set(ip, { count: 1, firstSeen: now });
      }
    } else {
      commentRateMap.set(ip, { count: 1, firstSeen: now });
    }

    const body = await req.json();

    // 1. Zod Validation
    const validation = commentSubmissionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, content, bot_field } = validation.data;

    // Check honeypot
    if (bot_field && bot_field.length > 0) {
      return NextResponse.json({ error: "Spam submission blocked." }, { status: 400 });
    }

    // 2. Prevent duplicate spam submissions
    const existingComments = await db.getComments("ALL");
    const isDuplicate = existingComments.some(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase() &&
        c.content.toLowerCase() === content.toLowerCase()
    );

    if (isDuplicate) {
      return NextResponse.json(
        { error: "A comment with this exact content has already been submitted." },
        { status: 409 }
      );
    }

    // 3. XSS Sanitization
    const sanitizedName = sanitizeHtml(name);
    const sanitizedContent = sanitizeHtml(content);

    // 4. Save to database layer with strictly PENDING status
    await db.addComment({
      name: sanitizedName,
      email,
      content: sanitizedContent,
    });

    // 5. Return explicit required status message
    return NextResponse.json(
      {
        success: true,
        message: "Your comment has been submitted and is awaiting approval.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Comments POST error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
