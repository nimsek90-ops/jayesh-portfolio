"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Award, Shield, Cpu, Rocket, Camera, Sparkles } from "lucide-react";

interface Milestone {
  phase: string;
  year: string;
  title: string;
  institution: string;
  category: string;
  description: string;
  keyTakeaways: string[];
  icon: React.ElementType;
  badgeColor: string;
}

const milestones: Milestone[] = [
  {
    phase: "01 // FOUNDATION",
    year: "Discipline & Defense",
    title: "Black Belt & National Silver Medalist",
    institution: "National Martial Arts Federation",
    category: "Physical & Mental Conditioning",
    description:
      "Trained rigorously in martial arts to earn a first-degree Black Belt and compete at the national level, clinching the National Silver Medal. This instilled an unbreakable standard of daily discipline, pressure composure, and focus.",
    keyTakeaways: ["High-stress emotional control", "Relentless daily compounding", "Strategic precision"],
    icon: Award,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    phase: "02 // CSBS TECHNOLOGIST",
    year: "Academic & Tech Rigor",
    title: "Computer Science & Business Systems",
    institution: "KIT's College of Engineering, Kolhapur",
    category: "Computational & Business Architecture",
    description:
      "Engineered a dual foundation at the intersection of computational science, algorithms, relational databases, and business systems—fostering deep technical problem-solving with strategic business foresight.",
    keyTakeaways: ["Computational Modeling", "Systems Architecture", "Strategic Execution"],
    icon: Shield,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    phase: "03 // TECHNOLOGY & SYSTEMS",
    year: "Engineering Mastery",
    title: "AI Development & Full-Stack Systems",
    institution: "Technical Projects & Implementations",
    category: "Software & AI Architecture",
    description:
      "Engineered comprehensive production architectures: autonomous AI agent pipelines, health-tech platforms (MedNova Smart Hospital), and high-throughput video production tooling using Python, Next.js, and relational databases.",
    keyTakeaways: ["Autonomous Agent Workflows", "Production Relational Schemas", "Modern Web Architecture"],
    icon: Cpu,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    phase: "04 // ENTREPRENEURSHIP",
    year: "Present & Scale",
    title: "Founder & CEO — ScaleRise MediaTech",
    institution: "ScaleRise MediaTech",
    category: "Media Technology & Growth Venture",
    description:
      "Leading ScaleRise MediaTech as Founder & CEO, transforming digital audience acquisition for brands through high-concurrency systems, algorithmic distribution, and data-driven content architectures.",
    keyTakeaways: ["Founder Leadership", "High-Concurrency Distribution", "Enterprise Revenue Alignment"],
    icon: Rocket,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Lighting in Photo Page Colors */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[350px] bg-rose-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[350px] bg-sky-200/40 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>EVOLUTION & TRAJECTORY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          The Architectural Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          From athletic martial arts discipline to high-performance AI software engineering and venture entrepreneurship.
        </motion.p>
      </div>

      {/* Central Timeline Spine */}
      <div className="relative z-10">
        {/* Vertical line through timeline */}
        <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-indigo-300 pointer-events-none" />

        <div className="flex flex-col gap-12 sm:gap-16">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white/85 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                        {item.phase}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}
                      >
                        {item.year}
                      </span>
                    </div>

                    <div className="flex items-start gap-3.5 mb-3">
                      {item.title.includes("ScaleRise") ? (
                        <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-sm shrink-0 overflow-hidden">
                          <Image
                            src="/images/scalerise_icon.webp"
                            alt="ScaleRise MediaTech"
                            width={44}
                            height={44}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      ) : item.institution.includes("KIT") ? (
                        <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
                          <Image
                            src="/images/kit_emblem.png"
                            alt="KIT's College of Engineering"
                            width={42}
                            height={42}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : item.title.includes("Black Belt") ? (
                        <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
                          <Image
                            src="/images/jayesh_black_belt_square.webp"
                            alt="Karate Black Belt Ceremony"
                            width={44}
                            height={44}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      ) : null}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono font-semibold text-slate-500">
                          {item.institution} • {item.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {item.description}
                    </p>

                    {item.title.includes("Black Belt") && (
                      <div className="mb-4">
                        <a
                          href="#achievements"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors shadow-xs font-mono"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-600" />
                          <span>View Official Black Belt Ceremony Photo</span>
                        </a>
                      </div>
                    )}

                    {/* Key takeaways pills */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {item.keyTakeaways.map((pill) => (
                        <span
                          key={pill}
                          className="text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-full"
                        >
                          ✓ {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Node Badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-rose-400 text-rose-600 flex items-center justify-center shadow-md shrink-0">
                  <Icon className="w-5 h-5 text-rose-500" />
                </div>

                {/* Empty opposite side for spacing on desktop */}
                <div className="hidden lg:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
