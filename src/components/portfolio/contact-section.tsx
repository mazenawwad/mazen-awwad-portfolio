import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { LinkItem, Profile } from "@/content/portfolio";
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin, Phone } from "lucide-react";
import { siGithub, type SimpleIcon } from "simple-icons";
import type { ComponentType, SVGProps } from "react";

type ContactSectionProps = {
  links: LinkItem[];
  profile: Profile;
};

type ContactIcon = ComponentType<SVGProps<SVGSVGElement>>;

function createBrandIcon(icon: SimpleIcon): ContactIcon {
  return function BrandIcon(props) {
    return (
      <svg viewBox="0 0 24 24" {...props}>
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  };
}

const contactIcons: Record<LinkItem["kind"], ContactIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: BriefcaseBusiness,
  github: createBrandIcon(siGithub),
};

export function ContactSection({ links, profile }: ContactSectionProps) {
  return (
    <footer id="contact" className="contact-section">
      <ScrollReveal>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s talk about software.</h2>
      </ScrollReveal>
      <ScrollReveal className="contact-footer" delay={0.05}>
        <ul className="contact-list">
          {links.map((link) => {
            const Icon = contactIcons[link.kind];
            const isExternal = link.kind === "linkedin" || link.kind === "github";

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  <Icon aria-hidden="true" className="contact-icon" />
                  <span>{link.label}</span>
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </li>
            );
          })}
        </ul>
        <span>
          <MapPin aria-hidden="true" size={16} />
          {profile.location}
        </span>
      </ScrollReveal>
    </footer>
  );
}
