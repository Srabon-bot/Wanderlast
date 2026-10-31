# Wanderlast

Wanderlast is a Next.js 16 App Router travel website with a separate Express/MongoDB API. The frontend currently includes the home page, add-destination form, and live destinations catalog.

## Project locations

| Area | Location |
| --- | --- |
| Frontend | `D:\Projects\backnd\db-crud\wonderlust` |
| Backend | `D:\Projects\backnd\db-crud\wonderlust-server` |
| Destinations page | `src/app/destinations/all-destinations/page.tsx` |
| Catalog component | `src/components/destinations-catalog.tsx` |
| Shared navigation | `src/components/site-header.tsx` |

## Requirements

- Node.js with npm
- MongoDB connection configured in `wonderlust-server/.env`
- The backend running on port `8000` for live destination data

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

- The frontend fetch URL is currently hard-coded to `http://localhost:8000/alldestinations`.
- Destination detail URLs use the seeded `slug` values, for example `/destinations/bali-island-escape`.
- The API currently returns 13 records because one manually added record exists in addition to the 12 seeded records.
- Records without a `rating` use a visual fallback of `4.5`.
- New remote image hosts must be added to `next.config.ts` under `images.remotePatterns`.
- `AGENTS.md` contains the current implementation state and a short continuation checklist.
