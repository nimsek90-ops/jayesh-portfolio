import { describe, it, expect } from "vitest";
import { db } from "../src/lib/db";
import { DEFAULT_PROJECTS, DEFAULT_TESTIMONIALS } from "../src/lib/data-defaults";

describe("Visitor Comments Moderation & Security Tests", () => {
  it("should have zero fake testimonials and zero Arise project references", () => {
    expect(DEFAULT_TESTIMONIALS.length).toBe(0);
    const hasArise = DEFAULT_PROJECTS.some(
      (p) => p.title.toLowerCase().includes("arise") || p.slug.toLowerCase().includes("arise")
    );
    expect(hasArise).toBe(false);
  });

  it("should create visitor comment in PENDING status by default", async () => {
    const res = await db.addComment({
      name: "Dr. Tech Reviewer",
      email: "reviewer@ai-lab.org",
      content: "Impressive portfolio showcasing genuine full-stack and AI expertise.",
    });

    expect(res.success).toBe(true);
    expect(res.comment.id).toBeDefined();
    expect(res.comment.status).toBe("PENDING");
    expect(res.comment.name).toBe("Dr. Tech Reviewer");
    expect(res.comment.email).toBe("reviewer@ai-lab.org");
  });

  it("should never expose author emails in public comments feed", async () => {
    const publicComments = await db.getPublicComments();
    publicComments.forEach((c) => {
      expect((c as any).email).toBeUndefined();
    });
  });

  it("should allow admin moderation (approve, reject, delete)", async () => {
    const createRes = await db.addComment({
      name: "Moderation Test User",
      email: "moderation@example.com",
      content: "Testing moderation workflow lifecycle.",
    });

    const commentId = createRes.comment.id;

    // Approve
    const approved = await db.moderateComment(commentId, "APPROVED");
    expect(approved.success).toBe(true);
    expect(approved.comment?.status).toBe("APPROVED");

    // Check public comments contains approved comment (without email)
    const publicList = await db.getPublicComments();
    const foundApproved = publicList.find((c) => c.id === commentId);
    expect(foundApproved).toBeDefined();
    expect((foundApproved as any)?.email).toBeUndefined();

    // Reject
    const rejected = await db.moderateComment(commentId, "REJECTED");
    expect(rejected.success).toBe(true);
    expect(rejected.comment?.status).toBe("REJECTED");

    // Verify rejected comment is not in public list
    const publicAfterReject = await db.getPublicComments();
    expect(publicAfterReject.some((c) => c.id === commentId)).toBe(false);

    // Delete
    const deleted = await db.deleteComment(commentId);
    expect(deleted.success).toBe(true);
  });
});
