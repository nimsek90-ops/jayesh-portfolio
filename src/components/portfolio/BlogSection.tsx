"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  readingTime?: string;
  publishedAt?: string;
  tags?: string[];
}

interface BlogSectionProps {
  blogs: BlogPostItem[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPostItem | null>(null);

  return (
    <section id="blog" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-rose-500" />
          <span>TECHNICAL &amp; VENTURE PERSPECTIVES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Insights &amp; Systems Architecture
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Perspectives on autonomous agent development, system engineering, and asymmetric venture strategy.
        </motion.p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog.id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  {blog.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {blog.readingTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-3 font-display">
                {blog.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                {blog.summary}
              </p>
            </div>

            <div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {blog.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedBlog(blog)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase font-mono tracking-wider transition-colors pt-4 border-t border-slate-100 w-full justify-between cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-3">
                <span>{selectedBlog.publishedAt}</span>
                <span>•</span>
                <span>{selectedBlog.readingTime}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 font-display mb-4">
                {selectedBlog.title}
              </h3>

              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{selectedBlog.content}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
