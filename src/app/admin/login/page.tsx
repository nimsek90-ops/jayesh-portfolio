"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("jayeshnimse3@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-lg mb-4">
            <div className="w-full h-full bg-[#12141a] rounded-[14px] flex items-center justify-center text-rose-400">
              <Shield className="w-7 h-7" />
            </div>
          </div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            SECURE ACCESS GATEWAY
          </span>
          <h1 className="text-2xl font-bold font-display text-white mt-1">
            Jayesh Nimse Admin
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Production Management & Database Operations
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                placeholder="jayeshnimse3@gmail.com"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                placeholder="••••••••••••"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Session • MySQL / Prisma ORM</span>
          </div>
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
