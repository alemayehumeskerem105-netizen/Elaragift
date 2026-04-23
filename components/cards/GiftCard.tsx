"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GiftCategory, useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: GiftCategory;
  highlight?: boolean;
  discount?: number;
  stock?: number;
};

export function GiftCard({ id, name, price, image, category, highlight, discount, stock }: Props) {
  const { addItem } = useCart();

  return (
    <motion.article
      className="elara-card elara-3d-card group relative h-full overflow-hidden p-px"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
        <div className="elara-3d-inner h-full rounded-[0.95rem] bg-linear-to-br from-rose-50/90 via-white to-pink-50/80 p-3 sm:p-4">
        <div className="relative h-40 w-full overflow-hidden rounded-xl bg-rose-50 sm:h-44">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,#ffe0ef,transparent_60%),radial-gradient(circle_at_100%_100%,#ffe0ef,transparent_55%)] opacity-70" />
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {highlight ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-rose-500 shadow-sm shadow-rose-100">
              Bestseller
            </span>
          ) : null}
          {discount && discount > 0 ? (
            <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
              {discount}% OFF
            </span>
          ) : null}
          {stock !== undefined && stock <= 5 ? (
            <span className="absolute left-3 bottom-3 rounded-full bg-yellow-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
              Only {stock} left
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-1 flex-col gap-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-rose-400">
              {category}
            </p>
            <h3 className="mt-0.5 text-sm font-semibold text-(--elara-text)">
              {name}
            </h3>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {discount && discount > 0 ? (
                <>
                  <p className="text-xs text-slate-500 line-through">
                    {price.toLocaleString()} ETB
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    {Math.round(price * (1 - discount / 100)).toLocaleString()} ETB
                  </p>
                </>
              ) : (
                <p className="text-sm font-semibold text-(--elara-deep-red)">
                  {price.toLocaleString()} ETB
                </p>
              )}
            </div>
            <Button
              onClick={() =>
                addItem({
                  id,
                  name,
                  price: discount && discount > 0 ? Math.round(price * (1 - discount / 100)) : price,
                  image,
                  category,
                })
              }
              className="px-3 py-1 text-xs"
              disabled={stock !== undefined && stock <= 0}
            >
              {stock !== undefined && stock <= 0 ? "Out of Stock" : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

