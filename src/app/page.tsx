import { CareerTimeline } from "@/components/portfolio/career-timeline";
import { ContactSection } from "@/components/portfolio/contact-section";
import { CurrentWorkSection } from "@/components/portfolio/current-work-section";
import { Hero } from "@/components/portfolio/hero";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { SectionTransition } from "@/components/motion/section-transition";
import { portfolioContent } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="main-content">
      <Hero profile={portfolioContent.profile} />
      <SectionTransition />
      <CurrentWorkSection experience={portfolioContent.experience[0]} />
      <SectionTransition />
      <CareerTimeline
        experience={portfolioContent.experience}
        education={portfolioContent.education}
        projects={portfolioContent.projects}
      />
      <SectionTransition />
      <SkillsSection skillGroups={portfolioContent.skillGroups} />
      <SectionTransition />
      <ContactSection
        profile={portfolioContent.profile}
        links={portfolioContent.links}
      />
    </main>
  );
}
