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

## Current implementation state

- The frontend is a Next.js 16 App Router application under `src/app`.
- `/destinations/all-destinations` fetches live records from `http://localhost:8000/alldestinations` and renders the client catalog in `src/components/destinations-catalog.tsx`.
- The destinations catalog has functional category, price-range, and sort controls. It renders all API records, uses a `4.5` rating fallback when a record has no rating, and shows an explicit API error state.
- `next.config.ts` allows remote images from `images.unsplash.com` and `encrypted-tbn0.gstatic.com`.
- `src/components/site-header.tsx` is a Client Component and uses `usePathname()` so the active underline follows the current route, including nested routes.
- The separate backend is in `D:\Projects\backnd\db-crud\wonderlust-server`. It exposes `GET /alldestinations`, `POST /add-destination`, and `npm run seed`; its seed script creates 12 idempotent destination records.

## Continue next session

1. Start the backend from `D:\Projects\backnd\db-crud\wonderlust-server` with `node index.js`; confirm `http://localhost:8000/alldestinations` returns JSON.
2. Start the frontend from this repository with `npm run dev`; open `http://localhost:3000/destinations/all-destinations`.
3. Check the reference layout at desktop and mobile widths, especially card image cropping, filter stacking, and header active-link behavior.
4. If API image records are added from new hosts, add narrowly scoped `images.remotePatterns` entries in `next.config.ts`.
5. Run `npx biome check` and `npm run build` before committing further changes.
