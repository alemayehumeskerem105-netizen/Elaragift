"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="elara-gradient flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-lg shadow-pink-500/30">
            <span className="text-xl font-semibold">E</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-[var(--elara-deep-red)]">
              ELARA GIFTS
            </p>
            <p className="text-xs text-rose-500/80">Romantic gift delivery</p>
          </div>
        </motion.div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 sm:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-1 transition ${
                  active
                    ? "bg-rose-100/80 text-[var(--elara-deep-red)]"
                    : "text-slate-600 hover:bg-rose-50 hover:text-[var(--elara-deep-red)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/cart" className="relative ml-2">
            <span className="elara-gradient flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-pink-400/40">
              <span>Cart</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-[var(--elara-deep-red)]">
                {count}
              </span>
            </span>
          </Link>
        </nav>

        <Link
          href="/cart"
          className="relative flex items-center gap-2 rounded-full border border-rose-100 bg-white px-3 py-1.5 text-xs font-semibold text-[var(--elara-deep-red)] shadow-sm shadow-rose-100 sm:hidden"
        >
          <span>Cart</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-[var(--elara-deep-red)]">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}
