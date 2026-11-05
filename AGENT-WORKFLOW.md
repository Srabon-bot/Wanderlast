# Coding Agent Workflow for Next.js + Express/MongoDB Projects

This guide is a reusable playbook for coding agents working on projects with a Next.js App Router frontend, TypeScript, Tailwind CSS, shadcn/Base UI, and an Express/MongoDB backend. Project-specific instructions always take precedence over this guide.

## 0. Fast setup commands

Run these from the project root in PowerShell. Replace paths, package names, ports, and environment values with the project's actual configuration.

### Frontend installation

```powershell
Set-Location .\frontend
npm install
```

If the frontend does not have a package manifest yet:

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install lucide-react
npx shadcn@latest init
```

### Backend installation

```powershell
Set-Location ..\backend
npm install
```

For a new Express/MongoDB backend:

```powershell
npm init -y
npm install express cors dotenv mongodb
npm install --save-dev nodemon
```

Add scripts to `package.json` when they are not already present:

```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "seed": "node seed.js"
  }
}
```

### Environment configuration

Create the backend environment file without committing it:

```powershell
@"
MONGODB_URI=mongodb://127.0.0.1:27017
PORT=8000
"@ | Set-Content .env
```

Use the project's real MongoDB connection string when MongoDB Atlas or another hosted database is required. Add `.env` and other secret files to `.gitignore`.

For a frontend API base URL, use the project's established configuration convention. A typical Next.js setup is:

```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:8000
"@ | Set-Content ..\frontend\.env.local
```

Never put private database credentials in `NEXT_PUBLIC_*` variables.

### Database and services

If the backend provides a seed script:

```powershell
npm run seed
```

Start the backend in one terminal:

```powershell
npm run dev
```

Start the frontend in a second terminal:

```powershell
Set-Location ..\frontend
npm run dev
```

Typical local URLs:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8000
```

### Fast verification

```powershell
# Backend health/API check
Invoke-WebRequest -UseBasicParsing http://localhost:8000/

# Frontend production checks
Set-Location .\frontend
npx biome check .
npx tsc --noEmit
npm run build
```

If the project uses ESLint instead of Biome, run `npm run lint` or the repository's documented lint command. Do not install a second formatter or linter without checking the existing configuration.

## 1. Recover context before coding

Before changing code:

1. Read `AGENTS.md`, `.github/copilot-instructions.md`, `README.md`, and any package-level instructions.
2. Read recent handoff reports, checkpoints, logs, and unfinished plans when available.
3. Inspect the current git status and recent commits. Do not overwrite unrelated work.
4. Identify the frontend and backend roots, run commands, environment requirements, and active services.
5. Search for existing components, API routes, types, helpers, and similar implementations before adding new ones.

Treat existing instructions and working code as the source of truth. Do not infer framework behavior from memory when local documentation is available.

## 2. Establish the implementation boundary

Before editing, write down:

- the user-visible behavior being added or fixed;
- the exact frontend routes, components, and backend endpoints involved;
- data fields and identifier formats exchanged between frontend and backend;
- loading, empty, not-found, validation, and API error states;
- what is explicitly out of scope.

Prefer the smallest complete change. Do not redesign unrelated pages, replace established libraries, or introduce a second styling/component convention.

## 3. Next.js App Router conventions

- Read the matching guide under `node_modules/next/dist/docs/` before changing Next.js APIs or file conventions.
- Keep route files and layouts as Server Components unless they need state, effects, browser APIs, or event handlers.
- Put `"use client"` at the narrowest interactive boundary.
- Keep props crossing Server/Client boundaries serializable.
- Await promised dynamic route `params` when required by the installed Next.js version.
- Use explicit `notFound()` behavior for missing resources and clear rendered error states for API failures.
- Preserve existing `next.config` options, image patterns, compiler settings, cache behavior, and aliases.
- For responsive `next/image` elements, preserve aspect ratio with correct dimensions, `fill` containers, or explicit automatic sizing.
- Encode route parameters and validate identifiers before sending them to APIs.

## 4. UI and design-system conventions

- Reuse existing shadcn/Base UI primitives from `src/components/ui` for buttons, inputs, dialogs, cards, selects, labels, alerts, and textareas.
- Do not duplicate primitive markup in route files when a shared component exists.
- Follow the repository's Tailwind version, semantic tokens, spacing, typography, and dark-mode conventions.
- Keep reusable page sections under `src/components`; keep route files focused on data loading and composition.
- Preserve responsive behavior at mobile, tablet, and desktop widths.
- Match reference designs through structure, spacing, sizing, colors, typography, borders, shadows, and states—not only approximate text.
- Use accessible labels, native controls where appropriate, keyboard-accessible dialogs, visible focus states, and meaningful error messaging.
- When a Base UI button renders a link or another element, follow the installed primitive's semantics and set its native-button option correctly rather than suppressing warnings.

## 5. API and MongoDB integration

- Inspect the backend schema and route behavior before creating frontend payloads.
- Keep API contracts explicit: document methods, URLs, request fields, response shapes, status codes, and identifier formats.
- Use stable readable slugs for public detail URLs when appropriate.
- Generate normalized slugs on the backend, not only in the browser, and handle collisions deterministically.
- Preserve compatibility for legacy records that only have MongoDB ObjectIds.
- Validate ObjectIds before constructing `new ObjectId(...)`.
- Never treat a failed API request as a successful empty response. Surface failures in the UI and logs using repository conventions.
- For PATCH requests, send only intended fields or the repository's established complete payload, and verify the response.
- Protect destructive actions with confirmation UI, pending states, duplicate-submit protection, and explicit error states.
- After successful edits, update visible state or refetch. After successful deletes, navigate to a valid parent/list route.
- Keep secrets in environment configuration. Never commit credentials, private URLs, tokens, or database dumps.

## 6. Safe data and CRUD verification

For live CRUD testing:

1. Prefer a disposable test record or a clearly identified safe record.
2. Capture its original state before mutation.
3. Test the create/update/delete request and verify the database result with a follow-up read.
4. Restore the original state or delete every disposable record.
5. Confirm cleanup independently.

For migrations or backfills:

- make the operation idempotent;
- update only records that need the field;
- preserve existing values;
- use deterministic collision handling;
- avoid changing unrelated data;
- report failures instead of silently skipping them.

## 7. Validation checklist

Run the smallest checks covering the change, then broaden only when needed:

```bash
npx biome check <changed-files>
npx tsc --noEmit
npm run build
```

Also verify the relevant behavior directly:

- API success, validation failure, not-found, and server-error paths;
- frontend route rendering for valid and invalid identifiers;
- loading, empty, and error states;
- responsive layout and reference-driven visual details;
- edit persistence and delete persistence when CRUD is involved;
- browser console warnings, especially image aspect-ratio and accessibility warnings.

Do not claim completion while a check introduced by the change is failing. If an unrelated baseline failure exists, state it separately and provide evidence.

## 8. Documentation and handoff

When the work is complete:

- update the relevant README or agent guidance if commands, routes, APIs, or architecture changed;
- record important technical decisions and deferred work;
- include files changed, behavior implemented, validation run, and any known limitations;
- leave the next agent a short continuation checklist;
- do not include secrets or unnecessary personal/environment data in handoff notes.

## 9. Final review

Before finishing, confirm:

- the requested behavior works end to end;
- existing behavior and conventions were preserved;
- changed files are intentional;
- no temporary records, processes, files, or debug output remain;
- formatting, type checking, build, and focused runtime checks passed;
- the final response states the result and meaningful validation concisely.
