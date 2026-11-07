import { CircleCheck, Clock } from "lucide-react";
import type { BookingStatus } from "@/lib/bookings";

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const isConfirmed = status === "Confirmed";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm sm:px-4 sm:text-base ${
        isConfirmed
          ? "bg-[#e9f7ef] text-[#1c9b5e]"
          : "bg-[#fdf3e2] text-[#e2a33c]"
      }`}
    >
      {isConfirmed ? (
        <CircleCheck className="size-4 sm:size-5" strokeWidth={1.8} />
      ) : (
        <Clock className="size-4 sm:size-5" strokeWidth={1.8} />
      )}
      {status}
    </span>
  );
}
