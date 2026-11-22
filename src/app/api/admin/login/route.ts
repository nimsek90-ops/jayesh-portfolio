import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, createSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { prisma, checkPrismaConnection } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid email or password format" }, { status: 400 });
    }

    const { email, password } = result.data;

    let adminUser: { id: string; email: string; name: string; role: string; passwordHash: string } | null = null;

    // Check MySQL if connected
    try {
      if (await checkPrismaConnection()) {
        adminUser = await prisma.adminUser.findUnique({ where: { email } });
      }
    } catch (e) {
      console.warn("Could not query MySQL adminUser table, checking fallback admin credentials:", e);
    }

    // Default built-in verified admin account
    const allowedAdminEmails = [
      (process.env.ADMIN_EMAIL || "jayeshnimse3@gmail.com").toLowerCase(),
      "jayeshnimse3@gmail.com",
      "admin@jayeshnimse.com",
    ];
    const defaultAdminPass = process.env.ADMIN_INITIAL_PASSWORD || "JayeshAdmin2026!Secure";

    let isValid = false;

    if (adminUser) {
      isValid = await verifyPassword(password, adminUser.passwordHash);
    } else if (allowedAdminEmails.includes(email.toLowerCase())) {
      // Require the secure configured environment password
      isValid = password === defaultAdminPass;
      adminUser = {
        id: "admin-default-id",
        email: email.toLowerCase(),
        name: "Jayesh Nimse",
        role: "SUPER_ADMIN",
        passwordHash: "",
      };
    }

    if (!isValid || !adminUser) {
      return NextResponse.json({ error: "Invalid credentials. Please verify your email and password." }, { status: 401 });
    }

    // Generate JWT token
    const token = await createSessionToken({
      userId: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}
