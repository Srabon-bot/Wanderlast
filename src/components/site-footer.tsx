import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0d0b0c] px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div>
          <Link href="/" aria-label="Wanderlast home">
            <Image
              src="/assets/Wanderlast-1.png"
              alt="Wanderlast"
              width={548}
              height={82}
              className="h-auto w-[280px] sm:w-[420px] lg:w-[548px]"
              style={{ height: "auto" }}
            />
          </Link>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-lg font-light uppercase">Newsletter</h2>
            <p className="mt-2 text-sm text-white/70">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-5 flex max-w-sm bg-[#393939]">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-white outline-none placeholder:text-white/65"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-4 text-2xl transition-colors hover:text-[#18a4c4]"
              >
                <ArrowUpRight className="size-6" />
              </button>
            </form>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Support" links={supportLinks} />

          <div>
            <h2 className="text-lg font-light uppercase">Contact Us</h2>
            <div className="mt-5 space-y-4 text-base text-white/70">
              <p>786 901 1622</p>
              <a
                href="mailto:info@wandarland.com"
                className="block transition-colors hover:text-white"
              >
                info@wandarland.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-6 text-white">
            <a
              href="https://x.com"
              aria-label="X"
              className="text-xl transition-colors hover:text-[#18a4c4]"
            >
              𝕏
            </a>
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[#18a4c4]"
            >
              <span className="inline-flex size-5 items-center justify-center border border-current text-xs font-bold">
                in
              </span>
            </a>
            <a
              href="https://www.instagram.com"
              aria-label="Instagram"
              className="transition-colors hover:text-[#18a4c4]"
            >
              <span className="inline-flex size-5 items-center justify-center rounded-[5px] border border-current text-xs">
                ◎
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-lg font-light uppercase">{title}</h2>
      <div className="mt-5 space-y-4 text-base text-white/70">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
