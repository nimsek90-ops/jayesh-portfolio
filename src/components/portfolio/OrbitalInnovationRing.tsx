"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  TrendingUp,
  Code2,
  Award,
  Users,
  Target,
  ArrowRight,
  Zap,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface MatrixPill {
  id: string;
  label: string;
  category: string;
  headline: string;
  detail: string;
  metrics: string[];
  angleDeg: number; // for mathematical placement
  // Desktop radial placement classes
  desktopClass: string;
  linkHref?: string;
}

const PILLS: MatrixPill[] = [
  {
    id: "innovation",
    label: "Innovation",
    category: "AI & Autonomous Systems",
    headline: "Multi-Agent LangGraph Architectures",
    detail:
      "Engineering autonomous intelligence pipelines, specialized agent swarms, vector retrieval (RAG), and tool execution loops with Python and modern LLM frameworks.",
    metrics: ["Multi-Agent Swarms", "LangGraph & Python", "Vector RAG Memory"],
    angleDeg: 195,
    desktopClass: "left-[2%] lg:left-[6%] top-[38%] -translate-y-1/2",
    linkHref: "#projects",
  },
  {
    id: "empowerment",
    label: "Empowerment",
    category: "ScaleRise MediaTech",
    headline: "Founder & CEO Venture Growth",
    detail:
      "Directing full-funnel digital media strategies, audience distribution systems, and tech-driven content production to scale high-impact brands and businesses.",
    metrics: ["Founder & CEO", "Digital Distribution", "Organic Reach Systems"],
    angleDeg: 235,
    desktopClass: "left-[5%] lg:left-[10%] bottom-[16%]",
    linkHref: "#leadership",
  },
  {
    id: "clarity",
    label: "Clarity",
    category: "Full-Stack Architecture",
    headline: "MedNova Healthcare Platform",
    detail:
      "Designing resilient, type-safe full-stack web applications with Next.js 14 App Router, TypeScript, Prisma ORM, and high-performance serverless deployments.",
    metrics: ["Next.js 14 & React", "TypeScript & Prisma", "Hospital ERP System"],
    angleDeg: 25,
    desktopClass: "right-[6%] lg:right-[12%] top-[18%]",
    linkHref: "https://mednova-jvn-vercel-snowy.vercel.app/",
  },
  {
    id: "interconnectivity",
    label: "Interconnectivity",
    category: "CSBS Business Strategy",
    headline: "Dual-Engine Tech & Business Mindset",
    detail:
      "Pursuing Computer Science & Business Systems (CSBS) at KIT's College of Engineering Kolhapur. Bridging technical engineering depth with strategic commercial execution.",
    metrics: ["KIT Kolhapur", "CSBS Dual Engineering", "Tech-to-Market Strategy"],
    angleDeg: 0,
    desktopClass: "right-[2%] lg:right-[5%] top-[50%] -translate-y-1/2",
    linkHref: "#education",
  },
  {
    id: "futurism",
    label: "Futurism",
    category: "Discipline & Athletic Rigor",
    headline: "Shito-Ryu 1st Dan Black Belt",
    detail:
      "National Silver Medalist with a decade of martial arts discipline, high-pressure competitive composure, and unwavering perseverance channeled directly into technology execution.",
    metrics: ["1st Dan Black Belt", "National Silver Medalist", "10+ Yrs Martial Arts"],
    angleDeg: 320,
    desktopClass: "right-[4%] lg:right-[9%] bottom-[16%]",
    linkHref: "#achievements",
  },
];

const DOCK_ICONS = [
  { icon: Cpu, label: "Autonomous AI" },
  { icon: TrendingUp, label: "ScaleRise MediaTech" },
  { icon: Code2, label: "Next.js & Cloud" },
  { icon: Target, label: "Business Strategy" },
  { icon: Users, label: "ByteARQ Leadership" },
  { icon: Award, label: "Black Belt Karate" },
];

