"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  MessageSquareQuote,
  MessageSquare,
  BookOpen,
  Mail,
  FileText,
  Share2,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  CheckCircle,
  Check,
  X,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface AdminDashboardProps {
  initialData: {
    projects: any[];
    skillCategories: any[];
    experiences: any[];
    achievements: any[];
    services: any[];
    testimonials: any[];
    blogs: any[];
    messages: any[];
    comments?: any[];
    stats: {
      totalViews: number;
      uniqueVisitors: number;
      projectViews: number;
      contactSubmissions: number;
    };
  };
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Local state for interactive CRUD
  const [projects, setProjects] = useState(initialData.projects || []);
  const [skillCategories, setSkillCategories] = useState(initialData.skillCategories || []);
  const [experiences, setExperiences] = useState(initialData.experiences || []);
  const [achievements, setAchievements] = useState(initialData.achievements || []);
  const [services, setServices] = useState(initialData.services || []);
  const [testimonials, setTestimonials] = useState(initialData.testimonials || []);
  const [blogs, setBlogs] = useState(initialData.blogs || []);
  const [messages, setMessages] = useState(initialData.messages || []);
  const [comments, setComments] = useState<any[]>(initialData.comments || []);
  const [commentFilter, setCommentFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [moderatingId, setModeratingId] = useState<string | null>(null);
  const [stats] = useState(initialData.stats);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "AI & Autonomous Systems",
    summary: "",
    problem: "",
    solution: "",
    techStack: "Python, FastAPI, Next.js, MySQL",
    githubUrl: "",
    liveUrl: "",
    featured: true,
  });

  const [showNewAchModal, setShowNewAchModal] = useState(false);
  const [newAch, setNewAch] = useState({
    title: "",
    category: "Martial Arts & Discipline",
    issuer: "National Federation",
    year: "Verified",
    description: "",
  });

  const [showNewExpModal, setShowNewExpModal] = useState(false);
  const [newExp, setNewExp] = useState({
    role: "",
    company: "",
    location: "India",
    period: "2024 — Present",
    isCurrent: true,
    description: "",
    highlights: "",
  });

  const [showNewSrvModal, setShowNewSrvModal] = useState(false);
  const [newSrv, setNewSrv] = useState({
    title: "",
    shortDesc: "",
    icon: "BrainCircuit",
    deliverables: "Architecture, Implementation, Deployment",
  });

  const [showNewTestimonialModal, setShowNewTestimonialModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    authorName: "",
    authorRole: "",
    company: "",
    content: "",
    rating: 5,
  });

  const [showNewBlogModal, setShowNewBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "AI, Architecture, Venture",
  });

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Projects CRUD
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", module: "projects", data: newProject }),
      });
      const data = await res.json();
      if (data.item) {
        setProjects((prev) => [...prev, data.item]);
        setShowNewProjectModal(false);
        setNewProject({
          title: "",
          category: "AI & Autonomous Systems",
          summary: "",
          problem: "",
          solution: "",
          techStack: "Python, FastAPI, Next.js, MySQL",
          githubUrl: "",
          liveUrl: "",
          featured: true,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", module: "projects", id }),
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Achievements CRUD
  const handleCreateAch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", module: "achievements", data: newAch }),
      });
      const data = await res.json();
      if (data.item) {
        setAchievements((prev) => [...prev, data.item]);
        setShowNewAchModal(false);
        setNewAch({
          title: "",
          category: "Martial Arts & Discipline",
          issuer: "National Federation",
          year: "Verified",
          description: "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAch = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", module: "achievements", id }),
      });
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Experience CRUD
  const handleCreateExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", module: "experiences", data: newExp }),
      });
      const data = await res.json();
      if (data.item) {
        setExperiences((prev) => [...prev, data.item]);
        setShowNewExpModal(false);
        setNewExp({
          role: "",
          company: "",
          location: "India",
          period: "2024 — Present",
          isCurrent: true,
          description: "",
          highlights: "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", module: "experiences", id }),
      });
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Services CRUD
  const handleCreateSrv = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", module: "services", data: newSrv }),
      });
      const data = await res.json();
      if (data.item) {
        setServices((prev) => [...prev, data.item]);
        setShowNewSrvModal(false);
        setNewSrv({
          title: "",
          shortDesc: "",
          icon: "BrainCircuit",
          deliverables: "Architecture, Implementation, Deployment",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSrv = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", module: "services", id }),
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Skills CRUD
  const handleSkillLevelChange = async (
    categoryName: string,
    skillName: string,
    newLevel: string
  ) => {
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-level",
          module: "skills",
          data: { categoryName, skillName, newLevel },
        }),
      });

      setSkillCategories((prev) =>
        prev.map((cat) => {
          if (cat.category !== categoryName) return cat;
          return {
            ...cat,
            skills: cat.skills.map((s: any) =>
              s.name === skillName ? { ...s, level: newLevel } : s
            ),
          };
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Messages CRUD
  const handleMarkMessageRead = async (id: string) => {
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark-read", module: "messages", id }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", module: "messages", id }),
      });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Testimonials CRUD
  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          module: "testimonials",
          data: newTestimonial,
        }),
      });
      const data = await res.json();
      if (data.item) {
        setTestimonials((prev) => [data.item, ...prev]);
        setShowNewTestimonialModal(false);
        setNewTestimonial({
          authorName: "",
          authorRole: "",
          company: "",
          content: "",
          rating: 5,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Blogs CRUD
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          module: "blogs",
          data: newBlog,
        }),
      });
      const data = await res.json();
      if (data.item) {
        setBlogs((prev) => [data.item, ...prev]);
        setShowNewBlogModal(false);
        setNewBlog({
          title: "",
          summary: "",
          content: "",
          tags: "AI, Architecture, Venture",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleModerateComment = async (id: string, action: "approve" | "reject" | "delete") => {
    setModeratingId(id);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: "comments", action, id }),
      });
      if (res.ok) {
        if (action === "delete") {
          setComments((prev) => prev.filter((c) => c.id !== id));
        } else if (action === "approve") {
          setComments((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: "APPROVED", approvedAt: new Date().toISOString() } : c))
          );
        } else if (action === "reject") {
          setComments((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: "REJECTED" } : c))
          );
        }
      }
    } catch (e) {
      console.error("Failed to moderate comment:", e);
    } finally {
      setModeratingId(null);
    }
  };

  const navModules = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Website Analytics", icon: BarChart3 },
    { id: "projects", label: "Projects Management", icon: FolderGit2, badge: projects.length },
    { id: "achievements", label: "Achievements & Honors", icon: Award, badge: achievements.length },
    { id: "experience", label: "Experience Management", icon: Briefcase, badge: experiences.length },
    { id: "services", label: "Services Offerings", icon: Layers, badge: services.length },
    { id: "skills", label: "Skills & Proficiency", icon: Cpu },
    {
      id: "comments",
      label: "Visitor Comments",
      icon: MessageSquare,
      badge: comments.filter((c) => c.status === "PENDING").length,
    },
    { id: "blogs", label: "Blog & Insights", icon: BookOpen, badge: blogs.length },
    {
      id: "messages",
      label: "Contact Inquiries",
      icon: Mail,
      badge: messages.filter((m) => !m.isRead).length,
    },
    { id: "settings", label: "Website Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-neutral-200 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-[#12141a] border-r border-white/5 flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="pb-6 border-b border-white/10 mb-6 flex items-center justify-between">
            <Link href="/" target="_blank" className="group">
              <span className="text-lg font-bold text-white tracking-tight uppercase group-hover:text-rose-400 transition-colors">
                JAYESH NIMSE
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                ADMIN CONSOLE
              </span>
            </Link>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" title="Database Connected" />
          </div>

          <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {navModules.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-rose-500 text-white shadow-md font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </div>
                  {m.badge !== undefined && m.badge > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-white text-rose-600" : "bg-white/10 text-neutral-300"
                      }`}
                    >
                      {m.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold border border-rose-500/30">
              JN
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Jayesh Nimse</span>
              <span className="text-[10px] text-neutral-500 block">Super Administrator</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display capitalize">
              {activeTab.replace("-", " ")}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Synchronized directly with persistent storage &amp; MySQL
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {(activeTab === "overview" || activeTab === "analytics") && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Live Page Views
                </span>
                <span className="text-3xl font-black text-white">{stats.totalViews}</span>
                <span className="text-[11px] text-emerald-400 block mt-2">
                  Real recorded telemetry
                </span>
              </div>
              <div className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Unique Visitors
                </span>
                <span className="text-3xl font-black text-white">{stats.uniqueVisitors}</span>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  Privacy-compliant hash count
                </span>
              </div>
              <div className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Contact Inquiries
                </span>
                <span className="text-3xl font-black text-white">{messages.length}</span>
                <span className="text-[11px] text-rose-400 block mt-2">
                  {messages.filter((m) => !m.isRead).length} unread
                </span>
              </div>
              <div className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Active Projects
                </span>
                <span className="text-3xl font-black text-white">{projects.length}</span>
                <span className="text-[11px] text-sky-400 block mt-2">
                  ScaleRise MediaTech, MedNova
                </span>
              </div>
            </div>

            {/* Inbound Enquiries Preview */}
            <div className="p-6 rounded-3xl bg-[#141720] border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Recent Inbound Enquiries</h3>
                <button
                  onClick={() => setActiveTab("messages")}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300"
                >
                  View All ({messages.length}) →
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-xs text-neutral-500 py-6 text-center">
                  No contact messages currently recorded. Real submissions will appear here.
                </p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{m.fullName}</span>
                          <span className="text-xs text-neutral-400">&lt;{m.email}&gt;</span>
                          {!m.isRead && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{m.message}</p>
                      </div>

                      <button
                        onClick={() => handleMarkMessageRead(m.id)}
                        className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5"
                      >
                        {m.isRead ? "Read" : "Mark as Read"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-400"
                />
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => setShowNewProjectModal(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects
                .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-6 rounded-3xl bg-[#141720] border border-white/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                          {p.category}
                        </span>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">{p.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                        {p.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.techStack.map((tech: string) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-white/5 text-neutral-300 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                      <span className="text-emerald-400 font-medium">✓ Published Live</span>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS MANAGEMENT */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Verified distinctions and honors ({achievements.length} active)
              </span>
              <button
                onClick={() => setShowNewAchModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {achievements.map((item) => (
                <div key={item.id} className="p-6 rounded-3xl bg-[#141720] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleDeleteAch(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-neutral-500 mb-3">{item.issuer} • {item.year}</p>
                    <p className="text-xs text-neutral-300 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 mt-4 text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCE MANAGEMENT */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Venture leadership and professional roles ({experiences.length} active)
              </span>
              <button
                onClick={() => setShowNewExpModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-xs text-rose-400 font-semibold">{exp.company} • {exp.period}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1 text-xs text-neutral-400">
                      {exp.highlights.map((h: string, i: number) => (
                        <li key={i}>• {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES OFFERINGS */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Commercial and technical service packages ({services.length} active)
              </span>
              <button
                onClick={() => setShowNewSrvModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {services.map((srv) => (
                <div key={srv.id} className="p-6 rounded-3xl bg-[#141720] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Active</span>
                      <button
                        onClick={() => handleDeleteSrv(srv.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">{srv.shortDesc}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 text-xs text-neutral-500">
                    {srv.deliverables?.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SKILLS MANAGEMENT */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <p className="text-xs text-neutral-400">
              Update proficiency levels without fabricated percentages. Changes persist immediately to unified storage.
            </p>

            <div className="space-y-6">
              {skillCategories.map((cat: any) => (
                <div key={cat.category} className="p-6 rounded-3xl bg-[#141720] border border-white/5">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-rose-400" />
                    <span>{cat.category}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.skills.map((skill: any) => (
                      <div
                        key={skill.name}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-white">{skill.name}</span>
                        <select
                          value={skill.level}
                          onChange={(e) =>
                            handleSkillLevelChange(cat.category, skill.name, e.target.value)
                          }
                          className="text-[11px] font-medium bg-white/10 text-neutral-200 border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-rose-400"
                        >
                          <option value="Proficient" className="bg-[#141720]">
                            Proficient
                          </option>
                          <option value="Advanced" className="bg-[#141720]">
                            Advanced
                          </option>
                          <option value="Expert" className="bg-[#141720]">
                            Expert
                          </option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                {messages.length} total inquiries recorded in MySQL database
              </span>
            </div>

            {messages.length === 0 ? (
              <p className="text-xs text-neutral-500 py-12 text-center bg-[#141720] rounded-3xl border border-white/5">
                No contact submissions currently recorded. Inbound messages from the public form will appear here.
              </p>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      m.isRead
                        ? "bg-[#141720] border-white/5"
                        : "bg-[#181d28] border-rose-500/30 shadow-md"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{m.fullName}</h4>
                          <span className="text-xs text-neutral-400">&lt;{m.email}&gt;</span>
                          {!m.isRead && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                              Unread
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-rose-400 block mt-0.5">
                          Subject: {m.subject}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-neutral-500">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                        {!m.isRead && (
                          <button
                            onClick={() => handleMarkMessageRead(m.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line bg-black/20 p-4 rounded-xl border border-white/5 mb-3">
                      {m.message}
                    </p>

                    {m.serviceInterest && (
                      <div className="text-[11px] text-neutral-400 font-mono">
                        Area of Interest: <span className="text-white">{m.serviceInterest}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: VISITOR COMMENTS MODERATION */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-400 block">
                  Public Visitor Comments &amp; Moderation Gateway
                </span>
                <span className="text-[11px] text-neutral-500">
                  Only comments approved here will be visible on the public website. Visitor emails are never exposed.
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0">
                {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((filter) => {
                  const count =
                    filter === "ALL"
                      ? comments.length
                      : comments.filter((c) => c.status === filter).length;
                  return (
                    <button
                      key={filter}
                      onClick={() => setCommentFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        commentFilter === filter
                          ? "bg-rose-500 text-white shadow-xs"
                          : "text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{filter.charAt(0) + filter.slice(1).toLowerCase()}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white/90">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments List */}
            {comments.filter(
              (c) => commentFilter === "ALL" || c.status === commentFilter
            ).length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#141720] border border-white/5 text-neutral-400 space-y-2">
                <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-neutral-300">
                  No {commentFilter !== "ALL" ? commentFilter.toLowerCase() : ""} comments found
                </p>
                <p className="text-xs text-neutral-500">
                  When visitors submit comments via the website, they will appear here with PENDING status awaiting your review.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments
                  .filter(
                    (c) => commentFilter === "ALL" || c.status === commentFilter
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="p-6 rounded-3xl bg-[#141720] border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs uppercase">
                            {c.name.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{c.name}</span>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  c.status === "APPROVED"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : c.status === "REJECTED"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {c.status}
                              </span>
                            </div>
                            <span className="text-xs text-neutral-400 font-mono">
                              {c.email} • {new Date(c.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Moderation Actions */}
                        <div className="flex items-center gap-2">
                          {c.status !== "APPROVED" && (
                            <button
                              disabled={moderatingId === c.id}
                              onClick={() => handleModerateComment(c.id, "approve")}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}
                          {c.status !== "REJECTED" && (
                            <button
                              disabled={moderatingId === c.id}
                              onClick={() => handleModerateComment(c.id, "reject")}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          )}
                          <button
                            disabled={moderatingId === c.id}
                            onClick={() => handleModerateComment(c.id, "delete")}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-neutral-400 transition-colors disabled:opacity-50"
                            title="Delete comment permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal bg-black/20 p-4 rounded-2xl border border-white/5">
                        {c.content}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 9: BLOG POSTS */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Articles and systems architecture insights
              </span>
              <button
                onClick={() => setShowNewBlogModal(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Draft New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {blogs.map((b) => (
                <div key={b.id} className="p-6 rounded-3xl bg-[#141720] border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block mb-1">
                      {b.publishedAt} • {b.readingTime}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                      {b.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400">
                    <span>✓ Live on Website</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: SETTINGS */}
        {activeTab === "settings" && (
          <div className="p-8 rounded-3xl bg-[#141720] border border-white/5 max-w-2xl space-y-6">
            <h3 className="text-lg font-bold text-white">System Configuration</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Primary Identity Positioning
                </label>
                <input
                  type="text"
                  readOnly
                  value="Building intelligent solutions at the intersection of AI, Technology and Business."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Founder Venture Name
                </label>
                <input
                  type="text"
                  readOnly
                  value="ScaleRise MediaTech"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-neutral-400 font-mono mb-2">
                  Live Platforms Featured
                </label>
                <input
                  type="text"
                  readOnly
                  value="ScaleRise MediaTech, MedNova"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* MODAL: NEW PROJECT */}
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-lg p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Add New Portfolio Project</h3>
              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NextGen Autonomous Agents"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Category</label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Executive Summary *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description of the project..."
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Tech Stack (Comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                  >
                    Save &amp; Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEW ACHIEVEMENT */}
        {showNewAchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Add Verified Achievement</h3>
              <form onSubmit={handleCreateAch} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Achievement Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Black Belt in Karate"
                    value={newAch.title}
                    onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Category</label>
                  <input
                    type="text"
                    value={newAch.category}
                    onChange={(e) => setNewAch({ ...newAch, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Issuer Organization</label>
                  <input
                    type="text"
                    value={newAch.issuer}
                    onChange={(e) => setNewAch({ ...newAch, issuer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={newAch.description}
                    onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewAchModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    Save Achievement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEW EXPERIENCE */}
        {showNewExpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Add Professional Experience</h3>
              <form onSubmit={handleCreateExp} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder & CEO"
                    value={newExp.role}
                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="ScaleRise MediaTech"
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Period</label>
                  <input
                    type="text"
                    value={newExp.period}
                    onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={newExp.description}
                    onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewExpModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    Save Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEW SERVICE */}
        {showNewSrvModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Add Strategic Service</h3>
              <form onSubmit={handleCreateSrv} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Solutions & Autonomous Workflows"
                    value={newSrv.title}
                    onChange={(e) => setNewSrv({ ...newSrv, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={newSrv.shortDesc}
                    onChange={(e) => setNewSrv({ ...newSrv, shortDesc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Deliverables (Comma-separated)</label>
                  <input
                    type="text"
                    value={newSrv.deliverables}
                    onChange={(e) => setNewSrv({ ...newSrv, deliverables: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewSrvModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEW TESTIMONIAL */}
        {showNewTestimonialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Add Verified Endorsement</h3>
              <form onSubmit={handleCreateTestimonial} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.authorName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, authorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Role / Company *</label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.authorRole}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, authorRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Content *</label>
                  <textarea
                    required
                    rows={3}
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewTestimonialModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold"
                  >
                    Save Endorsement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEW BLOG */}
        {showNewBlogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-lg p-8 rounded-3xl bg-[#141720] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Draft New Article</h3>
              <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={newBlog.summary}
                    onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Content (Markdown / Text) *</label>
                  <textarea
                    required
                    rows={5}
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowNewBlogModal(false)}
                    className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
