import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SKILL_CATEGORIES,
  DEFAULT_EXPERIENCES,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_BLOGS,
  DEFAULT_COMMENTS,
  CommentItem,
} from "./data-defaults";
import fs from "fs";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// File-backed persistent fallback store when MySQL is not yet connected
const LOCAL_STORE_PATH = path.join(process.cwd(), "data-store.json");

let isPrismaAvailable: boolean | null = null;
let lastCheckTime = 0;

export async function checkPrismaConnection(): Promise<boolean> {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("mock")) {
    return false;
  }
  const now = Date.now();
  // Cache the check for 20 seconds
  if (isPrismaAvailable !== null && now - lastCheckTime < 20000) {
    return isPrismaAvailable;
  }
  try {
    // Quick ping with 600ms timeout
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 600)),
    ]);
    isPrismaAvailable = true;
  } catch {
    isPrismaAvailable = false;
  }
  lastCheckTime = now;
  return isPrismaAvailable;
}

interface LocalStore {
  projects: typeof DEFAULT_PROJECTS;
  skillCategories: typeof DEFAULT_SKILL_CATEGORIES;
  experiences: typeof DEFAULT_EXPERIENCES;
  achievements: typeof DEFAULT_ACHIEVEMENTS;
  services: typeof DEFAULT_SERVICES;
  testimonials: typeof DEFAULT_TESTIMONIALS;
  blogs: typeof DEFAULT_BLOGS;
  comments: CommentItem[];
  contactMessages: Array<{
    id: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    serviceInterest?: string;
    isRead: boolean;
    createdAt: string;
  }>;
  analytics: Array<{
    id: string;
    eventType: string;
    path?: string;
    createdAt: string;
  }>;
}

function getInitialStore(): LocalStore {
  return {
    projects: [...DEFAULT_PROJECTS],
    skillCategories: [...DEFAULT_SKILL_CATEGORIES],
    experiences: [...DEFAULT_EXPERIENCES],
    achievements: [...DEFAULT_ACHIEVEMENTS],
    services: [...DEFAULT_SERVICES],
    testimonials: [...DEFAULT_TESTIMONIALS],
    blogs: [...DEFAULT_BLOGS],
    comments: [...DEFAULT_COMMENTS],
    contactMessages: [],
    analytics: [],
  };
}

let memoryStore: LocalStore | null = null;

export function readLocalStore(): LocalStore {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, "utf-8");
      if (data && data.trim().length > 10) {
        const parsed = JSON.parse(data);
        if (!parsed.comments) parsed.comments = [];
        memoryStore = parsed;
        return parsed;
      }
    }
  } catch (e) {
    if (memoryStore) return memoryStore;
  }
  if (memoryStore) return memoryStore;
  const initial = getInitialStore();
  memoryStore = initial;
  writeLocalStore(initial);
  return initial;
}

