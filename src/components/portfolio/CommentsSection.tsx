"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
  Clock,
  Sparkles,
} from "lucide-react";

interface PublicComment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export default function CommentsSection() {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    bot_field: "", // Honeypot
  });

  // Fetch approved comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.warn("Could not fetch public comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: data.message || "Your comment has been submitted and is awaiting approval.",
        });
        setFormData({ name: "", email: "", content: "", bot_field: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Submission could not be completed. Please check all fields.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Failed to submit comment. Please check your network connection.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comments" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
          <span>COMMUNITY &amp; VISITOR PERSPECTIVES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Public Dialogue &amp; Feedback
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Have thoughts on my projects, AI architecture, or ideas for collaboration? Leave a verified message below. All comments are moderated prior to public publication.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        {/* Left Column: Approved Public Comments Stream */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Approved Visitor Notes ({comments.length})</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Moderated Public Stream
            </span>
          </div>

          {loadingComments ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-rose-500 mb-2" />
              <span className="text-xs font-mono">Loading community perspectives...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white/70 border border-slate-200/80 text-center space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No Approved Comments Yet</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Be the first to share your feedback or initiate a discussion using the submission form. Once reviewed and approved, your perspective will appear here!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment, idx) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-100 to-indigo-100 border border-slate-200 text-rose-700 flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                        {comment.name.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {comment.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Visitor</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {comment.content}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Comment Submission Form */}
        <div className="lg:col-span-5">
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-white/95 shadow-2xl relative overflow-hidden">
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-rose-600 font-bold block mb-1">
                ADD YOUR VOICE
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                Leave a Comment
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your email is strictly confidential and will never be published publicly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot anti-spam field */}
              <div className="hidden">
                <label htmlFor="bot_field">Do not fill this</label>
                <input
                  type="text"
                  id="bot_field"
                  name="bot_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.bot_field}
                  onChange={handleChange}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-rose-400 transition-colors"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address <span className="text-rose-500">*</span>
                  <span className="text-[10px] text-slate-500 font-normal ml-2">
                    (Private / Verification Only)
                  </span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@organization.com"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Comment Content */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Comment / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your perspective on the portfolio, AI systems, or project inquiries..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-rose-400 transition-colors resize-none"
                />
              </div>

              {/* Feedback Alert */}
              <AnimatePresence>
                {status.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900 mb-0.5">Submission Received</span>
                      <span>{status.message}</span>
                    </div>
                  </motion.div>
                )}

                {status.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting for Review...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Comment</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="text-[10px] font-mono text-slate-400">
                  Protected with spam validation, rate limiting &amp; admin moderation.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
