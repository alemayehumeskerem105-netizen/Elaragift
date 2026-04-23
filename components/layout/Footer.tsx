import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rose-100/70 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} ELARA GIFTS. Crafted with love in Bahir
          Dar.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] uppercase tracking-wide text-rose-400">
            Delivery notice
          </span>
          <p className="rounded-full bg-rose-50 px-3 py-1 text-[11px] text-rose-600">
            Delivery is available only in{" "}
            <span className="font-semibold">central Bahir Dar city</span> for
            safety reasons.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="text-[11px] font-medium text-rose-500 hover:text-rose-600"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="text-[11px] font-medium text-rose-500 hover:text-rose-600"
          >
            Our story
          </Link>
        </div>
      </div>
    </footer>
  );
}

