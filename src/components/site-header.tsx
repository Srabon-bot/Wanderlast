"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations/all-destinations" },
  { label: "Add Destination", href: "/destinations/new" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4">
      <nav className="mx-auto grid flex-wrap items-center gap-x-8 gap-y-4 bg-white px-6 py-4 text-sm text-black shadow-sm sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        <div className="order-2 flex w-full items-center justify-center gap-6 lg:order-1 lg:w-auto lg:justify-start lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                  ? "text-[#159fc0] underline underline-offset-4"
                  : "transition-colors hover:text-[#159fc0]"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="order-1 mx-auto lg:order-2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={172}
            height={38}
            priority
            className="h-auto w-[150px] sm:w-[172px]"
          />
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-6 lg:w-auto lg:justify-end lg:gap-8">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 transition-colors hover:text-[#159fc0]"
          >
            <UserRound className="size-4" strokeWidth={1.8} />
            <span>Profile</span>
          </Link>
          <Link
            href="/login"
            className="transition-colors hover:text-[#159fc0]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="transition-colors hover:text-[#159fc0]"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
