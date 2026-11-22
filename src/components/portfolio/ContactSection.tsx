"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Home,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "../icons/SocialIcons";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    serviceInterest: "AI Solutions & Autonomous Workflows",
    company_website_url: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Your message was sent successfully! I will respond promptly.",
      });

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        serviceInterest: "AI Solutions & Autonomous Workflows",
        company_website_url: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
          <Mail className="w-3.5 h-3.5" />
          <span>Initiate Dialogue</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Let&apos;s Build Something Meaningful
        </h2>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          Have an ambitious project, an AI workflow to automate, or a strategic venture to discuss? Send a direct enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Availability */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#12141a] to-[#1c202a] text-white shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl font-bold font-display mt-1 mb-4 text-white">
                Jayesh Nimse
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-8">
                Available for high-impact AI consultations, engineering collaborations, and venture conversations.
              </p>

              <div className="space-y-4 text-xs">
                <a
                  href="mailto:jayeshnimse3@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-neutral-300 hover:text-white"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-mono block">Email</span>
                    <span className="font-semibold text-white">jayeshnimse3@gmail.com</span>
                  </div>
                </a>

                {/* Home Residence */}
                <a
                  href="https://maps.app.goo.gl/LnmBTW9vCKij6p2x6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-neutral-300 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-mono block">Home Residence</span>
                      <span className="font-semibold text-white">Sangamner, Maharashtra</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                </a>

                {/* Native Village */}
                <a
                  href="https://maps.app.goo.gl/Yo4tedpvr9NsA8Vq7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-neutral-300 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-mono block">Native Village Home</span>
                      <span className="font-semibold text-white">Kolwadi / Santwadi, Maharashtra</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Academic Base */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-300">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 font-mono block">Academic Base</span>
                    <span className="font-semibold text-white">KIT Kolhapur, Maharashtra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-medium">Connect on Social</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/jayesh-nimse-5578b526b"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/nimsek90-ops"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/jayesh_v_nimse"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-white/90 backdrop-blur-xl border border-black/5 shadow-xl flex flex-col gap-5"
          >
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="company_website_url"
              value={formData.company_website_url}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Status Messages */}
            {status.type === "success" && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
            {status.type === "error" && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Project collaboration inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Area of Interest
                </label>
                <select
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                >
                  <option value="AI Solutions & Autonomous Workflows">AI Solutions & Autonomous Workflows</option>
                  <option value="Full-Stack Web & Software Engineering">Full-Stack Web & Software Engineering</option>
                  <option value="Business Strategy & MediaTech Scaling">Business Strategy & MediaTech Scaling</option>
                  <option value="Investment / Founder Partnership">Investment / Founder Partnership</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Detailed Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Share your goals, timeline, or scope of collaboration..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Message...</span>
                </>
              ) : (
                <>
                  <span>Send Direct Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
