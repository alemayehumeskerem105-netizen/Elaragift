"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <section className="mx-auto flex max-w-5xl flex-col gap-8 pb-12 pt-4 sm:pt-6">
        <header className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-lg font-semibold text-(--elara-text) sm:text-2xl"
          >
            Contact ELARA GIFTS
          </motion.h1>
          <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
            Share an idea, ask about availability, or plan a surprise. This form
            currently stays on the frontend only – when a backend is plugged in,
            it will route to messaging or CRM tools.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="elara-card space-y-4 p-5 sm:p-6"
          >
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Your name
              </label>
              <input
                required
                className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-(--elara-text) outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
                placeholder="How should we call you?"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Phone or Telegram
              </label>
              <input
                required
                className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-(--elara-text) outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
                placeholder="+251..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-(--elara-text) outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
                placeholder="Tell us about the person, the occasion, and the feeling you want to create."
              />
            </div>
            <Button type="submit" fullWidth className="mt-2">
              Send message (simulated)
            </Button>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-emerald-600"
              >
                Thank you. This is a demo-only submission. Once a backend is
                connected, we&apos;ll route these messages to the ELARA team.
              </motion.p>
            ) : null}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="elara-card space-y-5 p-5 sm:p-6"
          >
            <div>
              <h2 className="text-sm font-semibold text-(--elara-text) sm:text-base">
                Social links
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                These are static links for now. Later, they can be wired to live
                accounts and analytics.
              </p>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { label: "Telegram", href: "https://t.me/" },
                { label: "TikTok", href: "https://www.tiktok.com/" },
                { label: "Instagram", href: "https://www.instagram.com/" },
                { label: "Facebook", href: "https://www.facebook.com/" },
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="flex items-center justify-between rounded-xl border border-rose-100 bg-white px-3 py-2 text-slate-700 transition hover:border-rose-200 hover:bg-rose-50"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-[11px] text-rose-500">Open</span>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>
    </PageTransition>
  );
}

