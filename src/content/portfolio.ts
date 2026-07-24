export type LinkItem = {
  kind: "email" | "phone" | "linkedin" | "github";
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type ExperienceItem = {
  company: string;
  product?: string;
  role: string;
  period: string;
  context?: string;
  highlights: string[];
  focusAreas?: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  location: string;
  period: string;
  detail: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  stack: string[];
};

export type PortfolioContent = {
  profile: Profile;
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  links: LinkItem[];
};

export const portfolioContent = {
  profile: {
    name: "Mazen Awwad",
    role: "Frontend Developer | React | Next.js | TypeScript",
    location: "Beirut, Lebanon",
    email: "mazenawwad2003@gmail.com",
    phone: "+961 70 357 253",
    summary:
      "Frontend Developer specializing in React, Next.js, and TypeScript, with 2+ years of experience building production SaaS and full-stack web applications. Experienced in component-driven UI, Redux Toolkit state management, REST API integration, authentication, internationalization, Cypress end-to-end testing, and responsive accessible interfaces. Core contributor to a multi-tenant construction-management platform used for invoicing, payroll submissions, journals, employee workflows, materials tracking, and field-report review.",
  },
  skillGroups: [
    {
      title: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    },
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "App Router",
        "React Server Components",
        "Angular",
        "Redux Toolkit",
        "React Hook Form",
      ],
    },
    {
      title: "UI and Styling",
      skills: [
        "Tailwind CSS",
        "ShadCN/UI",
        "Radix UI",
        "Framer Motion",
        "Angular Material",
        "PrimeNG",
        "responsive UI",
        "accessible UI",
      ],
    },
    {
      title: "Testing",
      skills: [
        "Cypress",
        "end-to-end test automation",
        "manual QA",
        "cross-browser testing",
      ],
    },
    {
      title: "Backend and Data",
      skills: ["Node.js server actions", "REST APIs", "JWT authentication", "NextAuth"],
    },
    {
      title: "Cloud and Tools",
      skills: [
        "AWS S3",
        "presigned uploads",
        "Git",
        "GitHub",
        "Vercel branch deployments",
        "CI/CD workflows",
      ],
    },
    {
      title: "Other",
      skills: [
        "next-intl",
        "internationalization/localization",
        "Leaflet",
        "interactive maps",
        "@dnd-kit",
        "pdf-lib",
        "PDF generation",
      ],
    },
  ],
  experience: [
    {
      company: "Hanz",
      product: "AdminApp",
      role: "Frontend Developer",
      period: "September 2024 - Present",
      context:
        "Multilingual admin dashboard for a construction and field-work management SaaS platform used by office staff to review, edit, invoice, and journal tasks submitted from a companion worker mobile app.",
      highlights: [
        "Built core invoice, regie/payroll, and journal-generation workflows end to end using Next.js, React, TypeScript, server actions, and form validation, including safeguards that prevent already-billed tasks from being re-invoiced.",
        "Developed production modules for materials tracking, employee management, task assignment, task history, CSV/data exports, and voice-report review.",
        "Architected modular Redux Toolkit state management across projects, employees, tasks, employeeTasks, and blueprint features, using server-rendered hydration patterns instead of a monolithic global store.",
        "Implemented internationalization with next-intl across 66 locales and maintained English source strings for automated translation propagation.",
        "Authored a Cypress end-to-end test suite covering critical flows including login, project creation, invoicing, regie, journals, employee assignment, and voice reports.",
        "Integrated AWS S3 presigned uploads for task photos/documents, Leaflet-based blueprint mapping, and JWT/NextAuth authentication with automatic session expiry handling.",
      ],
      focusAreas: [
        "Operational workflows",
        "Production modules",
        "State architecture",
        "Localization",
        "End-to-end testing",
        "Uploads, mapping, and authentication",
      ],
    },
    {
      company: "Integrated Digital Systems (IDS)",
      role: "Full-Stack Developer",
      period: "August 2023 - October 2023",
      highlights: [
        "Developed a course-registration web application for IDS Academy using HTML, CSS, JavaScript, PHP, and MySQL.",
        "Designed the database schema and implemented registration workflows, form validation, and persistent data storage.",
      ],
    },
  ],
  education: [
    {
      school: "Lebanese American University",
      degree: "Bachelor of Science in Computer Science",
      location: "Beirut, Lebanon",
      period: "September 2021 - May 2024",
      detail: "CGPA: 3.53 / 4.00",
    },
  ],
  projects: [
    {
      name: "Clothes Store E-Commerce Site",
      description:
        "Built a full-stack storefront with an AI chatbot using HTML, CSS, PHP, JavaScript, and SQL.",
      stack: ["HTML", "CSS", "PHP", "JavaScript", "SQL"],
    },
    {
      name: "Insurance Company Database",
      description:
        "Modeled and implemented a relational Oracle SQL database, including entity-relationship design and schema implementation.",
      stack: ["Oracle SQL", "Entity-relationship design", "Schema implementation"],
    },
  ],
  links: [
    {
      kind: "email",
      label: "Email",
      href: "mailto:mazenawwad2003@gmail.com",
    },
    {
      kind: "phone",
      label: "+961 70 357 253",
      href: "tel:+96170357253",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mazenawwad",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/mazenawwad",
    },
  ],
} satisfies PortfolioContent;
