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
  technologies?: string[];
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
    role: "Software Engineer | React | Next.js | HTML | CSS | Typescript | JavaScript",
    location: "Beirut, Lebanon",
    email: "mazenawwad2003@gmail.com",
    phone: "+961 70 357 253",
    summary:
      "Software specializing in React, Next.js, and TypeScript, with 2+ years of experience building production SaaS and full-stack web applications. Experienced in component-driven UI, Redux Toolkit state management, REST API integration, authentication, internationalization, Cypress end-to-end testing, and responsive accessible interfaces. Core contributor to a multi-tenant construction-management platform used for invoicing, payroll submissions, journals, employee workflows, materials tracking, and field-report review.",
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
      title: "Backend & Database",
      skills: [
        "Prisma ORM",
        "Prisma Client",
        "Prisma Schema",
        "Prisma Migrate",
        "Prisma Studio",
        "Data Modeling",
        "Relations & Joins",
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
        "Vitest",
        "Playwright",
        "Cypress",
        "end-to-end test automation",
        "manual QA",
        "cross-browser testing",
      ],
    },
    {
      title: "Backend and Data",
      skills: [
        "Node.js server actions",
        "REST APIs",
        "JWT authentication",
        "NextAuth",
      ],
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
      role: "Software Engineer",
      period: "September 2024 - Present",
      context:
        "Admin dashboard for office teams managing construction and field-work tasks submitted through a companion worker app.",
      highlights: [
        "Built invoicing, regie/payroll, and journal workflows with safeguards against re-billing completed tasks.",
        "Built materials, employee, task, export, and voice-report modules.",
        "Structured Redux Toolkit state by domain and hydrated it from server-rendered data.",
        "Implemented next-intl across 66 locales and maintained source strings for automated translation.",
        "Created Cypress coverage for login, projects, invoicing, regie, journals, assignments, and voice reports.",
        "Integrated S3 uploads, Leaflet blueprint mapping, and session-expiry handling with JWT and NextAuth.",
      ],
      focusAreas: [
        "Operational workflows",
        "Production modules",
        "State architecture",
        "Localization",
        "End-to-end testing",
        "Uploads, mapping, and authentication",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Cypress",
        "AWS S3",
        "Leaflet",
        "NextAuth",
      ],
    },
    {
      company: "Integrated Digital Systems (IDS)",
      role: "Full-Stack Developer",
      period: "August 2023 - October 2023",
      highlights: [
        "Built a course-registration application for IDS Academy.",
        "Designed its database schema, registration flow, validation, and persistent storage.",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
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
      description: "Built a full-stack storefront with an AI chatbot.",
      stack: ["HTML", "CSS", "PHP", "JavaScript", "SQL"],
    },
    {
      name: "Insurance Company Database",
      description:
        "Modeled and implemented an insurance database from entity relationships through schema.",
      stack: [
        "Oracle SQL",
        "Entity-relationship design",
        "Schema implementation",
      ],
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
