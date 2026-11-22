"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Building2,
  Calendar,
  Play,
  Pause,
  Maximize2,
  Sparkles,
  BookOpen,
  Compass,
  ShieldCheck,
  CheckCircle2,
  X,
  Layers,
  Award,
  Video as VideoIcon,
  Camera,
  ExternalLink,
  School,
  TrendingUp,
} from "lucide-react";

export default function CollegeEducationSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<"video" | "photo">("video");
  const [isKitLightboxOpen, setIsKitLightboxOpen] = useState(false);
  const [isSchoolLightboxOpen, setIsSchoolLightboxOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const kitCardRef = useRef<HTMLDivElement>(null);
  const schoolCardRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt on Mouse Movement for KIT
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3.5, 3.5]);

  // 3D Tilt for School Card
  const schoolMouseX = useMotionValue(0);
  const schoolMouseY = useMotionValue(0);
  const smoothSchoolMouseX = useSpring(schoolMouseX, springConfig);
  const smoothSchoolMouseY = useSpring(schoolMouseY, springConfig);
  const schoolRotateX = useTransform(smoothSchoolMouseY, [-0.5, 0.5], [3.5, -3.5]);
  const schoolRotateY = useTransform(smoothSchoolMouseX, [-0.5, 0.5], [-3.5, 3.5]);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(touch);
    setIsReducedMotion(reduced);

    if (reduced && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleKitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || isReducedMotion || !kitCardRef.current) return;
    const rect = kitCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleKitMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSchoolMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || isReducedMotion || !schoolCardRef.current) return;
    const rect = schoolCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    schoolMouseX.set(x);
    schoolMouseY.set(y);
  };

  const handleSchoolMouseLeave = () => {
    schoolMouseX.set(0);
    schoolMouseY.set(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="education" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-sky-200/35 via-rose-100/30 to-amber-100/25 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <GraduationCap className="w-3.5 h-3.5 text-rose-500" />
          <span>ACADEMIC FOUNDATIONS &amp; INSTITUTIONS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Academic Rigor &amp; Institutional Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3.5 max-w-3xl text-sm sm:text-base text-slate-600 font-normal leading-relaxed"
        >
          From foundational scholastic distinction in Sangamner to cutting-edge Computer Science &amp; Business Systems engineering at KIT Kolhapur.
        </motion.p>
      </div>

      {/* ========================================================================= */}
      {/* INSTITUTION 1: KIT's COLLEGE OF ENGINEERING, KOLHAPUR (UNDERGRADUATE CSBS) */}
      {/* ========================================================================= */}
      <div className="mb-20">
        {/* Sub-Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-rose-600 uppercase">
                INSTITUTION // 01 • HIGHER ENGINEERING EDUCATION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              KIT&apos;s College of Engineering, Kolhapur
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href="https://maps.google.com/?q=KIT's+College+of+Engineering+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-rose-600 transition-colors shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Kolhapur, Maharashtra</span>
            </a>
            <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold">
              B.Tech CSBS (Second Year)
            </span>
          </div>
        </div>

        {/* Main Cinematic 16:9 Showcase Card */}
        <motion.div
          ref={kitCardRef}
          onMouseMove={handleKitMouseMove}
          onMouseLeave={handleKitMouseLeave}
          style={{
            rotateX: isTouchDevice || isReducedMotion ? 0 : rotateX,
            rotateY: isTouchDevice || isReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[2rem] sm:rounded-[2.5rem] p-2.5 sm:p-3.5 bg-gradient-to-b from-white/95 via-white/80 to-white/60 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative group overflow-hidden"
        >
          {/* Subtle holographic border shimmer */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-sky-400/10 via-transparent to-rose-400/10 pointer-events-none" />

          {/* 16:9 Aspect Ratio Video Viewport */}
          <div className="relative aspect-[16/9] w-full rounded-[1.6rem] sm:rounded-[2.2rem] overflow-hidden bg-neutral-950 shadow-inner group/viewport">
            {/* Media Player: Cinematic Drone Video */}
            <div className={`relative w-full h-full transition-opacity duration-500 ${viewMode === "video" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/kit_campus_poster.webp"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/viewport:scale-[1.025]"
              >
                <source src="/videos/kit_campus_drone_cinematic.mp4" type="video/mp4" />
                <source src="/videos/kit_campus_drone_cinematic.webm" type="video/webm" />
                <Image
                  src="/images/kit_campus_aerial.webp"
                  alt="KIT's College of Engineering, Kolhapur campus aerial drone view"
                  fill
                  priority
                  className="object-cover"
                />
              </video>
            </div>

            {/* Media Player: High-Res Aerial Still Photograph Mode */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${viewMode === "photo" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <Image
                src="/images/kit_campus_aerial.webp"
                alt="KIT's College of Engineering, Kolhapur high-resolution aerial photograph"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover/viewport:scale-[1.025]"
              />
            </div>

            {/* Subtle Dark Gradient Overlays for High-Contrast Cinematic Presentation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-transparent to-black/45 pointer-events-none" />

            {/* TOP HUD: Live Indicator & Controls */}
            <div className="absolute top-3.5 sm:top-5 inset-x-3.5 sm:inset-x-6 flex items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-2 bg-black/55 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20 text-white shadow-xs">
                <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-rose-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono">
                  {viewMode === "video" ? "Aerial Drone Push-In • 16:9" : "Pristine Aerial Photograph"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setViewMode("video")}
                    className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                      viewMode === "video"
                        ? "bg-white text-black shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <VideoIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">Drone Video</span>
                  </button>
                  <button
                    onClick={() => setViewMode("photo")}
                    className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                      viewMode === "photo"
                        ? "bg-white text-black shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Camera className="w-3 h-3" />
                    <span className="hidden sm:inline">Still Photo</span>
                  </button>
                </div>

                {viewMode === "video" && (
                  <button
                    onClick={togglePlay}
                    className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 fill-emerald-400" />}
                  </button>
                )}

                <button
                  onClick={() => setIsKitLightboxOpen(true)}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105 active:scale-95 shadow-xs"
                  aria-label="Fullscreen High-Res View"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* BOTTOM HUD: Campus Identification */}
            <div className="absolute bottom-3.5 sm:bottom-6 inset-x-3.5 sm:inset-x-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white pointer-events-none">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <Building2 className="w-4 h-4 text-rose-400" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-rose-300 font-bold drop-shadow-sm">
                    Autonomous Engineering Campus
                  </span>
                </div>
                <h4 className="text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  Kolhapur Institute of Technology
                </h4>
                <p className="text-xs text-neutral-300 font-normal leading-relaxed drop-shadow-sm hidden sm:block mt-1">
                  Established in 1983. Grade &apos;A+&apos; Accredited by NAAC. 30+ acre lush campus dedicated to technology and business systems.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end text-right font-mono text-[11px] text-neutral-300/90">
                <span className="text-white font-semibold">TCS-Curated CSBS Curriculum</span>
                <span>NAAC A+ Autonomous • Shivaji University</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* INSTITUTION 2: MATOSHRI RUKMINIBAI DAMODAR MALPANI VIDYALAYA (10TH • 87.4%) */}
      {/* ========================================================================= */}
      <div className="mb-16">
        {/* Sub-Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">
                INSTITUTION // 02 • FOUNDATIONAL SECONDARY EDUCATION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner
            </h3>
            <p className="text-xs text-slate-500 font-serif italic mt-0.5">
              मातोश्री रुक्मिणीबाई दामोदर मालपाणी विद्यालय (श्री. श्रीकिसन कस्तुरचंद लोढा ट्रस्ट), संगमनेर
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <a
              href="https://maps.app.goo.gl/LnmBTW9vCKij6p2x6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-emerald-600 transition-colors shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sangamner, Maharashtra</span>
            </a>
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-black text-xs shadow-xs">
              10th Standard (SSC) • 87.4%
            </span>
          </div>
        </div>

        {/* Main Architectural Showcase Card for School */}
        <motion.div
          ref={schoolCardRef}
          onMouseMove={handleSchoolMouseMove}
          onMouseLeave={handleSchoolMouseLeave}
          style={{
            rotateX: isTouchDevice || isReducedMotion ? 0 : schoolRotateX,
            rotateY: isTouchDevice || isReducedMotion ? 0 : schoolRotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-5 bg-gradient-to-b from-white/95 via-white/80 to-white/60 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative group overflow-hidden"
        >
          {/* Subtle holographic border shimmer */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-emerald-400/10 via-transparent to-amber-400/10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Building Photograph */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-neutral-900 shadow-md group/img">
              <Image
                src="/images/school_malpani_vidyalaya.webp"
                alt="Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner - 10th School with 87.4%"
                fill
                priority
                className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top HUD Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-mono">
                <School className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sangamner Campus Building</span>
              </div>

              {/* Fullscreen Zoom Trigger */}
              <button
                onClick={() => setIsSchoolLightboxOpen(true)}
                className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-xs"
                aria-label="Inspect School Photograph"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block mb-0.5">
                  Academic Foundation
                </span>
                <p className="text-sm font-bold">
                  Matoshri Rukminibai Damodar Malpani Vidyalaya
                </p>
                <p className="text-[11px] text-neutral-300 font-serif italic">
                  Shri Shrikisan Kasturchand Lodha Trust • Sangamner
                </p>
              </div>
            </div>

            {/* Right: Academic Achievement & Foundation Breakdown */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase mb-3">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scholastic Distinction: 87.4%</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-3">
                  Foundational Scholastic Excellence in 10th Standard (SSC)
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                  Completed Secondary School Certificate (SSC / 10th Standard) with <strong className="text-slate-900 font-bold">87.4%</strong> at Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner under the Shri Shrikisan Kasturchand Lodha Trust. This rigorous scholastic foundation instilled strong analytical reasoning, mathematical aptitude, and intellectual discipline.
                </p>

                {/* 4 Foundation Highlight Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                    <span className="text-xs font-mono font-bold text-emerald-600 uppercase block mb-1">
                      87.4% High Distinction
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Top-tier academic performance in the Maharashtra State Board examination.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                    <span className="text-xs font-mono font-bold text-sky-600 uppercase block mb-1">
                      Analytical Mastery
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Strong grounding in mathematics, logical sciences, and structured problem-solving.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                    <span className="text-xs font-mono font-bold text-purple-600 uppercase block mb-1">
                      Dual Rigor
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Harmonized rigorous school curriculum with national-level Shito-Ryu Karate training.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                    <span className="text-xs font-mono font-bold text-rose-600 uppercase block mb-1">
                      Roots in Sangamner
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Nurtured with core family ethics and community values in home city Sangamner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Location & Trust Info Footer */}
              <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-mono">
                  Affiliated: Maharashtra State Board (SSC)
                </span>
                <a
                  href="https://maps.app.goo.gl/LnmBTW9vCKij6p2x6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900 font-mono group"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>View Sangamner Location</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal: KIT College Aerial Overview */}
      <AnimatePresence>
        {isKitLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsKitLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/80">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    KIT&apos;s College of Engineering, Kolhapur
                  </h4>
                  <p className="text-xs text-neutral-400">
                    High-Resolution Aerial Campus Overview • Kolhapur, Maharashtra, India
                  </p>
                </div>

                <button
                  onClick={() => setIsKitLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src="/images/kit_campus_aerial.webp"
                  alt="KIT's College of Engineering aerial campus photography"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="px-6 py-4 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Building2 className="w-4 h-4" />
                  Autonomous Engineering Campus • NAAC A+
                </span>
                <span className="font-mono text-neutral-400">
                  Kolhapur, Maharashtra, India
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal: Matoshri Malpani Vidyalaya School Inspection */}
      <AnimatePresence>
        {isSchoolLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSchoolLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/80">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Shri Shrikisan Kasturchand Lodha Trust • 10th Standard SSC Board (87.4%)
                  </p>
                </div>

                <button
                  onClick={() => setIsSchoolLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-square sm:aspect-[4/3] w-full bg-black">
                <Image
                  src="/images/school_malpani_vidyalaya.webp"
                  alt="Matoshri Rukminibai Damodar Malpani Vidyalaya Sangamner high-resolution photograph"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="px-6 py-4 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Award className="w-4 h-4" />
                  Secondary School Certificate (SSC) • 87.4% Distinction
                </span>
                <span className="font-mono text-neutral-400">
                  Sangamner, Maharashtra, India
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
