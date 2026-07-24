import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "@/content/portfolio";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TimelineTrack, type TimelineEntry } from "./timeline-track";

type CareerTimelineProps = {
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
};

export function CareerTimeline({
  experience,
  education,
  projects,
}: CareerTimelineProps) {
  const entries: TimelineEntry[] = [
    ...experience.map((item) => ({
      period: item.period,
      title: item.role,
      subtitle: `${item.company}${item.product ? ` / ${item.product}` : ""}`,
      description: item.context ?? item.highlights.join(" "),
      kind: "Experience",
    })),
    ...education.map((item) => ({
      period: item.period,
      title: item.degree,
      subtitle: item.school,
      description: `${item.location} · ${item.detail}`,
      kind: "Education",
    })),
    ...projects.map((item) => ({
      period: "Academic project",
      title: item.name,
      subtitle: item.stack.join(" · "),
      description: item.description,
      kind: "Project",
    })),
  ];

  return (
    <section id="timeline" className="timeline-section">
      <ScrollReveal>
        <header className="section-heading">
          <p className="eyebrow">Career timeline</p>
          <h2>A continuous line through the work.</h2>
        </header>
      </ScrollReveal>
      <TimelineTrack entries={entries} />
    </section>
  );
}
