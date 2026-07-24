import { CareerTimeline } from "@/components/portfolio/career-timeline";
import { ContactSection } from "@/components/portfolio/contact-section";
import { CurrentWorkSection } from "@/components/portfolio/current-work-section";
import { Hero } from "@/components/portfolio/hero";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { portfolioContent } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="main-content">
      <Hero profile={portfolioContent.profile} links={portfolioContent.links} />
      <CurrentWorkSection experience={portfolioContent.experience[0]} />
      <CareerTimeline
        experience={portfolioContent.experience}
        education={portfolioContent.education}
        projects={portfolioContent.projects}
      />
      <SkillsSection skillGroups={portfolioContent.skillGroups} />
      <ContactSection
        profile={portfolioContent.profile}
        links={portfolioContent.links}
      />
    </main>
  );
}
