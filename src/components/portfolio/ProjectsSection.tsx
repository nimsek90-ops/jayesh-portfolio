"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  X,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { ProjectData } from "@/lib/data-defaults";
import { GitHubIcon } from "../icons/SocialIcons";

interface ProjectsSectionProps {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    filterCategory === "All"
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[300px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-sky-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-rose-500" />
          <span>VERIFIED SYSTEMS &amp; LIVE CASE STUDIES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Engineered for Real Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Explore production platforms, autonomous pipelines, and deployed full-stack architectures.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 relative z-10">
        {categories.map((cat) => {
          const isActive = cat === filterCategory;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                  : "bg-white/80 text-slate-600 border-slate-200/80 hover:text-slate-900 hover:bg-white shadow-xs"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 text-slate-500 font-mono">
          No projects found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all flex flex-col justify-between"
            >
              {/* Card Banner in Signature Photo Page Gradient */}
              <div className="relative w-full h-52 sm:h-60 bg-gradient-to-tr from-[#ffe7dc] via-[#fee5eb] to-[#e4e9fc] border-b border-slate-200/60 p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-xs">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-200 shadow-xs"
                        title="View GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-200 shadow-xs"
                        title="View Live Application"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Decorative Project Title & Badge */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display group-hover:text-rose-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.slug === "scalerise-mediatech" && (
                    <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shadow-md shrink-0 overflow-hidden">
                      <Image
                        src="/images/scalerise_icon.webp"
                        alt="ScaleRise MediaTech"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>

                {/* Ambient back lighting */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-rose-200/60 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Case Study Full Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-slate-200 text-slate-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-rose-600 uppercase">
                    {selectedProject.category} {" • ARCHITECTURE DOSSIER"}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-display mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                {selectedProject.slug === "scalerise-mediatech" && (
                  <div className="relative w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1 shadow-md shrink-0 overflow-hidden">
                    <Image
                      src="/images/scalerise_icon.webp"
                      alt="ScaleRise MediaTech"
                      width={52}
                      height={52}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Problem & Solution Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase font-mono mb-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Bottleneck</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase font-mono mb-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>Engineered Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Full Case Study Text */}
              <div className="mb-8">
                <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Technical Architecture &amp; Execution
                </h4>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                  {selectedProject.caseStudy}
                </div>
              </div>

              {/* Tech Stack List */}
              <div className="mb-8">
                <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Integrated Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono bg-white border border-slate-200 text-slate-800 px-3 py-1.5 rounded-xl shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Live System</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
