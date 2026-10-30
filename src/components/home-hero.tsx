import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#102e32] text-white">
      <Image
        src="/assets/Banner.png"
        alt="A tropical coastal destination"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-36 pt-48 text-center sm:px-10 lg:pb-40">
        <h1 className="max-w-3xl text-5xl font-light leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with
          <br className="hidden sm:block" /> our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex h-14 items-center justify-center gap-8 bg-[#18a4c4] px-7 text-sm font-medium uppercase transition-colors hover:bg-[#118dab]"
          >
            Explore Now
            <ArrowRight className="size-5" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-14 items-center justify-center border border-white/60 bg-white/15 px-7 text-sm font-medium uppercase backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col bg-white/20 backdrop-blur-sm sm:flex-row">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex min-h-20 flex-1 flex-col justify-center border-b border-white/30 px-6 py-3 last:border-b-0 sm:border-b-0 sm:border-r"
          >
            <span className="text-lg font-medium">{field.label}</span>
            <span className="mt-1 text-sm text-white/90">{field.value}</span>
          </div>
        ))}
        <button
          type="button"
          className="min-h-20 bg-[#18a4c4] px-12 text-lg font-semibold transition-colors hover:bg-[#118dab] sm:w-48 sm:shrink-0"
        >
          Search
        </button>
      </div>
    </section>
  );
}
