# Mazen Awwad Portfolio Brief

This project is a personal hosted developer portfolio for Mazen Awwad.

## Source Of Truth

- Primary CV source: `C:\Users\mazen\Desktop\Mazen\Mazen Awwad CV Latex Code.tex`
- PDF reference: `C:\Users\mazen\Desktop\Mazen\Mazen Awwad CV.pdf`
- Do not add claims, projects, links, technologies, metrics, employers, or credentials that are not present in Mazen's provided CV or explicitly supplied later by Mazen.
- If a section needs missing information, leave it out or ask for the missing detail.
- Approved public links: `mazenawwad2003@gmail.com`, `+961 70 357 253`, `linkedin.com/in/mazenawwad`, and `github.com/mazenawwad`.
- Do not render a portrait or substitute image; Mazen explicitly chose a text-led hero.

## Engineering Rules

- Use Next.js App Router patterns with `src/app`.
- Prefer server components. Add client components only for actual interactivity.
- Keep components small and focused. No god classes, god components, or large mixed-responsibility files.
- Keep content in typed data modules and rendering in presentational components.
- Follow DRY and SOLID principles.
- Prefer composition over inheritance.
- Avoid duplicating portfolio strings across components.
- Keep styling deliberate, accessible, responsive, and performance-conscious.

## Design Rules

- Use a near-black canvas, warm-white type, muted gray metadata, deep emerald surfaces, and accessible bright emerald active states.
- Keep the fixed white-dot field decorative. Pointer illumination is enabled only for fine pointers without reduced motion.
- Order the narrative as hero, current Hanz work, career timeline, horizontal desktop skills, and contact.
- Keep native vertical scrolling. Do not hijack wheel, keyboard, or touch input.
- Use transform, opacity, masks, and CSS variables for motion. Keep interaction transitions under 300ms.
- Render horizontal skills as a normal vertical layout below 900px and when reduced motion is requested.
- Hide the complete fixed navigation at 640px and below, and center the mobile content flow.
- Scroll reveals are entry-only and must leave content visible after its first appearance.
- Preserve semantic document order, visible focus states, WCAG AA contrast, and 24px minimum web targets.
- Avoid decorative clutter, nested cards, oversized repeated cards, and unverified imagery.

## Reference Skills

The requested skill repository is cloned at:

`C:\Users\mazen\Desktop\Portfolio\portfolio\.codex\reference\acksession-claude-tools`

Use its `CATALOG.md` to find available skills, especially:

- `emil-design-eng`
- `ui-ux-pro-max`
- `frontend-patterns`
- `nextjs-turbopack`
- `react-patterns`
- `accessibility`
- `coding-standards`
- `code-simplifier`
- `react-testing`
- `e2e-testing`
- `deployment-patterns`

The Emil design engineering skill from that repo is the current local design reference unless Mazen provides a newer source.
