"use client";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export type Destination = {
  id?: string;
  _id?: string | { $oid?: string };
  slug?: string;
  destinationName: string;
  country: string;
  category: string;
  price: number | null;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description?: string;
  rating?: number;
};

type DestinationsCatalogProps = {
  destinations: Destination[];
};

const priceRanges = [
  { label: "All prices", value: "all" },
  { label: "Under $1,500", value: "under-1500" },
  { label: "$1,500 - $2,000", value: "1500-2000" },
  { label: "Over $2,000", value: "over-2000" },
] as const;

const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
] as const;

export function DestinationsCatalog({
  destinations,
}: DestinationsCatalogProps) {
  const [category, setCategory] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("recommended");

  const categories = React.useMemo(
    () => [
      { label: "All categories", value: "all" },
      ...Array.from(
        new Set(destinations.map((destination) => destination.category)),
      )
        .sort()
        .map((value) => ({ label: value, value })),
    ],
    [destinations],
  );

  const visibleDestinations = React.useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const matchesCategory =
        category === "all" || destination.category === category;
      const price = destination.price ?? 0;
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-1500" && price < 1500) ||
        (priceRange === "1500-2000" && price >= 1500 && price <= 2000) ||
        (priceRange === "over-2000" && price > 2000);

      return matchesCategory && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") {
        return (a.price ?? 0) - (b.price ?? 0);
      }

      if (sortBy === "price-desc") {
        return (b.price ?? 0) - (a.price ?? 0);
      }

      if (sortBy === "name-asc") {
        return a.destinationName.localeCompare(b.destinationName);
      }

      return 0;
    });
  }, [category, destinations, priceRange, sortBy]);

  return (
    <section>
      <div className="grid border border-[#cfcfcf] md:grid-cols-3">
        <FilterSelect
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <FilterSelect
          label="Price Range"
          value={priceRange}
          options={priceRanges}
          onChange={setPriceRange}
        />
        <FilterSelect
          label="Sort By"
          value={sortBy}
          options={sortOptions}
          onChange={setSortBy}
        />
      </div>

      <p className="mt-5 text-lg text-[#6b6b6b]">
        Showing {visibleDestinations.length} destination
        {visibleDestinations.length === 1 ? "" : "s"}
      </p>

      {visibleDestinations.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={getDestinationKey(destination, index)}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-[#cfcfcf] px-6 py-16 text-center">
          <h2 className="text-2xl">No destinations found</h2>
          <p className="mt-2 text-[#6b6b6b]">
            Try changing one of the filters to see more travel experiences.
          </p>
        </div>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex min-h-14 items-center border-b border-[#cfcfcf] px-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-transparent pr-8 text-lg uppercase text-[#6b6b6b] outline-none"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-5 size-5 text-[#b3b3b3]"
        strokeWidth={1.5}
      />
    </label>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const rating = destination.rating ?? 4.5;
  const price = destination.price ?? 0;

  return (
    <article>
      <div className="relative aspect-[1.7] overflow-hidden bg-[#e8eeee]">
        <Image
          src={destination.imageUrl}
          alt={`${destination.destinationName} in ${destination.country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute right-5 top-5 flex items-center gap-2 bg-white/85 px-4 py-3 text-lg backdrop-blur-sm">
          <span>{rating.toFixed(1)}</span>
          <Star className="size-5 fill-current" aria-hidden="true" />
          <span className="sr-only">out of 5 stars</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-2 text-base text-[#6b6b6b]">
          <MapPin className="size-5" strokeWidth={1.7} />
          {destination.country}
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl leading-tight">
            {destination.destinationName}
          </h2>
          <p className="shrink-0 text-2xl">
            ${price.toLocaleString()}
            <span className="text-sm text-[#6b6b6b]">/Person</span>
          </p>
        </div>
        <p className="mt-3 flex items-center gap-2 text-base text-[#6b6b6b]">
          <CalendarDays className="size-5" strokeWidth={1.7} />
          {destination.duration}
        </p>
        <Link
          href={`/destinations/${destination.slug ?? getDestinationKey(destination, 0)}`}
          className="mt-5 inline-flex items-center gap-3 text-base uppercase text-[#18a4c4] underline decoration-1 underline-offset-4 transition-colors hover:text-[#118dab]"
        >
          Book now
          <ArrowUpRight className="size-5" strokeWidth={1.7} />
        </Link>
      </div>
    </article>
  );
}

function getDestinationKey(destination: Destination, index: number) {
  if (destination.slug) {
    return destination.slug;
  }

  if (typeof destination._id === "string") {
    return destination._id;
  }

  return (
    destination._id?.$oid ??
    destination.id ??
    `${destination.destinationName}-${index}`
  );
}
