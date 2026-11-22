import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  serviceInterest: z.string().optional(),
  // Honeypot field for spam prevention
  company_website_url: z.string().max(0, "Spam detected").optional(),
});

// Simple in-memory rate limiting map
const ipRateMap = new Map<string, { count: number; firstSeen: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateWindow = 60 * 1000; // 1 minute
    const maxRequests = 5;

    const record = ipRateMap.get(ip);
    if (record) {
      if (now - record.firstSeen < rateWindow) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { error: "Too many submissions. Please wait a minute before submitting again." },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        ipRateMap.set(ip, { count: 1, firstSeen: now });
      }
    } else {
      ipRateMap.set(ip, { count: 1, firstSeen: now });
    }

    const body = await req.json();

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message, serviceInterest } = validationResult.data;

    // 2. Persist directly to MySQL Unified Database Layer
    // NOTE: Even if email dispatch fails, the enquiry is safely saved!
    const saveResult = await db.saveContactMessage({
      fullName,
      email,
      subject,
      message,
      serviceInterest,
    });

    // 3. Attempt Email Notification via Resend or SMTP
    let emailSent = false;
    const targetEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      "jayeshnimse3@gmail.com";

    // 3a. Resend API Integration
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "Jayesh Portfolio <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: email,
            subject: `[Portfolio Inquiry] ${subject} - from ${fullName}`,
            text: `New inquiry from ${fullName} (${email})\nService Interest: ${serviceInterest || "General"}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; background: #0f121d; color: #f8fafc; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #38bdf8;">NEW PORTFOLIO INQUIRY</span>
                  <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 20px;">${subject}</h2>
                </div>
                <div style="margin-bottom: 16px; font-size: 14px; line-height: 1.6;">
                  <p style="margin: 4px 0;"><strong style="color: #94a3b8;">From:</strong> <span style="color: #ffffff;">${fullName}</span> (&lt;<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>&gt;)</p>
                  <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Focus Area:</strong> <span style="color: #ffffff;">${serviceInterest || "General"}</span></p>
                </div>
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 18px; border-radius: 12px; margin-top: 20px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">Message Content:</p>
                  <div style="font-size: 14px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748b; text-align: center;">
                  Direct message delivery to ${targetEmail} • Jayesh Nimse Portfolio System
                </div>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const resendErr = await resendRes.text();
          console.warn("Resend email dispatch error:", resendErr);
        }
      } catch (mailError) {
        console.warn("Resend API error, saved safely to DB:", mailError);
      }
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // 3b. Nodemailer SMTP Fallback
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Jayesh Portfolio Inquiry" <${process.env.SMTP_FROM_EMAIL || "notifications@jayeshnimse.com"}>`,
          to: targetEmail,
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject} - from ${fullName}`,
          text: `New message from ${fullName} (${email})\nService Interest: ${serviceInterest || "General"}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111;">
              <h2>New Inquiry on Jayesh Nimse Portfolio</h2>
              <p><strong>From:</strong> ${fullName} (&lt;${email}&gt;)</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Service Interest:</strong> ${serviceInterest || "General"}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 16px; border-radius: 8px;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}</div>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailError) {
        console.warn("SMTP email dispatch failed, but message was securely saved:", mailError);
      }
    }

    // 4. Record analytics event
    await db.recordAnalytics("contact_submit", "/contact");

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been received.",
        savedToMySQL: saveResult.savedToMySQL,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
