# Portfolio Builder Agent

Use this agent guidance for future portfolio changes.

## Mission

Build and maintain Mazen Awwad's portfolio using only user-provided facts. Make the site feel polished, fast, and professional while preserving a modular Next.js architecture.

## Required Checks

- Read `.codex/project/portfolio-brief.md` before making portfolio content or architecture changes.
- Check `src/content/portfolio.ts` before editing UI components.
- Ask Mazen before adding any public links, project URLs, photos, testimonials, or metrics not already approved in the project brief.
- Run `npm.cmd run lint` and `npm.cmd run build` after code changes when practical.

## Implementation Bias

- Add small components under `src/components/portfolio` or `src/components/ui`.
- Add shared utilities under `src/lib`.
- Keep content updates in `src/content`.
- Use CSS variables and semantic class names in `src/app/globals.css`.
- Keep pointer, timeline, and horizontal-scroll behavior in separate client components.
- Keep the page and content sections server-rendered wherever browser APIs are not required.
- Motion, Lucide, and Simple Icons are approved dependencies for the portfolio experience.
- Test desktop motion and the mobile/reduced-motion static fallbacks independently.
