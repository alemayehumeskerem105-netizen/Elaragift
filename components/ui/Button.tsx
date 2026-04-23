import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

type Props = ComponentPropsWithoutRef<typeof motion.button> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "elara-gradient text-white shadow-lg shadow-pink-400/40 hover:shadow-pink-500/60",
  secondary:
    "bg-white text-[var(--elara-deep-red)] border border-rose-200 hover:bg-rose-50",
  ghost: "bg-transparent text-[var(--elara-deep-red)] hover:bg-rose-50",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  fullWidth,
  ...rest
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50 ${
        variantClasses[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

