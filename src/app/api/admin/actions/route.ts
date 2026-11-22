import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { readLocalStore, writeLocalStore, prisma, checkPrismaConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Enforce server-side authentication
    const session = await getAdminSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const { action, module, data, id } = await req.json();
    const store = readLocalStore();

    // 1. Projects CRUD
    if (module === "projects") {
      if (action === "create") {
        const newProj = {
          id: `proj-${Date.now()}`,
          title: data.title,
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: data.category || "AI & Software",
          summary: data.summary,
          problem: data.problem || "",
          solution: data.solution || "",
          techStack: Array.isArray(data.techStack)
            ? data.techStack
            : (data.techStack || "").split(",").map((s: string) => s.trim()),
          screenshots: ["/images/jayesh_hero_portrait.png"],
          githubUrl: data.githubUrl || "",
          liveUrl: data.liveUrl || "",
          featured: Boolean(data.featured),
          order: store.projects.length + 1,
          caseStudy: data.caseStudy || data.summary,
        };
        store.projects.push(newProj);
        writeLocalStore(store);

        try {
          if (await checkPrismaConnection()) {
            await prisma.project.create({
              data: {
                title: newProj.title,
                slug: newProj.slug,
                summary: newProj.summary,
                problem: newProj.problem,
                solution: newProj.solution,
                techStack: JSON.stringify(newProj.techStack),
                githubUrl: newProj.githubUrl,
                liveUrl: newProj.liveUrl,
                featured: newProj.featured,
                caseStudy: newProj.caseStudy,
                category: {
                  connectOrCreate: {
                    where: { slug: "general" },
                    create: { name: "General", slug: "general" },
                  },
                },
              },
            });
          }
        } catch (e) {
          console.warn("MySQL project create notice:", e);
        }

        return NextResponse.json({ success: true, item: newProj });
      }

      if (action === "delete") {
        store.projects = store.projects.filter((p) => p.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true, id });
      }

      if (action === "update") {
        const idx = store.projects.findIndex((p) => p.id === id);
        if (idx !== -1) {
          store.projects[idx] = { ...store.projects[idx], ...data };
          writeLocalStore(store);
        }
        return NextResponse.json({ success: true, item: store.projects[idx] });
      }
    }

    // 2. Skills CRUD
    if (module === "skills") {
      if (action === "update-level") {
        const { categoryName, skillName, newLevel } = data;
        const cat = store.skillCategories.find((c) => c.category === categoryName);
        if (cat) {
          const s = cat.skills.find((sk) => sk.name === skillName);
          if (s) {
            s.level = newLevel;
            writeLocalStore(store);
            return NextResponse.json({ success: true, updated: s });
          }
        }
      }
      if (action === "add-skill") {
        const { categoryName, skillName, level } = data;
        const cat = store.skillCategories.find((c) => c.category === categoryName);
        if (cat) {
          cat.skills.push({ name: skillName, level: level || "Advanced" });
          writeLocalStore(store);
          return NextResponse.json({ success: true, category: cat });
        }
      }
      if (action === "delete-skill") {
        const { categoryName, skillName } = data;
        const cat = store.skillCategories.find((c) => c.category === categoryName);
        if (cat) {
          cat.skills = cat.skills.filter((sk) => sk.name !== skillName);
          writeLocalStore(store);
          return NextResponse.json({ success: true });
        }
      }
    }

    // 3. Achievements CRUD
    if (module === "achievements") {
      if (action === "create") {
        const newAch = {
          id: `ach-${Date.now()}`,
          title: data.title,
          category: data.category || "National Standard",
          year: data.year || "Verified",
          issuer: data.issuer || "National Federation",
          description: data.description,
          verified: true,
        };
        store.achievements.push(newAch);
        writeLocalStore(store);
        return NextResponse.json({ success: true, item: newAch });
      }
      if (action === "update") {
        const idx = store.achievements.findIndex((a) => a.id === id);
        if (idx !== -1) {
          store.achievements[idx] = { ...store.achievements[idx], ...data };
          writeLocalStore(store);
        }
        return NextResponse.json({ success: true, item: store.achievements[idx] });
      }
      if (action === "delete") {
        store.achievements = store.achievements.filter((a) => a.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true, id });
      }
    }

    // 4. Experience CRUD
    if (module === "experiences") {
      if (action === "create") {
        const newExp = {
          id: `exp-${Date.now()}`,
          role: data.role,
          company: data.company,
          location: data.location || "India",
          period: data.period || "2024 — Present",
          isCurrent: Boolean(data.isCurrent),
          description: data.description,
          highlights: Array.isArray(data.highlights)
            ? data.highlights
            : (data.highlights || "").split("\n").filter((h: string) => h.trim().length > 0),
        };
        store.experiences.push(newExp);
        writeLocalStore(store);
        return NextResponse.json({ success: true, item: newExp });
      }
      if (action === "update") {
        const idx = store.experiences.findIndex((e) => e.id === id);
        if (idx !== -1) {
          store.experiences[idx] = { ...store.experiences[idx], ...data };
          writeLocalStore(store);
        }
        return NextResponse.json({ success: true, item: store.experiences[idx] });
      }
      if (action === "delete") {
        store.experiences = store.experiences.filter((e) => e.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true, id });
      }
    }

    // 5. Services CRUD
    if (module === "services") {
      if (action === "create") {
        const newSrv = {
          id: `srv-${Date.now()}`,
          title: data.title,
          shortDesc: data.shortDesc,
          icon: data.icon || "BrainCircuit",
          deliverables: Array.isArray(data.deliverables)
            ? data.deliverables
            : (data.deliverables || "").split(",").map((d: string) => d.trim()),
        };
        store.services.push(newSrv);
        writeLocalStore(store);
        return NextResponse.json({ success: true, item: newSrv });
      }
      if (action === "update") {
        const idx = store.services.findIndex((s) => s.id === id);
        if (idx !== -1) {
          store.services[idx] = { ...store.services[idx], ...data };
          writeLocalStore(store);
        }
        return NextResponse.json({ success: true, item: store.services[idx] });
      }
      if (action === "delete") {
        store.services = store.services.filter((s) => s.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true, id });
      }
    }

    // 6. Contact Messages: Mark Read or Delete
    if (module === "messages") {
      if (action === "mark-read") {
        const msg = store.contactMessages.find((m) => m.id === id);
        if (msg) {
          msg.isRead = true;
          writeLocalStore(store);
        }
        return NextResponse.json({ success: true });
      }
      if (action === "delete") {
        store.contactMessages = store.contactMessages.filter((m) => m.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true });
      }
    }

    // 7. Testimonials CRUD
    if (module === "testimonials") {
      if (action === "create") {
        const newTestimonial = {
          id: `test-${Date.now()}`,
          authorName: data.authorName,
          authorRole: data.authorRole,
          company: data.company || "",
          content: data.content,
          rating: Number(data.rating) || 5,
          verified: true,
        };
        store.testimonials.unshift(newTestimonial);
        writeLocalStore(store);
        return NextResponse.json({ success: true, item: newTestimonial });
      }
      if (action === "delete") {
        store.testimonials = store.testimonials.filter((t) => t.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true });
      }
    }

    // 8. Blogs CRUD
    if (module === "blogs") {
      if (action === "create") {
        const newBlog = {
          id: `blog-${Date.now()}`,
          title: data.title,
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          summary: data.summary,
          content: data.content,
          readingTime: data.readingTime || "5 min read",
          publishedAt: new Date().toISOString().split("T")[0],
          tags: (data.tags || "").split(",").map((t: string) => t.trim()),
        };
        store.blogs.unshift(newBlog);
        writeLocalStore(store);
        return NextResponse.json({ success: true, item: newBlog });
      }
      if (action === "delete") {
        store.blogs = store.blogs.filter((b) => b.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true });
      }
    }

    // 8b. Comments Moderation CRUD (Admin-only)
    if (module === "comments") {
      if (!store.comments) store.comments = [];
      if (action === "list") {
        return NextResponse.json({ success: true, items: store.comments });
      }
      if (action === "approve") {
        const comment = store.comments.find((c) => c.id === id);
        if (comment) {
          comment.status = "APPROVED";
          comment.approvedAt = new Date().toISOString();
          writeLocalStore(store);
          return NextResponse.json({ success: true, item: comment });
        }
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
      }
      if (action === "reject") {
        const comment = store.comments.find((c) => c.id === id);
        if (comment) {
          comment.status = "REJECTED";
          writeLocalStore(store);
          return NextResponse.json({ success: true, item: comment });
        }
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
      }
      if (action === "delete") {
        store.comments = store.comments.filter((c) => c.id !== id);
        writeLocalStore(store);
        return NextResponse.json({ success: true });
      }
    }

    // 9. Generic update store fallback
    writeLocalStore(store);
    return NextResponse.json({ success: true, message: "Action processed" });
  } catch (error: any) {
    console.error("Admin action error:", error);
    return NextResponse.json({ error: error.message || "Failed to process admin action" }, { status: 500 });
  }
}
