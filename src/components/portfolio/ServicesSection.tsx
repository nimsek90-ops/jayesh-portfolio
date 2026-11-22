"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Code, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const serviceIcons: Record<string, React.ElementType> = {
  BrainCircuit,
  Code,
  TrendingUp,
};

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon?: string;
  deliverables?: string[];
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto">
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
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>STRATEGIC CAPABILITIES &amp; OFFERINGS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          How We Can Collaborate
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Partnering with technology teams, startups, and enterprises to build intelligent systems, resilient software, and scalable growth engines.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {services.map((service, idx) => {
          const Icon = service.icon && serviceIcons[service.icon] ? serviceIcons[service.icon] : Sparkles;

          return (
            <motion.div
              key={service.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-6 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {service.shortDesc}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase font-mono tracking-wider transition-colors pt-4 border-t border-slate-100"
              >
                <span>Initiate Discussion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
