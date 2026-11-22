"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  MapPin,
  Home,
  ExternalLink,
  Shield,
  Sparkles,
  Compass,
} from "lucide-react";

export default function FamilyHeritageSection() {
  return (
    <section id="heritage" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Subtle ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-rose-200/30 via-pink-100/20 to-sky-200/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-xs"
        >
          <Users className="w-3.5 h-3.5 text-rose-500" />
          <span>FAMILY HERITAGE &amp; ROOTS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Grounded in Values, Heritage &amp; Strong Roots
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Honoring the family lineage and geographic foundations that instill relentless work ethic, humility, and technological ambition.
        </motion.p>
      </div>

      {/* Main Glassmorphic Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        {/* Left Column: Immediate Family Lineage (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-9 rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/95 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500/20" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Immediate Family Lineage
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">The pillars behind every milestone</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-mono font-semibold">
                Nimse Family
              </span>
            </div>

            {/* Family Members Cards */}
            <div className="space-y-4">
              {/* Father */}
              <div className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/50 via-white to-pink-50/30 border border-rose-100/80 shadow-2xs hover:border-rose-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-sm shadow-md">
                      VN
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        Father
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        Vijay Chimaji Nimse
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold font-mono">
                      <Shield className="w-3 h-3 text-rose-500" /> Pillar of Strength
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed pl-14">
                  Guiding with discipline, endurance, and practical business wisdom that shapes my approach to building enduring ventures.
                </p>
              </div>

              {/* Mother */}
              <div className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/50 via-white to-pink-50/30 border border-rose-100/80 shadow-2xs hover:border-rose-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-md">
                      KN
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        Mother
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        Kanchan Vijay Nimse
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold font-mono">
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" /> Guiding Light
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed pl-14">
                  Instilling empathy, unconditional encouragement, moral clarity, and cultural heritage across every step of my journey.
                </p>
              </div>

              {/* Sister */}
              <div className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/50 via-white to-pink-50/30 border border-rose-100/80 shadow-2xs hover:border-rose-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-md">
                      NN
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                        Sister
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        Namrata Vijay Nimse
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold font-mono">
                      <Sparkles className="w-3 h-3 text-indigo-500" /> Family Support
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed pl-14">
                  Continuous camaraderie, shared ambitions, and constant mutual motivation across all personal and professional endeavors.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Rooted in family values</span>
            <span className="font-semibold text-rose-600">Lifelong Inspiration</span>
          </div>
        </motion.div>

        {/* Right Column: Geographic Roots & Residences (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-9 rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/95 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Geographic Roots
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">Residences &amp; Native Heritage</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-sky-700 text-xs font-mono font-semibold">
                Maharashtra
              </span>
            </div>

            <div className="space-y-4">
              {/* Home Residence Card */}
              <a
                href="https://maps.app.goo.gl/LnmBTW9vCKij6p2x6"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl bg-gradient-to-br from-rose-50/60 via-white to-pink-50/40 border border-rose-100/80 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-600 block font-semibold">
                        Primary Residence
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        Sangamner, Maharashtra
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-rose-600 shrink-0">
                    <span>Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 font-normal leading-relaxed">
                  Family home in Sangamner—a prominent commercial, industrial, and educational hub in Ahmednagar district.
                </p>
                <div className="mt-3 pt-2.5 border-t border-rose-100/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Sangamner Base</span>
                  <span className="text-rose-600 font-semibold">Open in Google Maps →</span>
                </div>
              </a>

              {/* Village Home Card */}
              <a
                href="https://maps.app.goo.gl/Yo4tedpvr9NsA8Vq7"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 border border-emerald-100/80 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 block font-semibold">
                        Native Village Home
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Kolwadi / Santwadi, Maharashtra
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-emerald-600 shrink-0">
                    <span>Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 font-normal leading-relaxed">
                  Ancestral roots in Kolwadi / Santwadi—keeping me closely grounded in community values, agrarian resilience, and heritage.
                </p>
                <div className="mt-3 pt-2.5 border-t border-emerald-100/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Ancestral Roots</span>
                  <span className="text-emerald-600 font-semibold">Open in Google Maps →</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Sangamner • Kolwadi • Kolhapur</span>
            <span className="font-semibold text-sky-600">Maharashtra, India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
