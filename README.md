# Wonderlast

Wonderlast is a Next.js 16 App Router travel website with a separate Express/MongoDB API. The frontend currently includes the home page, add-destination form, and live destinations catalog.

## Project locations

| Area | Location |
| --- | --- |
| Frontend | `D:\Projects\backnd\db-crud\wonderlust` |
| Backend | `D:\Projects\backnd\db-crud\wonderlust-server` |
| Destinations page | `src/app/destinations/all-destinations/page.tsx` |
| Catalog component | `src/components/destinations-catalog.tsx` |
| Shared navigation | `src/components/site-header.tsx` |

## Requirements

- Node.js 20.9 or newer with npm
- MongoDB connection configured in `wonderlust-server/.env`
- The backend running on port `8000` for live destination data (or a deployed API URL)

## Environment variables

Copy `.env.example` to `.env` and fill in the values.

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser + server | Yes in production | Public base URL of the Express API |
| `API_URL` | Server only | No | Server-side API override |
| `NEXT_PUBLIC_APP_URL` | Browser | No | Public frontend URL used by the auth client |
| `BETTER_AUTH_SECRET` | Server | Yes in production | Long random secret for Better Auth |
| `BETTER_AUTH_URL` | Server | Yes in production | Public URL of the deployed frontend |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Server | No | Comma-separated extra allowed origins |
| `MONGODB_URI` | Server | Yes | MongoDB Atlas connection string |
| `MONGODB_DB` | Server | No | Database name, defaults to `wonderlust` |


## Run locally

Start the backend in one terminal:

```powershell
cd D:\Projects\backnd\db-crud\wonderlust-server
npm install
npm run seed
node index.js
```

Start the frontend in another terminal:

```powershell
cd D:\Projects\backnd\db-crud\wonderlust
npm install
npm run dev
```

Open:

- Home: http://localhost:3000
- All destinations: http://localhost:3000/destinations/all-destinations
- Add destination: http://localhost:3000/destinations/new
- API response: http://localhost:8000/alldestinations

## Current features

- Live destination cards loaded from `GET /alldestinations`.
- Destination details loaded by slug from `GET /destinations/:slug`.
- Category, price-range, and sorting controls on the destinations page.
- Responsive three-column desktop catalog that stacks on smaller screens.
- Remote `next/image` support for Unsplash and the current Google image host.
- Shared header active-link underline based on the current pathname.
- Idempotent backend destination seeding with 12 realistic records.

## Useful commands

Frontend:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

Focused validation:

```bash
npx biome check src/app/destinations/all-destinations/page.tsx src/components/destinations-catalog.tsx src/components/site-header.tsx next.config.ts
npx tsc --noEmit
```

Backend:

```bash
npm run seed
node index.js
```

## Notes for the next session

- API requests use `NEXT_PUBLIC_API_URL`, so production no longer depends on `localhost`.
- Destination detail URLs use the seeded `slug` values, for example `/destinations/bali-island-escape`.
- The API currently returns 13 records because one manually added record exists in addition to the 12 seeded records.
- Records without a `rating` use a visual fallback of `4.5`.
- New remote image hosts must be added to `next.config.ts` under `images.remotePatterns`.
- `AGENTS.md` contains the current implementation state and a short continuation checklist.

## Deploy to Vercel

The frontend deploys to Vercel as a standard Next.js app. The Express API must be hosted separately (for example Render, Railway, Fly.io, or a VPS) and reachable over HTTPS.

1. Deploy `wonderlust-server` to your API host and confirm `GET /alldestinations` works publicly.
2. Import this repository in Vercel. The framework preset is detected automatically.
3. Add these Vercel environment variables for Production (and Preview if needed):
   - `NEXT_PUBLIC_API_URL` — public URL of the deployed API
   - `BETTER_AUTH_SECRET` — long random secret
   - `BETTER_AUTH_URL` — the deployed frontend URL, for example `https://wonderlast.vercel.app`
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `MONGODB_DB` — optional, defaults to `wonderlust`
4. Deploy. `NEXT_PUBLIC_*` variables are inlined at build time, so changing `NEXT_PUBLIC_API_URL` requires a redeploy.
5. Add the Vercel domain to your MongoDB Atlas network access list.

For preview deployments, either use a preview-specific `BETTER_AUTH_URL` or leave it unset so Better Auth derives the origin from the request.

