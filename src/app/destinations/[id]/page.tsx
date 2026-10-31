import { notFound } from "next/navigation";
import { DestinationDetails } from "@/components/destination-details";
import type { Destination } from "@/components/destinations-catalog";

export const dynamic = "force-dynamic";

async function getDestination(slug: string): Promise<Destination | null> {
  const response = await fetch(
    `http://localhost:8000/destinations/${encodeURIComponent(slug)}`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Destination API returned ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Destination API returned an invalid response.");
  }

  return data as Destination;
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let destination: Destination | null;

  try {
    destination = await getDestination(id);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load this destination right now.";

    return (
      <main className="bg-white px-6 pb-20 pt-32 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-light tracking-[-0.06em] sm:text-6xl">
            Destination unavailable
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#6b6b6b]">{message}</p>
        </div>
      </main>
    );
  }

  if (!destination) {
    notFound();
  }

  return <DestinationDetails destination={destination} />;
}
