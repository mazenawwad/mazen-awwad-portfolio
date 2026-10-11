import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { DotField } from "@/components/effects/dot-field";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { TechnologyDepthField } from "@/components/effects/technology-depth-field";
import { SiteNavigation } from "@/components/portfolio/site-navigation";
import { portfolioContent } from "@/content/portfolio";
import "@fontsource-variable/ibm-plex-sans";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mazen Awwad | Software Engineer",
  description:
    "Software Engineer specializing in React, Next.js, HTML, CSS, TypeScript, Javascript, production SaaS, internationalization, Cypress testing, and accessible responsive interfaces.",
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
    <html
      lang="en"
      className={`${playfair.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
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
