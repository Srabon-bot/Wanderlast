<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Wanderlast project guidance

- This repository is becoming a MERN CRUD travel site. Build the frontend first with Next.js, TypeScript, shadcn/Base UI, and Tailwind CSS v4; Better Auth and backend CRUD integration are planned for later slices.
- Keep shared navigation in the root layout so every route can reuse it. Keep page-specific sections in reusable components under `src/components`.
- Preserve the existing `@/*` aliases, shadcn configuration, semantic CSS variables, and Biome formatting/linting rules.
- Use the travel assets in `public/assets` before introducing new image sources. Keep the current responsive-stacking approach for the first header slice; a mobile hamburger menu is not required yet.
- Read the matching guide in `node_modules/next/dist/docs/` before changing Next.js APIs or conventions.
