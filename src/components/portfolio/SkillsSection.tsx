"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Brain,
  Database,
  TrendingUp,
  BarChart3,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { SkillCategoryData } from "@/lib/data-defaults";

const iconMap: Record<string, React.ElementType> = {
  Programming: Code,
  "Artificial Intelligence": Brain,
  "Development & Systems": Database,
  "Business Strategy & Growth": TrendingUp,
  "Analytics & Intelligence": BarChart3,
};

interface SkillsSectionProps {
  categories: SkillCategoryData[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.category || "Programming");

  const currentCategoryData = categories.find((c) => c.category === activeCategory) || categories[0];

  return (
    <section id="skills" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 text-rose-500" />
          <span>TECHNICAL ARSENAL &amp; CAPABILITIES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Skills &amp; Technical Expertise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          A multidimensional stack engineered for high-performance software, autonomous AI systems, and strategic enterprise expansion.
        </motion.p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 relative z-10">
        {categories.map((cat) => {
          const Icon = iconMap[cat.category] || Sparkles;
          const isActive = cat.category === activeCategory;

          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl font-bold scale-105"
                  : "bg-white/80 text-slate-600 border-slate-200/80 hover:text-slate-900 hover:bg-white hover:border-slate-300 shadow-sm"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-rose-400" : "text-slate-500"}`} />
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Skill Cards Grid */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {currentCategoryData?.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {skill.level}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal">
                    Verified Competency in Production Workflows
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>CATEGORY • {activeCategory.toUpperCase()}</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
