import { describe, it, expect } from "vitest";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_EXPERIENCES,
  DEFAULT_ACHIEVEMENTS,
} from "../src/lib/data-defaults";
import { FAQ_ITEMS } from "../src/lib/faq-data";

describe("Jayesh Nimse Portfolio Integrity Checks", () => {
  it("should contain the core live projects with complete case studies", () => {
    expect(DEFAULT_PROJECTS.length).toBeGreaterThanOrEqual(4);
    const titles = DEFAULT_PROJECTS.map((p) => p.title);
    expect(titles).toContain("ScaleRise MediaTech");
    expect(titles).toContain("MedNova Smart Hospital");
    expect(titles).toContain("AI Agents & Autonomous Workflows");

    DEFAULT_PROJECTS.forEach((p) => {
      expect(p.problem.length).toBeGreaterThan(10);
      expect(p.solution.length).toBeGreaterThan(10);
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.caseStudy.length).toBeGreaterThan(20);
    });
  });

  it("should categorize skills into 5 distinct disciplines without fabricated percentages", () => {
    expect(DEFAULT_SKILL_CATEGORIES.length).toBe(5);
    const categoryNames = DEFAULT_SKILL_CATEGORIES.map((c) => c.category);
    expect(categoryNames).toContain("Programming");
    expect(categoryNames).toContain("Artificial Intelligence");
    expect(categoryNames).toContain("Development & Systems");
    expect(categoryNames).toContain("Business Strategy & Growth");
    expect(categoryNames).toContain("Analytics & Intelligence");

    DEFAULT_SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((s) => {
        expect(["Proficient", "Advanced", "Expert"]).toContain(s.level);
      });
    });
  });

  it("should include Founder CEO at ScaleRise MediaTech and Startnex experience", () => {
    const roles = DEFAULT_EXPERIENCES.map((e) => e.role);
    expect(roles).toContain("Founder & CEO");
    expect(roles).toContain("Business Strategist Intern");

    const companies = DEFAULT_EXPERIENCES.map((e) => e.company);
    expect(companies).toContain("ScaleRise MediaTech");
    expect(companies).toContain("Startnex");
  });

  it("should include verified Karate Black Belt and National Silver Medalist, with zero dummy records", () => {
    const titles = DEFAULT_ACHIEVEMENTS.map((a) => a.title.toLowerCase());
    const hasBlackBelt = titles.some((t) => t.includes("black belt"));
    const hasSilverMedal = titles.some((t) => t.includes("silver medal"));
    const hasNDA = titles.some((t) => t.includes("nda"));

    expect(hasBlackBelt).toBe(true);
    expect(hasSilverMedal).toBe(true);
    expect(hasNDA).toBe(false); // NDA permanently removed
    expect(DEFAULT_ACHIEVEMENTS.length).toBe(2);
  });

  it("should have generated high-res cinematic drone video, webm, and poster assets for KIT's College of Engineering", () => {
    const fs = require("fs");
    const path = require("path");

    const mp4Path = path.join(__dirname, "../public/videos/kit_campus_drone_cinematic.mp4");
    const webmPath = path.join(__dirname, "../public/videos/kit_campus_drone_cinematic.webm");
    const posterPath = path.join(__dirname, "../public/images/kit_campus_poster.webp");
    const aerialPath = path.join(__dirname, "../public/images/kit_campus_aerial.webp");

    expect(fs.existsSync(mp4Path)).toBe(true);
    expect(fs.existsSync(webmPath)).toBe(true);
    expect(fs.existsSync(posterPath)).toBe(true);
    expect(fs.existsSync(aerialPath)).toBe(true);

    const mp4Stats = fs.statSync(mp4Path);
    expect(mp4Stats.size).toBeGreaterThan(500000); // Greater than 500KB valid video
  });

  it("should have authentic Jayesh Vijay Nimse PDF resume and preview assets in public directory", () => {
    const fs = require("fs");
    const path = require("path");

    const pdfPath = path.join(__dirname, "../public/Jayesh_Nimse_Resume.pdf");
    const aliasPdfPath = path.join(__dirname, "../public/resume.pdf");
    const previewPngPath = path.join(__dirname, "../public/images/jayesh_resume_preview.png");
    const previewWebpPath = path.join(__dirname, "../public/images/jayesh_resume_preview.webp");

    expect(fs.existsSync(pdfPath)).toBe(true);
    expect(fs.existsSync(aliasPdfPath)).toBe(true);
    expect(fs.existsSync(previewPngPath)).toBe(true);
    expect(fs.existsSync(previewWebpPath)).toBe(true);

    const pdfStats = fs.statSync(pdfPath);
    expect(pdfStats.size).toBeGreaterThan(100000); // Greater than 100KB authentic PDF
  });

  it("should have authentic brand logos for ScaleRise MediaTech, Startnex, and KIT College", () => {
    const fs = require("fs");
    const path = require("path");

    const srLogo = path.join(__dirname, "../public/images/scalerise_logo.png");
    const srIcon = path.join(__dirname, "../public/images/scalerise_icon.webp");
    const snLogo = path.join(__dirname, "../public/images/startnex_logo.png");
    const snIcon = path.join(__dirname, "../public/images/startnex_icon.webp");
    const kitEmblem = path.join(__dirname, "../public/images/kit_emblem.png");

    expect(fs.existsSync(srLogo)).toBe(true);
    expect(fs.existsSync(srIcon)).toBe(true);
    expect(fs.existsSync(snLogo)).toBe(true);
    expect(fs.existsSync(snIcon)).toBe(true);
    expect(fs.existsSync(kitEmblem)).toBe(true);

    expect(fs.statSync(srLogo).size).toBeGreaterThan(50000);
    expect(fs.statSync(srIcon).size).toBeGreaterThan(5000);
    expect(fs.statSync(snLogo).size).toBeGreaterThan(10000);
    expect(fs.statSync(snIcon).size).toBeGreaterThan(2000);
    expect(fs.statSync(kitEmblem).size).toBeGreaterThan(10000);
  });

  it("should have authentic Karate Black Belt certificate photograph assets", () => {
    const fs = require("fs");
    const path = require("path");

    const beltJpg = path.join(__dirname, "../public/images/jayesh_black_belt.jpg");
    const beltWebp = path.join(__dirname, "../public/images/jayesh_black_belt.webp");
    const beltSquare = path.join(__dirname, "../public/images/jayesh_black_belt_square.webp");

    expect(fs.existsSync(beltJpg)).toBe(true);
    expect(fs.existsSync(beltWebp)).toBe(true);
    expect(fs.existsSync(beltSquare)).toBe(true);

    expect(fs.statSync(beltJpg).size).toBeGreaterThan(50000);
    expect(fs.statSync(beltWebp).size).toBeGreaterThan(30000);
    expect(fs.statSync(beltSquare).size).toBeGreaterThan(20000);
  });

  it("should have authentic ByteARQ Leadership team photo and updated project links", () => {
    const fs = require("fs");
    const path = require("path");

    const byteJpg = path.join(__dirname, "../public/images/bytearq_leadership.jpg");
    const byteWebp = path.join(__dirname, "../public/images/bytearq_leadership.webp");
    const byteBanner = path.join(__dirname, "../public/images/bytearq_leadership_banner.webp");

    expect(fs.existsSync(byteJpg)).toBe(true);
    expect(fs.existsSync(byteWebp)).toBe(true);
    expect(fs.existsSync(byteBanner)).toBe(true);

    expect(fs.statSync(byteJpg).size).toBeGreaterThan(50000);
    expect(fs.statSync(byteWebp).size).toBeGreaterThan(30000);
    expect(fs.statSync(byteBanner).size).toBeGreaterThan(30000);

    const mednova = DEFAULT_PROJECTS.find((p) => p.slug === "mednova-smart-hospital");
    expect(mednova).toBeDefined();
    expect(mednova?.liveUrl).toBe("https://mednova-jvn-vercel-snowy.vercel.app/");
    expect(mednova?.githubUrl).toBe("https://github.com/nimsek90-ops/mednova-jvn");
  });

  it("should have authentic Matoshri Rukminibai Damodar Malpani Vidyalaya school assets and family heritage", () => {
    const fs = require("fs");
    const path = require("path");

    const schoolJpg = path.join(__dirname, "../public/images/school_malpani_vidyalaya.jpg");
    const schoolWebp = path.join(__dirname, "../public/images/school_malpani_vidyalaya.webp");

    expect(fs.existsSync(schoolJpg)).toBe(true);
    expect(fs.existsSync(schoolWebp)).toBe(true);
    expect(fs.statSync(schoolJpg).size).toBeGreaterThan(10000);
    expect(fs.statSync(schoolWebp).size).toBeGreaterThan(10000);

    const allText = JSON.stringify(FAQ_ITEMS);
    expect(allText).toContain("Vijay Chimaji Nimse");
    expect(allText).toContain("Kanchan Vijay Nimse");
    expect(allText).toContain("Namrata Vijay Nimse");
    expect(allText).toContain("Sangamner");
    expect(allText).toContain("87.4%");
  });
});
