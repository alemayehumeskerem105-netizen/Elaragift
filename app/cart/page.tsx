"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  const hasItems = items.length > 0;

  return (
    <PageTransition>
      <section className="mx-auto flex max-w-5xl flex-col gap-6 pb-10 pt-4 sm:pt-6">
        <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-lg font-semibold text-(--elara-text) sm:text-2xl">
              Your cart
            </h1>
            <p className="text-xs text-slate-600 sm:text-sm">
              Review your romantic picks before checkout. All pricing is
              calculated on the client – backend pricing rules can be added later.
            </p>
          </div>
          {hasItems ? (
            <Link href="/checkout">
              <Button>Proceed to checkout</Button>
            </Link>
          ) : null}
        </header>

        {!hasItems ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="elara-card p-5 text-center sm:p-7"
          >
            <p className="text-sm font-medium text-(--elara-text)">
              Your cart is feeling a little lonely.
            </p>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Browse cakes, flowers, dolls, scarves, and chocolates to start a
              surprise story.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Link href="/">
                <Button className="text-xs sm:text-sm">Back to home</Button>
              </Link>
              <Link href="/gallery">
                <Button variant="secondary" className="text-xs sm:text-sm">
                  View all gifts
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  className="elara-card flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-4"
                >
                  <div className="hidden h-16 w-16 shrink-0 rounded-xl bg-rose-50 sm:block" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <p className="font-semibold text-(--elara-text)">
                        {item.name}
                      </p>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-rose-400">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 sm:text-xs">
                      {item.price.toLocaleString()} ETB each
                    </p>
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-rose-100 bg-white px-2 py-1 text-[11px] text-slate-700">
                        <button
                          type="button"
                          className="px-1 text-[13px] text-rose-500"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-1 text-[13px] text-rose-500"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] font-medium text-rose-500 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-(--elara-deep-red) sm:text-sm">
                    {(item.price * item.quantity).toLocaleString()} ETB
                  </p>
                </li>
              ))}
            </motion.ul>

            <motion.aside
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="elara-card space-y-3 p-4 sm:p-5"
            >
              <h2 className="text-sm font-semibold text-(--elara-text) sm:text-base">
                Order summary
              </h2>
              <div className="space-y-1 text-xs text-slate-600 sm:text-sm">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated delivery</span>
                  <span className="text-emerald-600">Free (demo)</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-rose-100 pt-3 text-sm font-semibold text-(--elara-text)">
                <span>Total</span>
                <span className="text-(--elara-deep-red)">
                  {total.toLocaleString()} ETB
                </span>
              </div>
              <Link href="/checkout">
                <Button fullWidth className="mt-2">
                  Continue to checkout
                </Button>
              </Link>
              <p className="mt-1 text-[11px] text-slate-500">
                Delivery is available only in central Bahir Dar city for safety
                reasons.
              </p>
            </motion.aside>
          </div>
        )}
      </section>
    </PageTransition>
  );
}

