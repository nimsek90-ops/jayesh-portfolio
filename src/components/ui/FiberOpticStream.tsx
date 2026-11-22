"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FiberOpticStream() {
  return (
    <div className="relative w-full h-32 sm:h-44 overflow-hidden pointer-events-none flex items-center justify-center">
      <svg
        className="w-full max-w-5xl h-full opacity-70"
        viewBox="0 0 1000 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
            <stop offset="30%" stopColor="#f43f5e" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="streamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#ec4899" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow Paths */}
        <motion.path
          d="M 100 20 C 350 140, 650 140, 900 20"
          stroke="url(#streamGrad1)"
          strokeWidth="3"
          filter="url(#glowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        <motion.path
          d="M 150 40 C 380 160, 620 160, 850 40"
          stroke="url(#streamGrad2)"
          strokeWidth="2.5"
          filter="url(#glowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
        />

        <motion.path
          d="M 200 60 C 400 170, 600 170, 800 60"
          stroke="url(#streamGrad1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
        />

        <motion.path
          d="M 280 80 C 430 180, 570 180, 720 80"
          stroke="url(#streamGrad2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.8, delay: 0.6, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
