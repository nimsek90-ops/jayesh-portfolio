"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "../icons/SocialIcons";
import Navbar from "../navigation/Navbar";
import Hero3DCanvas from "./Hero3DCanvas";

interface HeroSectionProps {
  socialLinks?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

export default function HeroSection({
  socialLinks = {
    linkedin: "https://www.linkedin.com/in/jayesh-nimse-5578b526b",
    github: "https://github.com/nimsek90-ops",
    instagram: "https://www.instagram.com/jayesh_v_nimse",
  },
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse-follow parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformations for 3D depth layering
  const photoParallaxX = useTransform(smoothX, [-300, 300], [-8, 8]);
  const photoParallaxY = useTransform(smoothY, [-300, 300], [-6, 6]);
  const textParallaxX = useTransform(smoothX, [-300, 300], [8, -8]);
  const textParallaxY = useTransform(smoothY, [-300, 300], [6, -6]);
  const cardParallaxX = useTransform(smoothX, [-300, 300], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // URL Hash Reset on Scroll to Hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120 && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen px-3 sm:px-6 md:px-8 pt-4 pb-12 flex flex-col items-center justify-between overflow-hidden bg-[#faf7f4]"
    >
      {/* Outer Floating Canvas (Reference Design Card Frame) */}
      <div className="relative w-full max-w-[1440px] min-h-[92vh] rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden shadow-2xl border border-white/80 bg-gradient-to-b from-[#ffe7dc] via-[#fee5eb] to-[#e4e9fc] flex flex-col justify-between">
        {/* Subtle Radial Glows & Ambient Highlights */}
        <div className="absolute top-0 left-6 w-[420px] h-[420px] bg-rose-200/25 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-sky-200/35 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-100/35 rounded-full blur-[90px] pointer-events-none" />

        {/* Three.js Interactive 3D WebGL Canvas Layer */}
        <Hero3DCanvas />

        {/* 1. Header Navigation - Top-Left brand & Top-Right hamburger */}
        <Navbar />

        {/* 2. Central Hero Stage with Multi-layered Typography & Jayesh's Photograph */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 pt-4 pb-16">
          
          {/* Top Category Label (Above the giant headline) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center z-10 mb-2 sm:mb-3"
          >
            <span className="inline-block text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#111418] uppercase bg-white/45 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 shadow-sm">
              JAYESH NIMSE • OFFICIAL PORTFOLIO
            </span>
          </motion.div>

          {/* Main Giant Headline: INNOVATOR (Positioned BEHIND Jayesh's photograph) */}
          <div className="relative w-full flex flex-col items-center justify-center">
            <motion.div
              style={{ x: textParallaxX, y: textParallaxY }}
              className="relative select-none pointer-events-none text-center"
            >
              <h1 className="font-extrabold text-[14.5vw] sm:text-[13.5vw] lg:text-[150px] xl:text-[170px] leading-[0.88] tracking-tighter text-[#12141a] uppercase flex flex-col items-center justify-center font-display">
                <span className="sr-only">
                  Jayesh Nimse Portfolio — Jayesh Vijay Nimse | Founder &amp; CEO at ScaleRise MediaTech &amp; Full-Stack Developer
                </span>
                <span className="flex items-center justify-center">
                  <span>INNOVATOR</span>
                  {/* Reference 4-Point Star Spark */}
                  <motion.span
                    animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.15, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="inline-block text-black ml-1 sm:ml-2 text-3xl sm:text-5xl lg:text-7xl align-top select-none"
                  >
                    ✦
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline flanking texts: Symmetrical vertical spacing below INNOVATOR */}
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-6 mt-3 sm:mt-5 md:mt-6 z-10">
              {/* Left Badge: Title Case with Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-bold text-[#1a1c22] tracking-tight bg-white/65 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full shadow-xs border border-white/80"
              >
                <span>Building Intelligent Solutions</span>
                <span className="inline-block text-base sm:text-lg">→</span>
              </motion.div>

              {/* Right Badge: Title Case with Sparkles */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-bold text-[#1a1c22] tracking-tight bg-white/65 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full shadow-xs border border-white/80 text-right"
              >
                <span>Business &amp; Tech Impact</span>
                <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" />
              </motion.div>
            </div>

            {/* 3. Jayesh Nimse Cutout Photograph (Layered IN FRONT of INNOVATOR with letter V clearly visible) */}
            <motion.div
              style={{ x: photoParallaxX, y: photoParallaxY }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-20 w-[270px] sm:w-[350px] md:w-[420px] lg:w-[470px] max-w-full pointer-events-none select-none flex justify-center"
            >
              {/* Subtle back-glow aura */}
              <div className="absolute inset-0 bg-white/25 rounded-full blur-2xl -z-10 scale-95" />

              {/* High-res optimized cutout with crisp edges and priority loading */}
              <div className="relative w-full h-[340px] sm:h-[440px] md:h-[530px] lg:h-[590px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]">
                <Image
                  src="/images/jayesh_hero_portrait_highres.webp"
                  alt="Jayesh Nimse - AI + Technology + Business"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 640px) 270px, (max-width: 768px) 350px, (max-width: 1024px) 420px, 470px"
                  className="object-contain object-bottom"
                />
              </div>
            </motion.div>
          </div>

          {/* 4. Left Side Card: Unified Glassmorphic Bio & Links */}
          <motion.div
            style={{ x: cardParallaxX }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute left-4 sm:left-8 lg:left-12 bottom-20 sm:bottom-24 max-w-[290px] sm:max-w-[325px] z-30 hidden md:flex flex-col gap-3.5 bg-white/75 backdrop-blur-xl p-5 sm:p-6 rounded-[2rem] border border-white/85 shadow-lg hover:shadow-xl transition-all"
          >
            {/* Header / Brand Logo Badge */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-white border border-neutral-200/90 p-1.5 shadow-md rotate-[-3deg] hover:rotate-0 transition-transform shrink-0 overflow-hidden group">
                <Image
                  src="/images/scalerise_icon.webp"
                  alt="ScaleRise MediaTech Official Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain rounded-xl"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-800 font-mono">
                  Founder &amp; CSBS Technologist
                </span>
                <span className="text-xs text-rose-600 font-bold">
                  ScaleRise MediaTech
                </span>
              </div>
            </div>

            {/* Updated Bio Statement */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-medium">
              I&apos;m <strong className="text-black font-semibold">Jayesh Vijay Nimse</strong>, Founder &amp; CEO of ScaleRise MediaTech and a CSBS technologist. I build intelligent solutions, explore emerging technologies, and turn ideas into practical business outcomes.
            </p>

            {/* Social Icons Pill */}
            <div className="flex items-center gap-2 pt-1 border-t border-black/5">
              <span className="text-[11px] font-mono text-neutral-500 mr-1">Connect:</span>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-rose-600 hover:scale-110 transition-all text-xs"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-rose-600 hover:scale-110 transition-all text-xs"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-rose-600 hover:scale-110 transition-all text-xs"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 5. Right Side Credibility Card: Clean Founder Proof & Three Core Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute right-4 sm:right-8 lg:right-12 bottom-20 sm:bottom-24 max-w-[290px] sm:max-w-[325px] z-30 hidden md:flex flex-col gap-3 bg-white/75 backdrop-blur-xl p-5 sm:p-6 rounded-[2rem] border border-white/85 shadow-lg hover:shadow-xl transition-all"
          >
            {/* Top Founder Proof */}
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-rose-600">
                PROVEN FOUNDER EXECUTION
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-neutral-900 font-display">Live Systems &amp; Platforms</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50/90 border border-rose-200/70 text-[11px] font-bold text-rose-700 shadow-2xs">
                  <span className="relative w-4 h-4 rounded-full overflow-hidden bg-white shrink-0 inline-block border border-rose-200/50">
                    <Image
                      src="/images/scalerise_icon.webp"
                      alt="ScaleRise Logo"
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                    />
                  </span>
                  <span>ScaleRise</span>
                </div>
                <span className="text-neutral-300">•</span>
                <span className="text-[11px] font-semibold text-neutral-600">MedNova</span>
                <span className="text-neutral-300">•</span>
                <span className="text-[11px] font-semibold text-neutral-600">AI Pipelines</span>
              </div>
            </div>

            <div className="w-full h-px bg-black/10 my-0.5" />

            {/* Three-point checklist */}
            <ul className="space-y-2 text-xs font-semibold text-neutral-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI &amp; Intelligent Automation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Technology &amp; Software Dev</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Business Strategy &amp; Growth</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 6. Mobile Left & Right Content Drawer (Shown gracefully on mobile devices) */}
        <div className="md:hidden z-20 px-6 -mt-8 mb-6 flex flex-col gap-4">
          <div className="bg-white/85 backdrop-blur-md p-5 rounded-2xl border border-white shadow-sm">
            <div className="flex items-center gap-3 mb-3 pb-2.5 border-b border-black/5">
              <div className="relative w-10 h-10 rounded-xl bg-white border border-neutral-200/90 p-1 shadow-xs shrink-0 overflow-hidden">
                <Image
                  src="/images/scalerise_icon.webp"
                  alt="ScaleRise MediaTech Official Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-800 font-mono">
                  Founder &amp; CSBS Technologist
                </span>
                <span className="text-xs text-rose-600 font-bold">ScaleRise MediaTech</span>
              </div>
            </div>
            <p className="text-xs text-neutral-800 leading-relaxed font-medium">
              I&apos;m <strong className="text-black font-semibold">Jayesh Nimse</strong>, Founder of ScaleRise MediaTech and a CSBS technologist. I build intelligent solutions, explore emerging technologies, and turn ideas into practical business outcomes.
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
              <div className="flex items-center gap-2">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs"
                >
                  <LinkedInIcon className="w-3 h-3" />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs"
                >
                  <GitHubIcon className="w-3 h-3" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs"
                >
                  <InstagramIcon className="w-3 h-3" />
                </a>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3+ Live Platforms
              </span>
            </div>
          </div>
        </div>

        {/* 7. Bottom CTA Capsule: Large Dark Pill-Shaped Banner (Exact Reference Match) */}
        <div className="relative z-30 w-full flex justify-center pb-6 sm:pb-8 px-4">
          <Link
            href="#contact"
            className="group relative flex items-center justify-between gap-4 sm:gap-8 bg-[#111317] hover:bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-2xl border border-white/20 transition-all duration-300 hover:scale-[1.02] max-w-xl w-full"
          >
            {/* Left Content */}
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white flex items-center gap-1.5">
                <span>CONTACT ME</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium line-clamp-1">
                Have an idea or project? Let&apos;s build something meaningful.
              </span>
            </div>

            {/* Right: Circular Holographic Gradient Interaction */}
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-amber-300 to-sky-400 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse_subtle" />

              {/* The Holographic Disc */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-holographic p-0.5 shadow-inner animate-spin-slow group-hover:animate-hologram transition-all">
                <div className="w-full h-full rounded-full bg-[#111317]/20 backdrop-blur-xs flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-black group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
