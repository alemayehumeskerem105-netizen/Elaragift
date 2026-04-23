"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    clear();
  };

  const disabled = !items.length && !submitted;

  return (
    <PageTransition>
      <section className="mx-auto flex max-w-5xl flex-col gap-6 pb-12 pt-4 sm:pt-6">
        <header className="space-y-2">
          <h1 className="text-lg font-semibold text-(--elara-text) sm:text-2xl">
            Checkout
          </h1>
          <p className="text-xs text-slate-600 sm:text-sm">
            This is a fully client-side simulation. No payment is processed and
            no data leaves your browser yet.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="elara-card space-y-4 p-5 sm:p-6"
          >
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Phone number for delivery
              </label>
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-(--elara-text) outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
                placeholder="+251..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Short message to recipient (optional)
              </label>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-(--elara-text) outline-none ring-0 transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
                placeholder="Example: “Happy birthday, thank you for being my favorite person.”"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Payment screenshot (placeholder)
              </label>
              <p className="text-[11px] text-slate-500">
                In the real app, you&apos;ll upload a screenshot after bank or
                mobile payment. For now, this is just a visual placeholder and
                nothing is uploaded.
              </p>
              <div className="mt-2 rounded-2xl border border-dashed border-rose-200 bg-rose-50/40 px-4 py-6 text-center">
                <input
                  type="file"
                  className="mx-auto block max-w-xs text-[11px] file:mr-3 file:rounded-full file:border-0 file:bg-rose-500 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white file:hover:bg-rose-600"
                />
                <p className="mt-2 text-[11px] text-slate-500">
                  Files stay in your browser only in this demo.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="rounded-2xl bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
                Delivery is available only in{" "}
                <span className="font-semibold">central Bahir Dar city</span> for
                safety reasons.
              </p>
              <Button
                type="submit"
                fullWidth
                disabled={submitted || !phone}
                className={submitted ? "opacity-80" : ""}
              >
                {submitted ? "Order submitted (simulated)" : "Submit order (no payment yet)"}
              </Button>
              <p className="text-[11px] text-slate-500">
                No real payment or order is created in this version. A future
                backend can listen to this event and create an order record.
              </p>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700"
              >
                Your demo order has been “received”. Once the backend is wired,
                this step will create an actual order and send confirmations.
              </motion.div>
            ) : null}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="elara-card space-y-3 p-5 sm:p-6"
          >
            <h2 className="text-sm font-semibold text-(--elara-text) sm:text-base">
              Cart summary
            </h2>
            {!items.length && !submitted ? (
              <p className="text-xs text-slate-600 sm:text-sm">
                Your cart is empty. Go back and add a few pieces first.
              </p>
            ) : null}
            {items.length ? (
              <>
                <ul className="space-y-2 text-xs text-slate-700 sm:text-sm">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {item.quantity} × {item.price.toLocaleString()} ETB
                        </span>
                      </div>
                      <span className="text-(--elara-deep-red)">
                        {(item.price * item.quantity).toLocaleString()} ETB
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-rose-100 pt-3 text-sm font-semibold text-(--elara-text)">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-(--elara-deep-red)">
                      {total.toLocaleString()} ETB
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </motion.aside>
        </div>
      </section>
    </PageTransition>
  );
}

