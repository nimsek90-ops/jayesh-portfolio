"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const identities = [
  {
    title: "AI & Technology Builder",
    description:
      "Architecting autonomous AI agent workflows, LLM tool integrations, and modern full-stack platforms that turn complex technical concepts into robust reality.",
    icon: Brain,
    accent: "bg-rose-50 border-rose-200 text-rose-600",
  },
  {
    title: "Business Strategist",
    description:
      "Synthesizing market dynamics, go-to-market roadmaps, and commercial optimization to ensure technology directly drives measurable business value.",
    icon: TrendingUp,
    accent: "bg-indigo-50 border-indigo-200 text-indigo-600",
  },
  {
    title: "Entrepreneur & Founder",
    description:
      "Founder & CEO of ScaleRise MediaTech, building next-generation digital distribution and media-technology systems with aggressive execution.",
    icon: Target,
    accent: "bg-amber-50 border-amber-200 text-amber-600",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>ABOUT MY MISSION</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Where Intelligence Meets Execution
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          &ldquo;Building intelligent solutions at the intersection of AI, Technology and Business.&rdquo;
        </motion.p>
      </div>

      {/* Main Grid: Photo Narrative & Core Positioning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 relative z-10">
        {/* Left Column: Authentic Photograph Representation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-tr from-[#ffe7dc] via-[#fee5eb] to-[#e4e9fc] p-6 sm:p-8 shadow-2xl border border-white/90 flex flex-col items-center">
            {/* Ambient Back Glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-200/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-sky-200/60 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[320px] h-[400px] flex items-center justify-center">
              <Image
                src="/images/jayesh_hero_portrait.png"
                alt="Jayesh Nimse - AI + Technology + Business"
                fill
                sizes="(max-width: 768px) 300px, 320px"
                className="object-contain drop-shadow-xl"
              />
            </div>

            <div className="w-full mt-4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/90 shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Jayesh Nimse</h4>
                <p className="text-xs text-slate-500 font-mono">Founder &amp; AI Technologist</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio Narrative & Focus Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="bg-white/85 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/95 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Crafting Asymmetric Leverage Through Technology
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4 font-normal">
              I am an AI developer, Founder of ScaleRise MediaTech, and a technology-business builder passionate about solving real-world operational bottlenecks. My background uniquely pairs engineering discipline with strategic business execution—allowing me to bridge deep computational solutions with commercial sustainability.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              Whether building autonomous AI agent architectures, optimizing enterprise workflows, or scaling media-technology distribution at <strong className="text-slate-900">ScaleRise MediaTech</strong>, my focus remains steadfast: delivering measurable impact, uncompromising craft, and practical innovation.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-md">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display">100%</span>
              <p className="text-xs text-slate-500 font-mono mt-1">Authentic Execution</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-md">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display">3+</span>
              <p className="text-xs text-slate-500 font-mono mt-1">Core Deployments</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-md col-span-2 sm:col-span-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display">CSBS</span>
              <p className="text-xs text-slate-500 font-mono mt-1">KIT College (TCS)</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Triad Identities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {identities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 border border-white/95 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border shadow-sm ${item.accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-rose-600 gap-1.5 font-mono">
                <span>Core Competency</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
