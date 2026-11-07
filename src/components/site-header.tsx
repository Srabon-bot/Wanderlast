"use client";

import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations/all-destinations" },
  { label: "My Bookings", href: "/myBookings" },
  { label: "Admin", href: "/destinations/new" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  function isActive(href: string) {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 bg-white px-4 py-3 text-sm text-black shadow-sm sm:px-6 sm:py-4 lg:gap-x-10 lg:px-8">
        <div className="flex items-center justify-start">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-[#090909] lg:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-6" strokeWidth={1.6} />
            ) : (
              <Menu className="size-6" strokeWidth={1.6} />
            )}
          </button>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  isActive(item.href)
                    ? "text-[#159fc0] underline underline-offset-4"
                    : "transition-colors hover:text-[#159fc0]"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="mx-auto leading-none"
          aria-label="Wonderlast home"
        >
          <span className="text-2xl font-semibold tracking-[-0.05em] text-[#18a4c4] sm:text-3xl lg:text-4xl">
            Wonderlast
          </span>
        </Link>

        <div className="flex items-center justify-end">
          <div className="hidden items-center gap-6 lg:flex lg:gap-8">
            <Link
              href="/profile"
              className="flex items-center gap-1.5 transition-colors hover:text-[#159fc0]"
            >
              <UserRound className="size-4" strokeWidth={1.8} />
              <span>Profile</span>
            </Link>

            {user ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      className="rounded-full"
                      aria-label="Open profile menu"
                    />
                  }
                >
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image ?? undefined}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-72">
                  <PopoverHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image ?? undefined}
                        />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <PopoverTitle className="truncate">
                          {user?.name}
                        </PopoverTitle>
                        <PopoverDescription className="truncate">
                          {user?.email}
                        </PopoverDescription>
                      </div>
                    </div>
                  </PopoverHeader>

                  {user?.createdAt && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href="/profile" />}
                    >
                      View profile
                    </Button>
                    <Button size="sm" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
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
              </>
            )}
          </div>

          <Link
            href={user ? "/profile" : "/login"}
            aria-label={user ? "Open profile" : "Login"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e5e5] text-[#090909] lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {user ? (
              <Avatar className="size-8">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user.image ?? undefined}
                />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserRound className="size-5" strokeWidth={1.7} />
            )}
          </Link>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="mx-auto mt-2 max-h-[calc(100vh-5.5rem)] overflow-y-auto bg-white px-5 pb-6 pt-3 text-sm shadow-sm lg:hidden"
        >
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`border-b border-[#f0f0f0] py-3.5 ${
                  isActive(item.href)
                    ? "font-medium text-[#159fc0]"
                    : "text-[#090909]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 border border-[#e5e5e5] px-3 py-3">
                  <Avatar className="size-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image ?? undefined}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#090909]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#6b6b6b]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="inline-flex h-11 items-center justify-center border border-[#d8d8d8] px-5 text-[#090909]"
                  onClick={() => setMenuOpen(false)}
                >
                  View profile
                </Link>
                <Button
                  type="button"
                  className="h-11 rounded-none bg-[#18a4c4] text-base font-normal hover:bg-[#118dab]"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center bg-[#18a4c4] px-5 text-base text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center border border-[#d8d8d8] px-5 text-base text-[#090909]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
