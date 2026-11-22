"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Award,
  Maximize2,
  X,
  CheckCircle2,
  Rocket,
  Handshake,
  Building2,
  Layers,
} from "lucide-react";

export default function LeadershipSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="leadership" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-100/40 via-rose-100/40 to-purple-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Users className="w-3.5 h-3.5 text-rose-500" />
          <span>STUDENT &amp; TECH LEADERSHIP</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          ByteARQ — Sponsorship Head
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3.5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Spearheading corporate sponsorships, industry partnerships, and flagship tech events for the Department of Computer Science &amp; Business Systems at KIT&apos;s College of Engineering.
        </motion.p>
      </div>

      {/* Main Feature Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/95 shadow-2xl p-4 sm:p-7 lg:p-9 overflow-hidden"
      >
        {/* Top Header Row inside Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/images/kit_emblem.png"
                alt="KIT's College of Engineering Emblem"
                width={42}
                height={42}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-600">
                  BYTEARQ CODING CLUB // CSBS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Executive Leadership &amp; Sponsorship Wing
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold">
              Sponsorship Head
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono">
              KITCoEK Autonomous
            </span>
          </div>
        </div>

        {/* 16:9 Cinematic Team Photo Display */}
        <div className="relative mt-6 aspect-[16/9] w-full rounded-[1.6rem] sm:rounded-[2.2rem] overflow-hidden bg-neutral-950 shadow-inner group/photo">
          <Image
            src="/images/bytearq_leadership_banner.webp"
            alt="ByteARQ Core Team and Sponsorship Wing at Byte & Build 3.0"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover/photo:scale-[1.025]"
          />

          {/* Dark Gradient Overlay for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

          {/* TOP HUD: Live Event Telemetry */}
          <div className="absolute top-3.5 sm:top-5 inset-x-3.5 sm:inset-x-6 flex items-center justify-between gap-2 z-20">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white shadow-xs">
              <Rocket className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono">
                Flagship Hackathon • Byte &amp; Build 3.0
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              aria-label="Inspect Full Team Photo"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden sm:inline">Inspect Full Photo</span>
            </button>
          </div>

          {/* BOTTOM HUD: Team Attribution & Captions */}
          <div className="absolute bottom-3.5 sm:bottom-6 inset-x-3.5 sm:inset-x-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 z-20 pointer-events-none">
            <div className="pointer-events-auto max-w-xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-300 block mb-1">
                EXECUTIVE STUDENT IMPACT
              </span>
              <h4 className="text-lg sm:text-2xl font-extrabold text-white drop-shadow-md font-display">
                ByteARQ Core Team &amp; Sponsorship Wing
              </h4>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal mt-1 drop-shadow-sm">
                Conducted by the ByteARQ Club under the Department of Computer Science &amp; Business Systems, featuring custom experiential installations and interactive challenge tracks.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end text-right font-mono text-[11px] text-white/80 bg-black/55 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shrink-0">
              <span className="font-semibold text-white">Kolhapur, India</span>
              <span className="text-white/60 text-[10px] mt-0.5">KIT&apos;s College of Engineering</span>
            </div>
          </div>
        </div>

        {/* Three Pillar Cards: Outreach, Event Ops, Mentorship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Card 1: Sponsorship & Industry Partnerships */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-md flex flex-col justify-between hover:border-sky-300 transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-4 shadow-xs">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-base font-bold text-slate-900">
                  Sponsorship Outreach
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Leadership
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                Formulated corporate outreach strategy, pitched to potential partners, and secured sponsor funding and prizes for college-wide competitions.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Promoted from Member to Sponsorship Head</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Budgeting, prize distribution &amp; sponsor deliverables</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Byte & Build 3.0 Flagship Operations */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-md flex flex-col justify-between hover:border-rose-300 transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4 shadow-xs">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-base font-bold text-slate-900">
                  Byte &amp; Build 3.0 Flagship
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Operations
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                Orchestrated the flagship ideation and frontend development launchpad organized by the ByteARQ student club, featuring life-size event installations.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Cross-functional coordination with student teams</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>High student turnout &amp; practical build challenges</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Technical Community & Mentorship */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-md flex flex-col justify-between hover:border-purple-300 transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-4 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-base font-bold text-slate-900">
                  CSBS Tech Community
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Department
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                Actively strengthening the departmental developer culture through hands-on hackathons, peer coding sessions, and industry sponsor alignment.
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Student coding mentorship &amp; project feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Active bridge between faculty and industry partners</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/bytearq_leadership.jpg"
                  alt="ByteARQ Core Team Photo Full Resolution"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-base font-bold text-slate-900">
                  ByteARQ Student Coding Club — Byte &amp; Build 3.0 Flagship
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Department of Computer Science &amp; Business Systems • KIT&apos;s College of Engineering, Kolhapur
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