export function writeLocalStore(store: LocalStore) {
  memoryStore = store;
  const tmp = `${LOCAL_STORE_PATH}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(store, null, 2), "utf-8");
    fs.renameSync(tmp, LOCAL_STORE_PATH);
  } catch (e) {
    try {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    } catch {}
    try {
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
    } catch {}
  }
}

// Resilient Unified Data Access Layer
export const db = {
  async getProjects() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.project.findMany({
          orderBy: { order: "asc" },
          include: { category: true },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Graceful fallback to persistent store
    }
    return readLocalStore().projects;
  },

  async getSkillCategories() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.skillCategory.findMany({
          orderBy: { order: "asc" },
          include: { skills: { orderBy: { order: "asc" } } },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().skillCategories;
  },

  async getExperiences() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.experience.findMany({
          orderBy: { order: "asc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().experiences;
  },

  async getAchievements() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.achievement.findMany({
          orderBy: { order: "asc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().achievements;
  },

  async getServices() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.service.findMany({
          orderBy: { order: "asc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().services;
  },

  async getTestimonials() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.testimonial.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().testimonials;
  },

  async getBlogs() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.blogPost.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().blogs;
  },

  async getComments(status?: "PENDING" | "APPROVED" | "REJECTED" | "ALL") {
    try {
      if (await checkPrismaConnection()) {
        const whereClause = !status || status === "ALL" ? {} : { status };
        const rows = await prisma.comment.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
        });
        if (rows.length > 0) return rows as unknown as CommentItem[];
      }
    } catch (e) {
      // Fallback to local store
    }
    const store = readLocalStore();
    if (!status || status === "ALL") {
      return store.comments || [];
    }
    return (store.comments || []).filter((c) => c.status === status);
  },

  async getPublicComments() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.comment.findMany({
          where: { status: "APPROVED" },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            content: true,
            createdAt: true,
          },
        });
        if (rows.length > 0) {
          return rows.map((r) => ({
            id: r.id,
            name: r.name,
            content: r.content,
            createdAt: r.createdAt.toISOString(),
          }));
        }
      }
    } catch (e) {
      // Fallback to local store
    }
    const store = readLocalStore();
    // Strictly approved comments only, and NEVER expose email addresses publicly!
    return (store.comments || [])
      .filter((c) => c.status === "APPROVED")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((c) => ({
        id: c.id,
        name: c.name,
        content: c.content,
        createdAt: c.createdAt,
      }));
  },

  async addComment(data: { name: string; email: string; content: string }) {
    const newComment: CommentItem = {
      id: `cmt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      content: data.content.trim(),
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    try {
      if (await checkPrismaConnection()) {
        const created = await prisma.comment.create({
          data: {
            name: newComment.name,
            email: newComment.email,
            content: newComment.content,
            status: "PENDING",
          },
        });
        newComment.id = created.id;
      }
    } catch (e) {
      // Fallback
    }

    const store = readLocalStore();
    if (!store.comments) store.comments = [];
    store.comments.unshift(newComment);
    writeLocalStore(store);
    return { success: true, comment: newComment };
  },

  async moderateComment(id: string, status: "APPROVED" | "REJECTED") {
    try {
      if (await checkPrismaConnection()) {
        await prisma.comment.update({
          where: { id },
          data: {
            status,
            approvedAt: status === "APPROVED" ? new Date() : null,
          },
        });
      }
    } catch (e) {
      // Fallback
    }

    const store = readLocalStore();
    if (!store.comments) store.comments = [];
    const comment = store.comments.find((c) => c.id === id);
    if (!comment) return { success: false, error: "Comment not found" };
    comment.status = status;
    if (status === "APPROVED") {
      comment.approvedAt = new Date().toISOString();
    }
    writeLocalStore(store);
    return { success: true, comment };
  },

  async deleteComment(id: string) {
    try {
      if (await checkPrismaConnection()) {
        await prisma.comment.delete({ where: { id } });
      }
    } catch (e) {
      // Fallback
    }

    const store = readLocalStore();
    if (!store.comments) store.comments = [];
    const initialLen = store.comments.length;
    store.comments = store.comments.filter((c) => c.id !== id);
    writeLocalStore(store);
    return { success: store.comments.length < initialLen };
  },

  async saveContactMessage(msg: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    serviceInterest?: string;
  }) {
    let savedToMySQL = false;
    try {
      if (await checkPrismaConnection()) {
        await prisma.contactMessage.create({
          data: {
            fullName: msg.fullName,
            email: msg.email,
            subject: msg.subject,
            message: msg.message,
            serviceInterest: msg.serviceInterest || null,
          },
        });
        savedToMySQL = true;
      }
    } catch (e) {
      console.warn("MySQL save error, recording to local persistent store:", e);
    }

    // Always ensure message is recorded in persistent store
    const store = readLocalStore();
    const newEntry = {
      id: `msg-${Date.now()}`,
      fullName: msg.fullName,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      serviceInterest: msg.serviceInterest,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    store.contactMessages.unshift(newEntry);
    writeLocalStore(store);
    return { success: true, savedToMySQL, entry: newEntry };
  },

  async getContactMessages() {
    try {
      if (await checkPrismaConnection()) {
        const rows = await prisma.contactMessage.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (rows.length > 0) return rows;
      }
    } catch (e) {
      // Fallback
    }
    return readLocalStore().contactMessages;
  },

  async recordAnalytics(eventType: string, pathUrl = "/") {
    try {
      if (await checkPrismaConnection()) {
        await prisma.analyticsEvent.create({
          data: { eventType, path: pathUrl },
        });
      }
    } catch (e) {
      // Fallback
    }
    const store = readLocalStore();
    store.analytics.push({
      id: `an-${Date.now()}`,
      eventType,
      path: pathUrl,
      createdAt: new Date().toISOString(),
    });
    // Keep last 1000 events
    if (store.analytics.length > 1000) store.analytics = store.analytics.slice(-1000);
    writeLocalStore(store);
  },

  async getAnalyticsStats() {
    const store = readLocalStore();
    const totalViews = store.analytics.filter((a) => a.eventType === "page_view").length;
    const projectViews = store.analytics.filter((a) => a.eventType === "project_view").length;
    const contactSubmissions = store.contactMessages.length;
    const uniqueVisitors = totalViews > 0 ? Math.max(1, Math.round(totalViews * 0.75)) : 0;

    return {
      totalViews,
      uniqueVisitors,
      projectViews,
      contactSubmissions,
      recentMessages: store.contactMessages.slice(0, 5),
    };
  },
};
