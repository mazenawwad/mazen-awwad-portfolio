import {
  Braces,
  Cloud,
  Code2,
  FileCheck2,
  Globe2,
  ServerCog,
  TestTube2,
} from "lucide-react";
import { TechnologyIcon } from "./technology-icon";

const groupIcons = {
  Languages: Braces,
  Frontend: Code2,
  "UI and Styling": Globe2,
  Testing: TestTube2,
  "Backend and Data": ServerCog,
  "Cloud and Tools": Cloud,
  Other: FileCheck2,
} as const;

type SkillIconProps = {
  group: string;
  skill: string;
};

export function SkillIcon({ group, skill }: SkillIconProps) {
  return (
    <TechnologyIcon
      className="skill-icon"
      fallback={groupIcons[group as keyof typeof groupIcons] ?? Code2}
      technology={skill}
    />
  );
}
