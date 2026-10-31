"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import type { Destination } from "@/components/destinations-catalog";

const defaultHighlights = [
  "Luxury accommodation",
  "Traditional local experience",
  "Guided destination highlights",
  "Flexible travel planning",
  "Dedicated trip support",
];

export function DestinationDetails({
  destination,
}: {
  destination: Destination;
}) {
  const highlights = defaultHighlights;
  const rating = destination.rating ?? 4.5;
  const price = destination.price ?? 0;
  const reviews = 234;

  return (
    <main className="bg-white px-6 pb-20 pt-32 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/destinations/all-destinations"
            className="inline-flex items-center gap-3 text-lg text-[#6b6b6b] transition-colors hover:text-[#159fc0]"
          >
            <ArrowLeft className="size-5" strokeWidth={1.6} />
            Back to Destinations
          </Link>

          <div className="flex gap-4">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-3 border border-[#bdbdbd] px-6 py-3 text-base text-[#6b6b6b] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Pencil className="size-5" strokeWidth={1.7} />
              Edit
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-3 border border-red-400 px-6 py-3 text-base text-red-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Trash2 className="size-5" strokeWidth={1.7} />
              Cancel
            </button>
          </div>
        </div>

        <div className="relative mt-8 aspect-[1.9] overflow-hidden bg-[#e8eeee]">
          <Image
            src={destination.imageUrl}
            alt={`${destination.destinationName} in ${destination.country}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 grid gap-12 border-t border-[#e5e5e5] pt-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-lg text-[#6b6b6b]">
              <MapPin className="size-5" strokeWidth={1.7} />
              {destination.country}
            </p>
            <h1 className="mt-4 text-5xl font-light tracking-[-0.06em] sm:text-6xl">
              {destination.destinationName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
              <span className="inline-flex items-center gap-2">
                <Star className="size-5 fill-green-600 text-green-600" />
                <strong>{rating.toFixed(1)}</strong>
                <span className="text-[#6b6b6b]">({reviews} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-5 text-[#6b6b6b]" />
                {destination.duration}
              </span>
            </div>

            <DetailSection title="Overview">
              <p>{destination.description ?? defaultOverview(destination)}</p>
            </DetailSection>

            <DetailSection title="Highlights">
              <p>{destination.description ?? defaultOverview(destination)}</p>
              <ul className="mt-6 grid gap-4 text-[#6b6b6b] sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          </div>

          <BookingCard destination={destination} price={price} />
        </div>
      </div>
    </main>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-light tracking-[-0.04em]">{title}</h2>
      <div className="mt-5 text-lg leading-relaxed text-[#6b6b6b]">
        {children}
      </div>
    </section>
  );
}

function BookingCard({
  destination,
  price,
}: {
  destination: Destination;
  price: number;
}) {
  const [departureDate, setDepartureDate] = React.useState(
    destination.departureDate,
  );
  const [message, setMessage] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Your booking details are ready for the next step.");
  }

  return (
    <aside className="h-fit border border-[#e4e4e4] p-5 shadow-[0_3px_10px_rgba(0,0,0,0.12)] lg:sticky lg:top-32">
      <p className="text-lg text-[#6b6b6b]">Starting from</p>
      <p className="mt-1 text-4xl text-[#159fc0]">${price.toLocaleString()}</p>
      <p className="mt-1 text-base text-[#6b6b6b]">per person</p>

      <form onSubmit={handleSubmit} className="mt-10">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>
        <input
          id="departure-date"
          type="date"
          value={departureDate}
          onChange={(event) => {
            setDepartureDate(event.target.value);
            setMessage("");
          }}
          className="w-full border border-[#e5e5e5] bg-[#fafafa] px-4 py-4 text-lg outline-none focus:border-[#159fc0]"
          required
        />
        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-3 bg-[#1ea4c3] px-5 py-4 text-lg text-white transition-colors hover:bg-[#148da9]"
        >
          Book Now
          <ArrowRight className="size-5" />
        </button>
        {message ? (
          <output
            className="mt-3 block text-sm text-green-700"
            aria-live="polite"
          >
            {message}
          </output>
        ) : null}
      </form>

      <ul className="mt-6 space-y-4 border-t border-[#e5e5e5] pt-5 text-base text-[#6b6b6b]">
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          Free cancellation up to 7 days
        </li>
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          Travel insurance included
        </li>
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          24/7 customer support
        </li>
      </ul>
    </aside>
  );
}

function defaultOverview(destination: Destination) {
  return `Discover the highlights of ${destination.destinationName} with memorable local experiences, scenic landscapes, and thoughtfully planned travel days.`;
}
