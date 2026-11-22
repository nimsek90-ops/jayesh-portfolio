"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Building2, Calendar, CheckCircle2, ArrowDown } from "lucide-react";
import { ExperienceData } from "@/lib/data-defaults";
import Link from "next/link";

interface ExperienceSectionProps {
  experiences: ExperienceData[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[300px] bg-amber-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Briefcase className="w-3.5 h-3.5 text-rose-500" />
          <span>CAREER TRAJECTORY &amp; VENTURE ROLES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Venture Leadership &amp; Strategy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Demonstrated executive execution across startup ventures, technology leadership, and product strategy.
        </motion.p>
      </div>

      {/* 2-Column Responsive Venture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3.5">
                  {exp.company.toLowerCase().includes("scalerise") ? (
                    <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-md shrink-0 overflow-hidden">
                      <Image
                        src="/images/scalerise_icon.webp"
                        alt="ScaleRise MediaTech"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  ) : exp.company.toLowerCase().includes("startnex") ? (
                    <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-md shrink-0 overflow-hidden">
                      <Image
                        src="/images/startnex_icon.webp"
                        alt="Startnex Solutions"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                    <p className="text-sm font-semibold text-rose-600 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{exp.period}</span>
                  </span>
                  {exp.isCurrent && (
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Current
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                {exp.description}
              </p>
            </div>

            {/* Bullet highlights */}
            <ul className="space-y-2.5 pt-4 border-t border-slate-100">
              {exp.highlights.map((bullet, i) => (
                <li key={i} className="text-xs sm:text-[13px] text-slate-600 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bridge indicator linking to College & Education Section */}
      <div className="mt-12 flex justify-center relative z-10">
        <Link
          href="#education"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white px-5 py-2.5 rounded-full border border-slate-200/80 shadow-md transition-all hover:scale-105"
        >
          <span>Explore Academic Foundation &amp; Campus Aerial Showcase</span>
          <ArrowDown className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
