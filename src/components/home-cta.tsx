import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden text-white sm:min-h-[470px]">
      <Image
        src="/assets/CTA.png"
        alt="Aerial view of a tropical island"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-5 py-20 text-center sm:px-6 sm:py-24">
        <h2 className="text-3xl font-light tracking-[-0.06em] sm:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 sm:mt-5 sm:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations/all-destinations"
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-6 bg-white px-6 text-sm font-medium uppercase text-black transition-colors hover:bg-white/85 sm:mt-10 sm:h-14 sm:w-auto sm:gap-8"
        >
          Book Your Trip Today
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </section>
  );
}
