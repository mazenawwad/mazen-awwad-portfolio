import {
  Braces,
  Cloud,
  Code2,
  Database,
  FileCheck2,
  Globe2,
  KeyRound,
  Map,
  ServerCog,
  TestTube2,
  UploadCloud,
} from "lucide-react";
import {
  siAngular,
  siCypress,
  siCss,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLeaflet,
  siNextdotjs,
  siNodedotjs,
  siPrimeng,
  siRadixui,
  siReact,
  siReacthookform,
  siRedux,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const brandIcons: Record<string, SimpleIcon> = {
  "JavaScript (ES6+)": siJavascript,
  TypeScript: siTypescript,
  HTML5: siHtml5,
  CSS3: siCss,
  React: siReact,
  "Next.js": siNextdotjs,
  Angular: siAngular,
  "Redux Toolkit": siRedux,
  "React Hook Form": siReacthookform,
  "Tailwind CSS": siTailwindcss,
  "ShadCN/UI": siShadcnui,
  "Radix UI": siRadixui,
  "Framer Motion": siFramer,
  PrimeNG: siPrimeng,
  Cypress: siCypress,
  "Node.js server actions": siNodedotjs,
  Git: siGit,
  GitHub: siGithub,
  "Vercel branch deployments": siVercel,
  Leaflet: siLeaflet,
};

const genericIcons = {
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
  const brandIcon = brandIcons[skill];

  if (brandIcon) {
    return (
      <svg
        aria-hidden="true"
        className="skill-icon"
        viewBox="0 0 24 24"
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  const fallbackBySkill = {
    SQL: Database,
    "REST APIs": ServerCog,
    "JWT authentication": KeyRound,
    NextAuth: KeyRound,
    "presigned uploads": UploadCloud,
    "interactive maps": Map,
  } as const;
  const FallbackIcon =
    fallbackBySkill[skill as keyof typeof fallbackBySkill] ??
    genericIcons[group as keyof typeof genericIcons] ??
    Code2;

  return <FallbackIcon aria-hidden="true" className="skill-icon" />;
}
