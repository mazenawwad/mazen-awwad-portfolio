"use client";

import { motion, useReducedMotion } from "motion/react";

export function SectionTransition() {
  const shouldReduceMotion = useReducedMotion();
  const lineState = shouldReduceMotion
    ? undefined
    : { opacity: 1, scaleX: 1 };

  return (
    <div className="section-transition" aria-hidden="true">
      <motion.span
        className="section-transition-line section-transition-line-left"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        whileInView={lineState}
        viewport={{ amount: 0.8, once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="section-transition-marker"
        initial={shouldReduceMotion ? false : { opacity: 0, rotate: 0, scale: 0.6 }}
        whileInView={
          shouldReduceMotion ? undefined : { opacity: 1, rotate: 45, scale: 1 }
        }
        viewport={{ amount: 0.8, once: true }}
        transition={{ duration: 0.42, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="section-transition-line section-transition-line-right"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        whileInView={lineState}
        viewport={{ amount: 0.8, once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
