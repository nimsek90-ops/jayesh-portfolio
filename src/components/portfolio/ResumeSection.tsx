"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquare,
  Users,
  Award,
  X,
  Languages,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";

export default function ResumeSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "leadership" | "projects">("skills");

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/Jayesh_Nimse_Resume.pdf";
    link.download = "Jayesh_Vijay_Nimse_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2500);
  };

  return (
    <section id="resume" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-100/35 via-sky-100/30 to-amber-100/25 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5 text-rose-500" />
          <span>CURRICULUM VITAE &amp; CREDENTIALS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Official Resume &amp; Credentials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3.5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Verified 1-page resume synthesized for recruiters, founders, venture partners, and prospective collaborators.
        </motion.p>
      </div>

      {/* Main Resume Container Card */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/95 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden text-slate-900">
        {/* Top Header & Actions Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2 font-mono">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                OFFICIAL RESUME // VERIFIED 2026
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                Available for High-Impact Roles
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              JAYESH VIJAY NIMSE
            </h3>
            <p className="text-sm sm:text-base text-rose-600 font-semibold mt-0.5 font-mono">
              AI • Business Strategy • Sales &amp; Marketing
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-neutral-300 font-mono">
              <a
                href="mailto:jayeshnimse3@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>jayeshnimse3@gmail.com</span>
              </a>
              <span className="text-neutral-600">•</span>
              <a
                href="tel:9373084858"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+91 9373084858</span>
              </a>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kolhapur / Pune, India</span>
              </span>
              <span className="text-neutral-600">•</span>
              <a
                href="https://www.linkedin.com/in/jayesh-nimse-5578b526b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-rose-600/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Downloading..." : "Download PDF Resume"}</span>
            </button>

            <a
              href="/Jayesh_Nimse_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:px-4 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
              aria-label="Open PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-3 sm:px-4 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
              aria-label="View Fullscreen Document"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
          </div>
        </div>

        {/* Career Objective Banner */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1.5">
            CAREER OBJECTIVE
          </span>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
            &ldquo;B.Tech Computer Science &amp; Business Systems student combining business strategy, digital marketing and AI project execution. Experienced in lead generation, growth initiatives, AI automation and client-focused solutions.&rdquo;
          </p>
        </div>

        {/* 2-Column Main Display: Left is Visual Document Preview, Right is Structured Interactive Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Authentic Document Preview */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-mono">
                DOCUMENT PREVIEW
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                1 Page • PDF • 550 KB
              </span>
            </div>

            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[1/1.3] rounded-2xl overflow-hidden border border-black/15 shadow-lg group cursor-pointer bg-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.015]"
            >
              <Image
                src="/images/jayesh_resume_preview.webp"
                alt="Jayesh Vijay Nimse Official Resume PDF Preview"
                fill
                priority
                className="object-contain p-2 bg-neutral-50"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Inspect Full Document</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 px-1">
              <span>Updated October 2026</span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="text-rose-600 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Full Document View</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Interactive Structured Breakdown */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Interactive Tabs */}
            <div className="flex items-center gap-2 border-b border-black/10 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "skills"
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-black bg-neutral-100"
                }`}
              >
                Skills &amp; Competencies
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "experience"
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-black bg-neutral-100"
                }`}
              >
                Experience (ScaleRise &amp; Startnex)
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "projects"
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-black bg-neutral-100"
                }`}
              >
                Resume Projects
              </button>
              <button
                onClick={() => setActiveTab("leadership")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "leadership"
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-black bg-neutral-100"
                }`}
              >
                Leadership &amp; Languages
              </button>
            </div>

            {/* TAB 1: SKILLS */}
            {activeTab === "skills" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sales & Business */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    <span>Sales &amp; Business</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lead Generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Market Research</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Business Strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Data Analysis</span>
                    </li>
                  </ul>
                </div>

                {/* Marketing */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Marketing</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Social Media Strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Growth Marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Paid Ads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Client Outreach</span>
                    </li>
                  </ul>
                </div>

                {/* AI & Technical */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                    <Brain className="w-4 h-4" />
                    <span>AI &amp; Technical</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI Agents &amp; Automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI-Generated Video</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Python (Basic) &amp; C</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Excel (Intermediate)</span>
                    </li>
                  </ul>
                </div>

                {/* Soft Skills */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>Soft Skills</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Public Speaking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Negotiation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Active Listening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Digital Communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: EXPERIENCE */}
            {activeTab === "experience" && (
              <div className="space-y-4">
                {/* ScaleRise MediaTech */}
                <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/5 hover:border-black/10 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-2xs shrink-0 overflow-hidden">
                        <Image
                          src="/images/scalerise_icon.webp"
                          alt="ScaleRise MediaTech Official Logo"
                          width={44}
                          height={44}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-neutral-900">ScaleRise MediaTech</h5>
                        <p className="text-xs font-semibold text-rose-600">Founder &amp; CEO | AI &amp; Business Strategy</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      Active Founder
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700 mt-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Built and developed AI-powered business solutions for marketing and growth.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Built a calling agent to automate customer outreach and lead communication.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Created professional AI-generated videos for business and marketing use cases.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Worked on client outreach, digital marketing, automation and growth strategy.</span>
                    </li>
                  </ul>
                </div>

                {/* Startnex Professional Marketing */}
                <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/5 hover:border-black/10 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-2xs shrink-0 overflow-hidden">
                        <Image
                          src="/images/startnex_icon.webp"
                          alt="Startnex Solutions Official Logo"
                          width={44}
                          height={44}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-neutral-900">Startnex Professional Marketing</h5>
                        <p className="text-xs font-semibold text-blue-600">Business &amp; Marketing Intern</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 bg-neutral-200/70 px-2.5 py-0.5 rounded-full shrink-0">
                      Internship
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700 mt-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Worked on lead generation and outreach.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Assisted in digital marketing and campaign analysis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Contributed to business growth strategies.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <h5 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>AI Calling Agent</span>
                  </h5>
                  <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                    Built an AI-powered calling workflow focused on automated outreach and lead communication.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-rose-600" />
                        <span>Professional AI-Generated Video</span>
                      </h5>
                      <a
                        href="https://www.instagram.com/reel/DaLCaezI97s/?utm_source=ig_web_copy_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60 transition-colors"
                      >
                        <span>Watch Reel</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                      Created professional AI-generated video content and high-retention media workflows for business and marketing applications.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <h5 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Business Model Research</span>
                  </h5>
                  <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                    Researched EdTech business models and growth strategies to optimize customer acquisition and retention.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: LEADERSHIP & LANGUAGES */}
            {activeTab === "leadership" && (
              <div className="space-y-4">
                {/* Leadership: Byte ARQ Club */}
                <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/5 hover:border-black/10 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-11 h-11 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-2xs shrink-0 overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/kit_emblem.png"
                          alt="KIT CSBS byteARQ Club"
                          width={38}
                          height={38}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-neutral-900">Byte ARQ Club — Sponsorship Head</h5>
                        <p className="text-xs font-semibold text-neutral-500">Department of CSBS • KITCoEK</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500 bg-neutral-200/70 px-2 py-0.5 rounded-full shrink-0">
                      Leadership
                    </span>
                  </div>

                  {/* Byte & Build 3.0 Photo Banner */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-black/10 shadow-xs mb-3 group/byte bg-neutral-900">
                    <Image
                      src="/images/bytearq_leadership.webp"
                      alt="Byte & Build 3.0 Core Team & Sponsorship Wing"
                      fill
                      className="object-cover object-center group-hover/byte:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                      <span className="font-semibold drop-shadow-md">Byte &amp; Build 3.0 • Team &amp; Sponsorship Wing</span>
                      <a
                        href="#leadership"
                        className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-[10px] font-medium border border-white/20 transition-colors"
                      >
                        Explore Leadership Section →
                      </a>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Promoted from Member to Sponsorship Head.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Spearheaded sponsorship outreach, partner negotiations, and event operations for Byte &amp; Build 3.0.</span>
                    </li>
                  </ul>
                </div>

                {/* Education Summary 1: College */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-2xs shrink-0 overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/kit_emblem.png"
                        alt="KIT's College of Engineering"
                        width={38}
                        height={38}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-neutral-900">B.Tech – Computer Science &amp; Business Systems</h6>
                      <p className="text-[11px] text-neutral-500">KIT&apos;s College of Engineering, Kolhapur • Second Year</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-neutral-600 bg-white px-2.5 py-1 rounded-full border border-black/5">
                    Kolhapur, India
                  </span>
                </div>

                {/* Education Summary 2: School (10th Standard SSC - 87.4%) */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-2xs shrink-0 overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/school_malpani_vidyalaya.webp"
                        alt="Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner"
                        width={38}
                        height={38}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-neutral-900">Secondary School Certificate (SSC / 10th)</h6>
                      <p className="text-[11px] text-neutral-500">Matoshri R. D. Malpani Vidyalaya, Sangamner • 87.4%</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    87.4% Distinction
                  </span>
                </div>

                {/* Languages */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-black/5">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider mb-2.5">
                    <Languages className="w-4 h-4 text-emerald-600" />
                    <span>Languages</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-black/5 text-center">
                      <span className="font-bold text-neutral-900 block">English</span>
                      <span className="text-[11px] text-neutral-500">Professional</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-black/5 text-center">
                      <span className="font-bold text-neutral-900 block">Hindi</span>
                      <span className="text-[11px] text-neutral-500">Professional</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-black/5 text-center">
                      <span className="font-bold text-neutral-900 block">Marathi</span>
                      <span className="text-[11px] text-neutral-500">Native</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen PDF Inspection */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/80">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Jayesh Vijay Nimse — Official Resume
                  </h4>
                  <p className="text-xs text-neutral-400">
                    B.Tech CSBS • AI, Business Strategy &amp; Sales Marketing
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Document Display */}
              <div className="relative w-full flex-1 min-h-[500px] overflow-auto bg-neutral-950 p-4 sm:p-6 flex items-center justify-center">
                <div className="relative w-full max-w-2xl aspect-[1/1.3] shadow-2xl rounded-lg overflow-hidden bg-white">
                  <Image
                    src="/images/jayesh_resume_preview.png"
                    alt="Jayesh Vijay Nimse Official Resume Full High-Resolution View"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-neutral-950/90 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Verified Resume • Updated October 2026</span>
                <a
                  href="/Jayesh_Nimse_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <span>Open PDF in full browser window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
