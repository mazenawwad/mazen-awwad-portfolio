"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function DotField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const hasFinePointer = window.matchMedia(FINE_POINTER_QUERY);
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    if (!field || !hasFinePointer.matches || prefersReducedMotion.matches) {
      return;
    }

    let frameId = 0;

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        field.style.setProperty("--pointer-x", `${event.clientX}px`);
        field.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <div ref={fieldRef} className="dot-field" aria-hidden="true" />;
}
