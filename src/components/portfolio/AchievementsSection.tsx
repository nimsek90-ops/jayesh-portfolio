"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Medal,
  ShieldCheck,
  Maximize2,
  X,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Camera,
} from "lucide-react";
import { AchievementData } from "@/lib/data-defaults";

interface AchievementsSectionProps {
  achievements: AchievementData[];
}

export default function AchievementsSection({ achievements = [] }: AchievementsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    issuer: string;
    year: string;
    caption: string;
  } | null>(null);

  return (
    <section id="achievements" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <Medal className="w-3.5 h-3.5 text-rose-500" />
          <span>RECOGNIZED STANDARDS &amp; DISCIPLINE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Verified Honors &amp; Milestones
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Disciplined accomplishments validating physical conditioning, competitive aptitude, and mental endurance.
        </motion.p>
      </div>

      {/* Empty State */}
      {achievements.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/60 border border-slate-200 text-center max-w-md mx-auto relative z-10">
          <Award className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No Honors Currently Listed</h3>
          <p className="text-xs text-slate-500 mt-1">Honors and distinctions will appear here once published.</p>
        </div>
      ) : (
        /* Dynamic Grid of Interactive Achievement Cards */
        <div
          className={`grid gap-8 relative z-10 ${
            achievements.length === 1
              ? "max-w-md mx-auto grid-cols-1"
              : achievements.length === 2
              ? "max-w-5xl mx-auto grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {achievements.map((item, idx) => {
            const isKarate =
              item.title.toLowerCase().includes("black belt") ||
              item.id === "ach-1";
            const photoSrc = item.image || (isKarate ? "/images/jayesh_black_belt.webp" : null);

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-[2rem] sm:rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white/95 hover:border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top gold accent glow */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

                <div>
                  {/* Top Bar with Icon & Verification Pill */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs group-hover:scale-105 transition-transform">
                      {isKarate ? (
                        <Award className="w-6 h-6 text-amber-600" />
                      ) : (
                        <Medal className="w-6 h-6 text-orange-600" />
                      )}
                    </div>

                    {item.verified && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Credential</span>
                      </span>
                    )}
                  </div>

                  {/* Category & Title */}
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-rose-600 mt-0.5 mb-4">
                    {item.issuer} • {item.year}
                  </p>

                  {/* Integrated Photo Proof Showcase for Black Belt */}
                  {photoSrc && (
                    <div
                      onClick={() =>
                        setSelectedImage({
                          src: "/images/jayesh_black_belt.jpg",
                          title: item.title,
                          issuer: item.issuer || "Japan Karate Shotokai - India",
                          year: item.year || "Shodan • Certified",
                          caption:
                            "Official Black Belt (Shodan) certificate conferral ceremony with Sensei instructors under Japan Karate Shotokai - India & Okinawa Martial Arts Academy, presented to Jayesh Nimse.",
                        })
                      }
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-300 shadow-md group/photo cursor-pointer bg-neutral-900 mb-5 transition-all duration-300 hover:shadow-xl hover:border-amber-500"
                    >
                      <Image
                        src={photoSrc}
                        alt="Jayesh Nimse Karate Black Belt Certificate Conferral Ceremony"
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover/photo:scale-105"
                        priority
                      />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white shadow-xs">
                        <Camera className="w-3 h-3 text-amber-300" />
                        <span className="text-[10px] font-bold tracking-wider uppercase font-mono">
                          Ceremony Proof
                        </span>
                      </div>

                      {/* Bottom Overlay Action Pill */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-medium shadow-md transition-all group-hover/photo:scale-105">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-[11px] font-semibold">Inspect Certificate</span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Symmetrical Visual Showcase for National Silver Medalist if no photo */}
                  {!photoSrc && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 p-5 mb-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500 font-bold uppercase">
                          COMPETITIVE HONORS
                        </span>
                        <Medal className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="my-auto text-center py-4">
                        <div className="text-3xl font-black text-slate-900 font-display">
                          🥈 Silver Medal
                        </div>
                        <div className="text-xs text-slate-600 font-semibold mt-1">
                          National Martial Arts Championship
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 text-center">
                        Verified National Competition Record
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>DISCIPLINE &amp; GRIT</span>
                  <span className="text-emerald-600 font-bold">100% Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal for Certificate / Photo Inspection */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-900">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-slate-900">{selectedImage.title}</h4>
                  <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {selectedImage.year}
                  </span>
                </div>
                <p className="text-xs text-rose-600 font-mono font-semibold mt-0.5">
                  {selectedImage.issuer}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
