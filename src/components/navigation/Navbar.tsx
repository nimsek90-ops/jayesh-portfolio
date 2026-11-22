"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
  tag?: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "About Me", href: "#about" },
  { name: "My Journey", href: "#journey" },
  { name: "Skills & Tech", href: "#skills" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Case Studies", href: "#casestudies" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Leadership", href: "#leadership", tag: "ByteARQ" },
  { name: "Achievements", href: "#achievements", tag: "Awarded" },
  { name: "Certifications", href: "#certifications" },
  { name: "Services", href: "#services" },
  { name: "Family & Roots", href: "#heritage" },
  { name: "FAQ", href: "#faq" },
  { name: "Insights / Blog", href: "#blog" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
  { name: "Comments", href: "#comments", tag: "Moderated" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full z-40 transition-all duration-300 ${
          scrolled
            ? "sticky top-4 px-4 sm:px-8 max-w-7xl mx-auto"
            : "relative px-6 sm:px-12 pt-6 sm:pt-8"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "glass-panel px-6 py-3.5 rounded-full shadow-lg border border-white/60"
              : ""
          }`}
        >
          {/* Brand Logo - Exact reference placement: Top-Left */}
          <Link href="#hero" className="group flex flex-col">
            <span className="font-bold tracking-tight text-xl sm:text-2xl text-[#111418] uppercase transition-colors group-hover:text-rose-600">
              JAYESH NIMSE
            </span>
            <span className="text-[10px] tracking-widest font-semibold text-neutral-500 uppercase -mt-0.5">
              AI + TECHNOLOGY + BUSINESS
            </span>
          </Link>

          {/* Quick Right Action & Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-white/70 hover:bg-white rounded-full border border-black/10 hover:shadow-sm transition-all"
            >
              <span>Let&apos;s Talk</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>

            {/* Hamburger Button - Exact reference style */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 bg-black text-white hover:scale-105 active:scale-95 transition-all shadow-md group"
            >
              <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all" />
              <span className="w-5 h-[2px] bg-white rounded-full" />
              <span className="w-3.5 h-[2px] bg-white rounded-full self-end mr-3 group-hover:w-5 transition-all" />
            </button>
          </div>
        </div>
      </header>

      {/* Animated Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0f1115]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto pb-6 border-b border-white/10">
              <div>
                <span className="font-bold text-xl sm:text-2xl tracking-tight uppercase text-white">
                  JAYESH NIMSE
                </span>
                <p className="text-xs text-neutral-400 tracking-wider">
                  BUILDING INTELLIGENT SOLUTIONS. CREATING MEANINGFUL IMPACT.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Links Grid */}
            <div className="max-w-7xl w-full mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {navLinks.slice(0, 5).map((link, idx) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 text-2xl font-semibold text-white/90 hover:text-rose-300 transition-colors"
                      >
                        <span className="text-xs font-mono text-neutral-500">
                          0{idx + 1}
                        </span>
                        <span>{link.name}</span>
                        {link.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {link.tag}
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-rose-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">
                  Experience & Capabilities
                </h4>
                <ul className="space-y-3">
                  {navLinks.slice(5, 10).map((link, idx) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 text-2xl font-semibold text-white/90 hover:text-rose-300 transition-colors"
                      >
                        <span className="text-xs font-mono text-neutral-500">
                          {idx + 6 < 10 ? `0${idx + 6}` : idx + 6}
                        </span>
                        <span>{link.name}</span>
                        {link.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {link.tag}
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-rose-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">
                  Connect & Insights
                </h4>
                <ul className="space-y-3">
                  {navLinks.slice(10).map((link, idx) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 text-2xl font-semibold text-white/90 hover:text-rose-300 transition-colors"
                      >
                        <span className="text-xs font-mono text-neutral-500">
                          {idx + 11}
                        </span>
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-rose-300" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="mailto:jayeshnimse3@gmail.com"
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>jayeshnimse3@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Info Bar inside Overlay */}
            <div className="max-w-7xl w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <p>© {new Date().getFullYear()} Jayesh Nimse. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/jayesh-nimse-5578b526b"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/nimsek90-ops"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/jayesh_v_nimse"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