export default function OrbitalInnovationRing() {
  const [activePill, setActivePill] = useState<MatrixPill>(PILLS[0]);
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-performance HTML5 Canvas Digital Matrix Rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const characters = "0101010101100101JAYESHCSBSAISCALE";
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -40;
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let frameCount = 0;
    const render = () => {
      frameCount++;
      // Render every frame for silky smoothness
      ctx.fillStyle = "rgba(4, 7, 16, 0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glowing head character vs fading trail
        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
        } else if (Math.random() > 0.5) {
          ctx.fillStyle = "#38bdf8";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "#0284c7";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="matrix"
      className="relative w-full py-24 sm:py-32 bg-[#040711] text-white overflow-hidden transition-colors duration-500"
    >
      {/* Silky Top & Bottom Gradient Fades into Page Canvas (#faf7f4) */}
      <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-[#faf7f4] via-[#040711]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-[#faf7f4] via-[#040711]/80 to-transparent pointer-events-none z-20" />

      {/* Deep Cosmos Ambient Star Dust & Radiant Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Tiny Ambient Star Particles */}
      <div className="absolute inset-0 opacity-40 pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
        <div className="absolute top-[28%] right-[18%] w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_10px_#60a5fa]" />
        <div className="absolute top-[65%] left-[12%] w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute top-[75%] right-[22%] w-1 h-1 bg-indigo-300 rounded-full shadow-[0_0_8px_#818cf8]" />
        <div className="absolute top-[45%] left-[85%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 z-10">
        {/* Header with Micro-Icon Dock (matching Projexion frame 012 & 013) */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          
          {/* Floating Icon Dock */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl mb-6"
          >
            {DOCK_ICONS.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredDock === item.label;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredDock(item.label)}
                  onMouseLeave={() => setHoveredDock(null)}
                  className="relative group p-2.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-slate-300 group-hover:text-cyan-300 transition-colors" />

                  {/* Micro Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/95 border border-cyan-500/30 text-cyan-200 text-[10px] font-mono whitespace-nowrap shadow-2xl z-30 pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Monospace Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>OUR MATRIX OF INNOVATION</span>
          </motion.div>

          {/* High-Impact Headline (matching Projexion frame 012 & 013) */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display max-w-3xl leading-[1.12]"
          >
            See what Jayesh Nimse <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              is already engineering
            </span>{" "}
            for the future
          </motion.h2>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-cyan-400 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-lg hover:shadow-cyan-500/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Explore Engineering Work</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* THE CINEMATIC MATRIX PORTAL & FLOATING PILLS (frame 014 MATCH) */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-5xl h-[460px] sm:h-[580px] lg:h-[640px] mx-auto flex items-center justify-center">
          
          {/* Subtle Outer Concentric Orbit Line */}
          <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full border border-cyan-500/20 pointer-events-none" />

          {/* Second Faint Guide Circle */}
          <div className="absolute w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] lg:w-[700px] lg:h-[700px] rounded-full border border-white/5 pointer-events-none" />

          {/* Central Portal Container */}
          <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full flex items-center justify-center">
            
            {/* Luminous Swirling Spiral Vortex Ring (Frame 014 style) */}
            <div
              className="absolute -inset-6 sm:-inset-8 rounded-full pointer-events-none animate-[spin_20s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(6,182,212,0.85) 0deg, rgba(59,130,246,0.9) 90deg, rgba(16,185,129,0.7) 180deg, rgba(6,182,212,0.1) 270deg, rgba(6,182,212,0.85) 360deg)",
                filter: "blur(22px)",
                opacity: 0.85,
              }}
            />

            {/* Counter-rotating Inner Spiral Edge */}
            <div
              className="absolute -inset-3 sm:-inset-4 rounded-full pointer-events-none animate-[spin_15s_linear_infinite_reverse]"
              style={{
                background:
                  "conic-gradient(from 180deg, rgba(56,189,248,0.7) 0deg, transparent 120deg, rgba(14,165,233,0.8) 240deg, rgba(56,189,248,0.7) 360deg)",
                filter: "blur(12px)",
                opacity: 0.75,
              }}
            />

            {/* Aperture / Pure Dark Matrix Portal */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-[#040711] border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex items-center justify-center">
              
              {/* Live HTML5 Canvas Matrix Rain — Unobscured & Cinematic */}
              <canvas ref={canvasRef} className="w-full h-full absolute inset-0 opacity-90" />

              {/* Vignette Rim for Depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(4,7,17,0.95)] pointer-events-none" />

              {/* Minimalist Futuristic Center HUD Badge (Subtle & Non-Obtrusive) */}
              <div className="relative z-20 text-center px-4 py-2 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md pointer-events-none shadow-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-200 uppercase">
                    {activePill.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Floating Capsule Pills (Exactly positioned like Frame 014) */}
          <div className="hidden sm:block">
            {PILLS.map((pill) => {
              const isActive = activePill.id === pill.id;

              return (
                <motion.button
                  key={pill.id}
                  onClick={() => setActivePill(pill)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute z-20 ${pill.desktopClass} px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-2.5 ${
                    isActive
                      ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)] ring-4 ring-cyan-500/20 scale-105"
                      : "bg-[#0b1120]/80 text-slate-300 hover:text-white border border-white/15 hover:border-cyan-400/60 hover:bg-slate-800/90"
                  }`}
                >
                  {/* Active Indicator Pulse Dot */}
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-cyan-400 shadow-[0_0_8px_#38bdf8] scale-125" : "bg-slate-500"
                    }`}
                  />
                  <span>{pill.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile Horizontal Pill Selector Bar (Clean, no overlap) */}
        <div className="sm:hidden flex items-center justify-center gap-2 flex-wrap mt-4 mb-6">
          {PILLS.map((pill) => {
            const isActive = activePill.id === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActivePill(pill)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/30"
                    : "bg-white/10 text-slate-300 border border-white/15"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive HUD Panel (Sleek Glass Card below Portal) */}
        <div className="max-w-2xl mx-auto mt-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-left"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                    {activePill.category}
                  </span>
                </div>
                {activePill.linkHref && (
                  <Link
                    href={activePill.linkHref}
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group"
                  >
                    <span>View Section</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {activePill.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                {activePill.detail}
              </p>

              {/* Metric Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-white/10">
                {activePill.metrics.map((m, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
