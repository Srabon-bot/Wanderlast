import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BookingsError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="border border-red-200 bg-red-50 px-5 py-7 text-red-800 sm:px-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl">Bookings are unavailable</h2>
      <p className="mt-2 text-sm sm:text-base">{message}</p>
      <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          type="button"
          onClick={onRetry}
          className="h-11 w-full rounded-none bg-red-700 px-5 text-base font-normal text-white hover:bg-red-800 sm:w-auto"
        >
          <RefreshCw className="size-4" strokeWidth={1.8} />
          Try again
        </Button>
        <p className="text-xs sm:text-sm">
          Make sure the Wonderlast API server is running on port 8000.
        </p>
      </div>
    </div>
  );
}

export function SignInPrompt() {
  return (
    <div className="border border-dashed border-[#cfcfcf] px-5 py-12 text-center sm:px-6 sm:py-16">
      <h2 className="text-xl sm:text-2xl">Sign in to view your bookings</h2>
      <p className="mt-2 text-sm text-[#6b6b6b] sm:text-base">
        Log in to see and manage your upcoming travel plans.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/login" />}
        className="mt-6 h-12 w-full rounded-none bg-[#1ea4c3] px-7 text-base font-normal text-white hover:bg-[#148da9] sm:w-auto"
      >
        Login
      </Button>
    </div>
  );
}

export function EmptyBookings() {
  return (
    <div className="border border-dashed border-[#cfcfcf] px-5 py-12 text-center sm:px-6 sm:py-16">
      <h2 className="text-xl sm:text-2xl">No bookings yet</h2>
      <p className="mt-2 text-sm text-[#6b6b6b] sm:text-base">
        Explore our destinations and book your next adventure.
      </p>
      <Link
        href="/destinations/all-destinations"
        className="mt-6 inline-flex items-center gap-2 text-sm uppercase text-[#18a4c4] underline decoration-1 underline-offset-4 transition-colors hover:text-[#118dab] sm:text-base"
      >
        Browse destinations
      </Link>
    </div>
  );
}
