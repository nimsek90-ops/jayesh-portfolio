import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  // Route protection: redirect to login if session is invalid or missing
  if (!session) {
    redirect("/admin/login");
  }

  // Retrieve live unified data models from MySQL / database layer
  const [
    projects,
    skillCategories,
    experiences,
    achievements,
    services,
    testimonials,
    blogs,
    messages,
    stats,
    comments,
  ] = await Promise.all([
    db.getProjects(),
    db.getSkillCategories(),
    db.getExperiences(),
    db.getAchievements(),
    db.getServices(),
    db.getTestimonials(),
    db.getBlogs(),
    db.getContactMessages(),
    db.getAnalyticsStats(),
    db.getComments("ALL"),
  ]);

  return (
    <AdminDashboard
      initialData={{
        projects,
        skillCategories,
        experiences,
        achievements,
        services,
        testimonials,
        blogs,
        messages,
        stats,
        comments,
      }}
    />
  );
}
