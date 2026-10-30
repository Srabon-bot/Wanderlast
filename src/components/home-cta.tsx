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

      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        <h2 className="text-4xl font-light tracking-[-0.06em] sm:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-5 text-base text-white/90 sm:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-10 inline-flex h-14 items-center gap-8 bg-white px-6 text-sm font-medium uppercase text-black transition-colors hover:bg-white/85"
        >
          Book Your Trip Today
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </section>
  );
}
