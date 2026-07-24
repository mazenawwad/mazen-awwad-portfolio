import { TechnologyIcon } from "./technology-icon";

type TimelineTechnologiesProps = {
  technologies: string[];
};

export function TimelineTechnologies({
  technologies,
}: TimelineTechnologiesProps) {
  return (
    <ul className="timeline-technologies" aria-label="Technologies">
      {technologies.map((technology) => (
        <li
          key={technology}
          aria-label={technology}
          role="img"
          title={technology}
        >
          <TechnologyIcon technology={technology} />
        </li>
      ))}
    </ul>
  );
}
