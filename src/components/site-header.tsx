"use client";

import { authClient } from "@/lib/auth-client";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations/all-destinations" },
  { label: "Add Destination", href: "/destinations/new" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export function SiteHeader() {
  const pathname = usePathname();

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
            style={{ height: "auto" }}
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
      </nav>
    </header>
  );
}
