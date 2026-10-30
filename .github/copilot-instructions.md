# Copilot instructions

## Project overview

- This is a Next.js `16.4.3` App Router application using React `19.3.0`. Route files live under `src/app`; `src/app/layout.tsx` owns the document shell, global font, metadata, and global CSS, while `src/app/page.tsx` is currently the create-next-app starter home page.
- `next.config.ts` enables Cache Components, partial prefetching, the React Compiler, and the Tailwind Turbopack CSS loader. Preserve these options when changing the build configuration.
- `src/components/ui` is the shared shadcn Base Nova component layer. Components are built on `@base-ui/react`, use Lucide icons where needed, and commonly compose classes with `cn` from the `cn` package. Add reusable UI primitives there rather than duplicating them in route files.
- Interactive primitives and hooks are Client Components and begin with `"use client"`; route/layout files remain Server Components unless they need state, effects, browser APIs, or event handlers. `src/hooks` contains reusable client behavior, and `src/lib/highlighter.tsx` plus `use-highlighted-code.ts` provide lazy-loaded Shiki syntax highlighting.
- Styling is Tailwind CSS v4 through imports in `src/app/globals.css`, with shadcn CSS variables and a custom `.dark` variant. Use the existing semantic tokens (`bg-background`, `text-foreground`, `border-border`, etc.) and utility classes instead of introducing a separate styling system.
- TypeScript uses strict checking, bundler module resolution, and the `@/*` alias mapped to `src/*`. Shadcn aliases are defined in `components.json`: `@/components`, `@/components/ui`, `@/lib`, and `@/hooks`.
- Static images and other public assets are served from `public`; project-specific images are under `public/assets`.

## Commands

Run these from the repository root with npm:

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run Biome checks
npm run format    # Format files with Biome
```

There is no test script, test directory, or configured test runner in this repository, so there is no single-test command. For focused static validation, run Biome against a path, for example:

```bash
npx biome check src/app/page.tsx
```

## Conventions and workflow

- Follow Biome 2.4.2 configuration in `biome.json`: two-space indentation, formatter enabled, recommended lints enabled, Next/React domains enabled, and import organization enabled.
- Prefer the `@/*` aliases for application imports. Keep UI components composable and accept `className` where the existing component pattern does; merge classes with `cn`.
- Keep `"use client"` at the narrowest interactive boundary. Props crossing a Server/Client boundary must remain serializable, and server-only data or secrets must not be imported into client modules.
- When adding a UI component through shadcn, keep `components.json` and the existing Base Nova/Lucide/Tailwind v4 setup as the source of truth. Do not introduce a second component or token convention.
- Before changing Next.js APIs or conventions, read the matching guide in `node_modules/next/dist/docs/`; `AGENTS.md` records this repository requirement and is maintained by Next.js tooling.
