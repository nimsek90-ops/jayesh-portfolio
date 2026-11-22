"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "../icons/SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#111317] text-white pt-16 pb-12 px-6 sm:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <Link href="#hero" className="inline-block group">
              <span className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-rose-400 transition-colors">
                JAYESH NIMSE
              </span>
              <span className="block text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mt-0.5">
                AI + TECHNOLOGY + BUSINESS
              </span>
            </Link>
            <p className="text-xs text-neutral-400 mt-2 max-w-md font-normal leading-relaxed">
              Building intelligent solutions. Creating meaningful impact. Founder of ScaleRise MediaTech.
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/jayesh-nimse-5578b526b"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-all text-xs"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/nimsek90-ops"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-all text-xs"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/jayesh_v_nimse"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-all text-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-neutral-400">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Portfolio</h5>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white transition-colors">About Me</Link></li>
              <li><Link href="#journey" className="hover:text-white transition-colors">My Journey</Link></li>
              <li><Link href="#skills" className="hover:text-white transition-colors">Skills & Tech</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Featured Projects</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Proof & Honor</h5>
            <ul className="space-y-2">
              <li><Link href="#experience" className="hover:text-white transition-colors">Experience</Link></li>
              <li><Link href="#leadership" className="hover:text-white transition-colors">ByteARQ Leadership</Link></li>
              <li><Link href="#achievements" className="hover:text-white transition-colors">Verified Honors</Link></li>
              <li><Link href="#comments" className="hover:text-white transition-colors">Visitor Comments</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">Knowledge Base (FAQ)</Link></li>
              <li><Link href="#resume" className="hover:text-white transition-colors">Resume Download</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Services</h5>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-white transition-colors">AI & Autonomous Agents</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Web Systems Engineering</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Business & Media Strategy</Link></li>
              <li><Link href="#blog" className="hover:text-white transition-colors">Insights / Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3">Connect & Impact</h5>
            <ul className="space-y-2">
              <li><Link href="#contact" className="hover:text-white transition-colors">Direct Inquiries</Link></li>
              <li><a href="mailto:jayeshnimse3@gmail.com" className="hover:text-white transition-colors">jayeshnimse3@gmail.com</a></li>
              <li><span className="text-neutral-500 font-mono text-[11px]">System Status • Online</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Jayesh Nimse. Designed and engineered with precision.</p>
          <p className="flex items-center gap-1">
            <span>Building intelligent solutions. Creating meaningful impact.</span>
            <Sparkles className="w-3 h-3 text-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
