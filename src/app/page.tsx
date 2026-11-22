import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import OrbitalInnovationRing from "@/components/portfolio/OrbitalInnovationRing";
import JourneyTimeline from "@/components/portfolio/JourneyTimeline";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import CollegeEducationSection from "@/components/portfolio/CollegeEducationSection";
import LeadershipSection from "@/components/portfolio/LeadershipSection";
import AchievementsSection from "@/components/portfolio/AchievementsSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import FamilyHeritageSection from "@/components/portfolio/FamilyHeritageSection";
import CommentsSection from "@/components/portfolio/CommentsSection";
import FAQSection from "@/components/portfolio/FAQSection";
import BlogSection from "@/components/portfolio/BlogSection";
import ResumeSection from "@/components/portfolio/ResumeSection";
import FiberOpticStream from "@/components/ui/FiberOpticStream";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import { db } from "@/lib/db";

// Dynamic revalidation to reflect admin edits and comments immediately
export const revalidate = 0;

export default async function Home() {
  // Fetch verified data models from unified database layer
  const [
    projects,
    skillCategories,
    experiences,
    achievements,
    services,
    blogs,
  ] = await Promise.all([
    db.getProjects(),
    db.getSkillCategories(),
    db.getExperiences(),
    db.getAchievements(),
    db.getServices(),
    db.getBlogs(),
  ]);

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900 flex flex-col selection:bg-rose-500/20 selection:text-rose-900 relative bg-photo-canvas">
      {/* 1. Hero Section - Signature Photo Canvas & 3D Interactive Composition */}
      <HeroSection />

      {/* 2. About Me — Personal Narrative & Verified Mission */}
      <AboutSection />

      {/* 3. The Innovation Matrix — Digital Portal & Ethereal Swirling Core */}
      <OrbitalInnovationRing />

      {/* 6. Architectural Journey & Trajectory Timeline */}
      <JourneyTimeline />

      {/* 7. Skills & Technical Expertise */}
      <SkillsSection categories={skillCategories as any} />

      {/* 8. Featured Projects & In-Depth Case Studies */}
      <ProjectsSection projects={projects as any} />

      {/* 9. Professional Experience & Internships */}
      <ExperienceSection experiences={experiences as any} />

      {/* 10. College & Academic Rigor — KIT's College of Engineering Aerial Drone Showcase */}
      <CollegeEducationSection />

      {/* 11. Student Leadership — ByteARQ Sponsorship Head & Byte & Build 3.0 Flagship */}
      <LeadershipSection />

      {/* 12. Achievements — Shito-Ryu Black Belt & National Silver Medal */}
      <AchievementsSection achievements={achievements as any} />

      {/* 13. Strategic Services & Offerings — "How We Can Collaborate" */}
      <ServicesSection services={services as any} />

      {/* 14. Family Heritage & Geographic Roots — Grounded in Lineage & Strong Values */}
      <FamilyHeritageSection />

      {/* 15. AEO / GEO Verified Knowledge Base & FAQ */}
      <FAQSection />

      {/* 15. Technical Insights & Blog */}
      <BlogSection blogs={blogs as any} />

      {/* 16. Verified Resume Document Showcase & One-Click PDF Download */}
      <ResumeSection />

      {/* 17. Fiber-Optic Light Stream Ribbon (Inspired by uploaded animation climax) */}
      <FiberOpticStream />

      {/* 18. Contact & Direct Inquiries (jayeshnimse3@gmail.com) */}
      <ContactSection />

      {/* 19. Visitor Perspectives & Moderated Comments (Positioned down of Contact Section) */}
      <CommentsSection />

      {/* 20. Footer */}
      <Footer />
    </main>
  );
}
