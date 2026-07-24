import type { Metadata } from "next";
import { DotField } from "@/components/effects/dot-field";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { TechnologyDepthField } from "@/components/effects/technology-depth-field";
import { SiteNavigation } from "@/components/portfolio/site-navigation";
import { portfolioContent } from "@/content/portfolio";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mazen Awwad | Frontend Developer",
  description:
    "Frontend Developer specializing in React, Next.js, TypeScript, production SaaS, internationalization, Cypress testing, and accessible responsive interfaces.",
  icons: {
    icon: [{ url: "/icon.png?v=sniff-1", type: "image/png" }],
  },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#050706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SmoothScroll />
        <DotField />
        <TechnologyDepthField />
        <SiteNavigation email={portfolioContent.profile.email} />
        {children}
      </body>
    </html>
  );
}
