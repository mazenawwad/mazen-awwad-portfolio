import type { LucideIcon } from "lucide-react";
import {
  CloudUpload,
  Code2,
  Database,
  KeyRound,
  Network,
} from "lucide-react";
import {
  siAngular,
  siCss,
  siCypress,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLeaflet,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
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
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  HTML5: siHtml5,
  CSS: siCss,
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
  PHP: siPhp,
  MySQL: siMysql,
};

const fallbackIcons: Record<string, LucideIcon> = {
  "AWS S3": CloudUpload,
  "presigned uploads": CloudUpload,
  SQL: Database,
  "Oracle SQL": Database,
  "Schema implementation": Database,
  "Entity-relationship design": Network,
  "REST APIs": Code2,
  "JWT authentication": KeyRound,
  NextAuth: KeyRound,
  "interactive maps": Network,
};

type TechnologyIconProps = {
  className?: string;
  fallback?: LucideIcon;
  technology: string;
};

export function TechnologyIcon({
  className = "technology-icon",
  fallback = Code2,
  technology,
}: TechnologyIconProps) {
  const brandIcon = brandIcons[technology];

  if (brandIcon) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path d={brandIcon.path} />
      </svg>
    );
  }

  const FallbackIcon = fallbackIcons[technology] ?? fallback;
  return <FallbackIcon aria-hidden="true" className={className} />;
}
