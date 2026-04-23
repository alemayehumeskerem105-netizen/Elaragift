"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { categories, gifts, Gift } from "@/lib/gift-data";
import { GiftCard } from "@/components/cards/GiftCard";

const filters = ["All", ...categories] as const;

type Filter = (typeof filters)[number];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visible: Gift[] =
    activeFilter === "All"
      ? gifts
      : gifts.filter((gift) => gift.category === activeFilter);

  return (
    <PageTransition>
      <section className="mx-auto flex max-w-6xl flex-col gap-6 pb-10 pt-4 sm:pt-6">
        <header className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-lg font-semibold text-(--elara-text) sm:text-2xl"
          >
            ELARA Gallery
          </motion.h1>
          <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
            Browse the full ELARA collection and mix categories to build your
            own romantic bundle. All images are placeholders – the real magic
            happens when we connect your orders to our backend.
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                  isActive
                    ? "elara-gradient text-white shadow-md shadow-pink-300/50"
                    : "border border-rose-100 bg-white text-slate-600 hover:border-rose-200 hover:text-(--elara-deep-red)"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((gift, index) => (
            <GiftCard
              key={gift.id}
              id={gift.id}
              name={gift.name}
              price={gift.price}
              image={gift.image}
              category={gift.category}
              highlight={index % 4 === 0}
              discount={gift.discount}
              stock={gift.stock}
            />
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}

