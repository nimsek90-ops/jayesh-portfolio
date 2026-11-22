import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from "../src/lib/auth";

describe("Security & Authentication Engine", () => {
  it("should securely hash passwords and verify correct passwords", async () => {
    const rawPass = "JayeshSecurePass!2026";
    const hash = await hashPassword(rawPass);

    expect(hash).not.toBe(rawPass);
    expect(hash.startsWith("$2")).toBe(true); // Bcrypt format

    const matches = await verifyPassword(rawPass, hash);
    expect(matches).toBe(true);

    const wrongMatches = await verifyPassword("WrongPassword123", hash);
    expect(wrongMatches).toBe(false);
  });

  it("should issue signed JWT session tokens and verify payload", async () => {
    const payload = {
      userId: "user-123",
      email: "admin@jayeshnimse.com",
      name: "Jayesh Nimse",
      role: "SUPER_ADMIN",
    };

    const token = await createSessionToken(payload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.email).toBe(payload.email);
    expect(decoded?.role).toBe("SUPER_ADMIN");
  });

  it("should reject tampered or invalid JWT tokens", async () => {
    const badToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.badpayload.invalidsignature";
    const decoded = await verifySessionToken(badToken);
    expect(decoded).toBeNull();
  });
});
