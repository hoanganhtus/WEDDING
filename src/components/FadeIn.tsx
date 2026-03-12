import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { TargetAndTransition } from "framer-motion";
import { cn } from "../lib/utils";

export type FadeVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "blur"
  | "flipY";

const variants: Record<FadeVariant, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  flipY: {
    initial: { opacity: 0, rotateX: 40 },
    animate: { opacity: 1, rotateX: 0 },
  },
};

interface FadeInProps {
  children: ReactNode;
  variant?: FadeVariant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
}

export default function FadeIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  className = "",
  amount = 0.1,
}: FadeInProps) {
  const v = variants[variant];
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount, margin: "0px 0px -25% 0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
