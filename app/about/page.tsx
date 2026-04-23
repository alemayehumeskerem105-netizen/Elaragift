"use client";

import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="mx-auto flex max-w-5xl flex-col gap-8 pb-12 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="elara-glass relative overflow-hidden p-6 sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,#ffe0ef,transparent_55%),radial-gradient(circle_at_100%_100%,#ffe0ef,transparent_55%)] opacity-70" />
          <div className="relative space-y-4 sm:space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-400">
              Our story
            </p>
            <h1 className="text-balance text-xl font-semibold text-(--elara-text) sm:text-3xl">
              ELARA GIFTS was born from quiet moments, handwritten notes, and the
              desire to{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                make distance feel smaller.
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              We started in Bahir Dar with one idea: romantic surprises should feel
              intentional, warm, and deeply personal. ELARA curates cakes, flowers,
              dolls, scarves, and chocolates into small stories — each order is a
              scene from someone&apos;s life, not just a transaction.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              While this website currently runs purely on the frontend, every
              interaction, animation, and card is designed to plug into a future
              backend that will handle orders, payments, and delivery logistics
              without losing the soft, romantic feel.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {["Surprise arrivals", "Quiet celebrations", "Everyday romance"].map(
            (title, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="elara-card relative overflow-hidden p-4 sm:p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,#ffe0ef,transparent_65%)] opacity-50" />
                <div className="relative space-y-2">
                  <h2 className="text-sm font-semibold text-(--elara-text)">
                    {title}
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-600">
                    We&apos;ve seen friends surprise friends, partners heal old
                    arguments, and families celebrate milestones with a single box
                    arriving at the right moment.
                  </p>
                </div>
              </motion.div>
            ),
          )}
        </motion.div>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-(--elara-text) sm:text-base">
            Customer surprise snapshots (placeholder)
          </h2>
          <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
            This section will eventually showcase real surprise photos once a
            backend and media storage are connected. For now, it demonstrates the
            layout and motion for a romantic gallery.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="elara-card relative h-32 overflow-hidden bg-rose-50 sm:h-36"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.05 * index }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,#ffe0ef,transparent_60%),radial-gradient(circle_at_100%_100%,#ffe0ef,transparent_60%)] opacity-80" />
                <div className="relative flex h-full flex-col justify-between p-3 text-xs text-slate-700">
                  <p className="font-semibold text-(--elara-deep-red)">
                    Soon: real stories
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Placeholder for couple photos, birthday tables, and quiet,
                    happy smiles.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </section>
    </PageTransition>
  );
}

