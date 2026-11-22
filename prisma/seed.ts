import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_EXPERIENCES,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_BLOGS,
} from "../src/lib/data-defaults";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting MySQL database seeding...");

  // 1. Create Default Admin User
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "JayeshAdmin2026!Secure";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@jayeshnimse.com" },
    update: {},
    create: {
      email: "admin@jayeshnimse.com",
      passwordHash,
      name: "Jayesh Nimse",
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin user seeded:", admin.email);

  // 2. Seed Project Categories & Projects
  for (const p of DEFAULT_PROJECTS) {
    const categorySlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await prisma.projectCategory.upsert({
      where: { slug: categorySlug },
      update: { name: p.category },
      create: {
        name: p.category,
        slug: categorySlug,
      },
    });

    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        problem: p.problem,
        solution: p.solution,
        techStack: JSON.stringify(p.techStack),
        screenshots: JSON.stringify(p.screenshots),
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        featured: p.featured,
        order: p.order,
        caseStudy: p.caseStudy,
      },
      create: {
        title: p.title,
        slug: p.slug,
        categoryId: category.id,
        summary: p.summary,
        problem: p.problem,
        solution: p.solution,
        techStack: JSON.stringify(p.techStack),
        screenshots: JSON.stringify(p.screenshots),
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        featured: p.featured,
        order: p.order,
        caseStudy: p.caseStudy,
      },
    });
  }
  console.log("Projects seeded:", DEFAULT_PROJECTS.length);

  // 3. Seed Skill Categories & Skills
  for (const cat of DEFAULT_SKILL_CATEGORIES) {
    const slug = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await prisma.skillCategory.upsert({
      where: { slug },
      update: { name: cat.category },
      create: {
        name: cat.category,
        slug,
      },
    });

    for (let i = 0; i < cat.skills.length; i++) {
      const s = cat.skills[i];
      await prisma.skill.create({
        data: {
          name: s.name,
          categoryId: category.id,
          level: s.level,
          order: i + 1,
        },
      });
    }
  }
  console.log("Skills seeded successfully.");

  // 4. Seed Experiences
  for (const exp of DEFAULT_EXPERIENCES) {
    await prisma.experience.create({
      data: {
        role: exp.role,
        company: exp.company,
        location: exp.location,
        startDate: new Date("2024-01-01"),
        isCurrent: exp.isCurrent,
        description: exp.description,
        highlights: JSON.stringify(exp.highlights),
      },
    });
  }
  console.log("Experiences seeded.");

  // 5. Seed Achievements
  for (const ach of DEFAULT_ACHIEVEMENTS) {
    await prisma.achievement.create({
      data: {
        title: ach.title,
        category: ach.category,
        issuer: ach.issuer,
        description: ach.description,
        verified: ach.verified,
      },
    });
  }
  console.log("Achievements seeded.");

  // 6. Seed Services
  for (const srv of DEFAULT_SERVICES) {
    await prisma.service.create({
      data: {
        title: srv.title,
        shortDesc: srv.shortDesc,
        deliverables: JSON.stringify(srv.deliverables),
      },
    });
  }
  console.log("Services seeded.");

  // 7. Seed Testimonials
  for (const t of DEFAULT_TESTIMONIALS) {
    await prisma.testimonial.create({
      data: {
        authorName: t.authorName,
        authorRole: t.authorRole,
        company: t.company,
        content: t.content,
        rating: t.rating,
        verified: t.verified,
      },
    });
  }
  console.log("Testimonials seeded.");

  // 8. Seed Blogs
  for (const b of DEFAULT_BLOGS) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        summary: b.summary,
        content: b.content,
        readingTime: b.readingTime,
        tags: JSON.stringify(b.tags),
      },
      create: {
        title: b.title,
        slug: b.slug,
        summary: b.summary,
        content: b.content,
        readingTime: b.readingTime,
        tags: JSON.stringify(b.tags),
      },
    });
  }
  console.log("Blogs seeded.");

  console.log("MySQL Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
