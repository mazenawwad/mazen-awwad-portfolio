import type { LinkItem } from "@/content/portfolio";
import { ArrowUpRight, Mail } from "lucide-react";

type ContactLinksProps = {
  links: LinkItem[];
};

export function ContactLinks({ links }: ContactLinksProps) {
  return (
    <div className="contact-links" aria-label="Contact links">
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          <Mail aria-hidden="true" size={17} />
          <span>{link.label}</span>
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      ))}
    </div>
  );
}
