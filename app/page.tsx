"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { categories, getGiftsByCategory } from "@/lib/gift-data";
import { GiftCard } from "@/components/cards/GiftCard";

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <PageTransition>
      <section className="mx-auto flex max-w-6xl flex-col gap-10 pb-10 pt-4 sm:pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-50/90 via-white to-pink-50/90 p-6 sm:p-10 lg:p-12">
          <FloatingHearts />
          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-balance text-3xl font-semibold tracking-tight text-(--elara-text) sm:text-4xl lg:text-5xl"
              >
                Romantic gifts,{" "}
                <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                  delivered with a story.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                ELARA GIFTS curates cakes, flowers, dolls, scarves, and chocolates
                into unforgettable surprises across central Bahir Dar. Choose your
                combo, share a message, and we&apos;ll handle the magic.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Button>
                  Start gifting
                </Button>
                <Button variant="secondary">
                  View all gifts
                </Button>
                <p className="text-[11px] text-rose-500">
                  Delivery only in{" "}
                  <span className="font-semibold">central Bahir Dar city</span>.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="elara-glass relative aspect-4/3 w-full overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,#ffe0ef,transparent_55%),radial-gradient(circle_at_100%_100%,#ffe0ef,transparent_55%)] opacity-80" />
              <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-400">
                    Today&apos;s curated moments
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-(--elara-text) sm:text-lg">
                    Cakes, roses & soft surprises
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 sm:text-xs">
                  <TagBlock label="Same‑day surprises" value="Central Bahir Dar" />
                  <TagBlock label="Perfect for" value="Birthdays • Anniversaries" />
                  <TagBlock label="Favorite combos" value="Cake + Roses + Teddy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-lg font-semibold text-(--elara-text) sm:text-xl">
                Explore our romantic categories
              </h2>
              <p className="text-xs text-slate-500 sm:text-sm">
                A quick preview of ELARA&apos;s signature collections. Tap a
                category to see more.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {categories.map((category) => {
              const items = getGiftsByCategory(category);
              const isExpanded = expandedCategory === category;
              const visible = isExpanded ? items : items.slice(0, 3);

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-(--elara-text) sm:text-base">
                        {category}
                      </h3>
                      <p className="text-[11px] text-slate-500 sm:text-xs">
                        {items.length} curated pieces
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="px-3 py-1 text-[11px] sm:text-xs"
                      onClick={() =>
                        setExpandedCategory((prev) =>
                          prev === category ? null : category,
                        )
                      }
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((gift, index) => (
                      <GiftCard
                        key={gift.id}
                        id={gift.id}
                        name={gift.name}
                        price={gift.price}
                        image={gift.image}
                        category={gift.category}
                        highlight={index === 0}
                        discount={gift.discount}
                        stock={gift.stock}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </PageTransition>
  );
}

type TagProps = {
  label: string;
  value: string;
};

function TagBlock({ label, value }: TagProps) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white/80 px-3 py-2 shadow-sm shadow-rose-50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-400">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-medium text-(--elara-text)">
        {value}
      </p>
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((_, index) => {
        const left = 5 + (index * 9) % 90;
        const delay = (index * 0.8) % 6;
        const size = 12 + (index % 3) * 4;
        return (
          <span
            key={index}
            className="elara-heart elara-heart-float"
            style={{
              left: `${left}%`,
              bottom: "-20px",
              width: size,
              height: size,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

