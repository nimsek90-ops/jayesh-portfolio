import { describe, it, expect } from "vitest";
import { db } from "../src/lib/db";
import { DEFAULT_PROJECTS, DEFAULT_ACHIEVEMENTS } from "../src/lib/data-defaults";

describe("Unified Database & Storage Layer", () => {
  it("should retrieve verified project records", async () => {
    const projects = await db.getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(4);

    const scaleRise = projects.find((p) => p.title.includes("ScaleRise"));
    expect(scaleRise).toBeDefined();
    expect(scaleRise?.featured).toBe(true);

    const medNova = projects.find((p) => p.title.includes("MedNova"));
    expect(medNova).toBeDefined();
  });

  it("should retrieve verified achievements without fabricated data or NDA", async () => {
    const achievements = await db.getAchievements();
    expect(achievements.length).toBeGreaterThanOrEqual(2);

    const karate = achievements.find((a) => a.title.toLowerCase().includes("black belt"));
    expect(karate).toBeDefined();
    expect(karate?.verified).toBe(true);

    const medal = achievements.find((a) => a.title.toLowerCase().includes("silver medal"));
    expect(medal).toBeDefined();

    const nda = achievements.find((a) => a.title.toLowerCase().includes("nda"));
    expect(nda).toBeUndefined(); // NDA permanently removed
  });

  it("should record contact inquiries and persist without loss", async () => {
    const testEnquiry = {
      fullName: "Test Recruiter",
      email: "recruiter@techventures.com",
      subject: "AI Leadership Opportunity",
      message: "Testing inquiry persistence into unified database.",
      serviceInterest: "AI Solutions & Autonomous Workflows",
    };

    const res = await db.saveContactMessage(testEnquiry);
    expect(res.success).toBe(true);

    const allMessages = await db.getContactMessages();
    const found = allMessages.find((m) => m.email === testEnquiry.email);
    expect(found).toBeDefined();
    expect(found?.subject).toBe(testEnquiry.subject);
  });

  it("should record analytics events and calculate statistics", async () => {
    await db.recordAnalytics("page_view", "/");
    await db.recordAnalytics("project_view", "/projects/scalerise");

    const stats = await db.getAnalyticsStats();
    expect(stats.totalViews).toBeGreaterThan(0);
    expect(stats.uniqueVisitors).toBeGreaterThan(0);
  });
});
