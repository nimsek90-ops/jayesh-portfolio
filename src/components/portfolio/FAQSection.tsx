"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq-data";

export { FAQ_ITEMS };

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-28 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm"
        >
          <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>ANSWER ENGINE &amp; KNOWLEDGE BASE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
        >
          Factual, verified answers regarding my professional background, technical competencies, live systems, and collaboration channels.
        </motion.p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="rounded-2xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-rose-300 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-rose-600">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.question}
                  </h3>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
