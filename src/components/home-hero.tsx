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
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#102e32] text-white">
      <Image
        src="/assets/Banner.png"
        alt="A tropical coastal destination"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-5 pb-12 pt-36 sm:px-10 sm:pb-20 sm:pt-44 lg:pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-light leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-white/90 sm:mt-8 sm:text-lg sm:leading-7">
            Explore breathtaking destinations and create unforgettable memories
            with
            <br className="hidden sm:block" /> our curated travel experiences.
          </p>

          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              href="/destinations/all-destinations"
              className="inline-flex h-12 w-full items-center justify-center gap-6 bg-[#18a4c4] px-7 text-sm font-medium uppercase transition-colors hover:bg-[#118dab] sm:h-14 sm:w-auto sm:gap-8"
            >
              Explore Now
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/destinations/all-destinations"
              className="inline-flex h-12 w-full items-center justify-center border border-white/60 bg-white/15 px-7 text-sm font-medium uppercase backdrop-blur-sm transition-colors hover:bg-white/25 sm:h-14 sm:w-auto"
            >
              View Destination
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 border-t border-white/30 bg-white/20 backdrop-blur-sm sm:flex">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex min-h-16 flex-col justify-center border-b border-white/30 px-4 py-3 even:border-l sm:min-h-20 sm:flex-1 sm:border-b-0 sm:border-l-0 sm:border-r sm:px-6 sm:even:border-l-0"
          >
            <span className="text-sm font-medium sm:text-lg">
              {field.label}
            </span>
            <span className="mt-1 text-xs text-white/90 sm:text-sm">
              {field.value}
            </span>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 min-h-14 bg-[#18a4c4] px-8 text-base font-semibold transition-colors hover:bg-[#118dab] sm:col-span-1 sm:min-h-20 sm:w-48 sm:shrink-0 sm:text-lg"
        >
          Search
        </button>
      </div>
    </section>
  );
}
