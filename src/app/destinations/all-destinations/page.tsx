import type { Destination } from "@/components/destinations-catalog";
import { DestinationsCatalog } from "@/components/destinations-catalog";

export const dynamic = "force-dynamic";

async function getDestinations(): Promise<Destination[]> {
  const response = await fetch("http://localhost:8000/alldestinations", {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Destination API returned ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Destination API returned an invalid response.");
  }

  return data as Destination[];
}

export default async function AllDestinations() {
  try {
    const destinations = await getDestinations();

    return (
      <main className="bg-white px-6 pb-20 pt-36 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <h1 className="text-5xl font-light tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Explore All Destinations
            </h1>
            <p className="mt-5 text-lg text-[#6b6b6b] sm:text-xl">
              Find your perfect travel experience from our curated collection
            </p>
          </header>

          <div className="mt-12">
            <DestinationsCatalog destinations={destinations} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load destinations right now.";

    return (
      <main className="bg-white px-6 pb-20 pt-36 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-light tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Explore All Destinations
          </h1>
          <div className="mt-12 border border-red-200 bg-red-50 px-6 py-8 text-red-800">
            <h2 className="text-2xl">Destinations are unavailable</h2>
            <p className="mt-2">{message}</p>
            <p className="mt-4 text-sm">
              Make sure the Wonderlust server is running on port 8000 and try
              again.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
