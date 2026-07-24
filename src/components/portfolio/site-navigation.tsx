"use client";

import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const navigationItems = [
  { href: "#work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#skills", label: "Skills" },
] as const;

type NavigationId = (typeof navigationItems)[number]["href"];

type SiteNavigationProps = {
  email: string;
};

export function SiteNavigation({ email }: SiteNavigationProps) {
  const [activeItem, setActiveItem] = useState<NavigationId | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));
    const visibleSections = new Map<string, number>();

    const updateActiveItem = () => {
      const mostVisible = [...visibleSections.entries()].sort(
        ([, firstRatio], [, secondRatio]) => secondRatio - firstRatio,
      )[0];
      setActiveItem((mostVisible?.[0] as NavigationId | undefined) ?? null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(`#${entry.target.id}`, entry.intersectionRatio);
          } else {
            visibleSections.delete(`#${entry.target.id}`);
          }
        });
        updateActiveItem();
      },
      {
        rootMargin: "-18% 0px -48% 0px",
        threshold: [0.01, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="site-mark" href="#top" aria-label="Mazen Awwad, back to top">
        MA
      </a>
      <nav aria-label="Primary navigation">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeItem === item.href ? "is-active" : undefined}
                aria-current={activeItem === item.href ? "location" : undefined}
              >
                {activeItem === item.href ? (
                  <motion.span
                    className="nav-active-indicator"
                    layoutId={shouldReduceMotion ? undefined : "active-navigation"}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  />
                ) : null}
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="nav-contact" href={`mailto:${email}`}>
        <Mail aria-hidden="true" size={16} />
        <span>Email</span>
      </a>
    </header>
  );
}
