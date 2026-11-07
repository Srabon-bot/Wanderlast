import { CalendarDays, Eye, Tag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  type Booking,
  formatBookingId,
  formatDepartureDate,
  getBookingId,
  getBookingStatus,
  getDestinationHref,
} from "@/lib/bookings";
import { BookingStatusBadge } from "./booking-status-badge";

export function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: () => void;
}) {
  const bookingId = getBookingId(booking);
  const bookingStatus = getBookingStatus(booking);
  const destinationName = booking.destinationName?.trim() || "Travel package";
  const imageSrc = booking.imageUrl?.trim() || "/assets/Banner.png";
  const price = booking.price ?? 0;

  return (
    <article className="border border-[#e5e5e5] bg-white p-4 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-6 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <div className="relative aspect-[1.75] overflow-hidden bg-[#e8eeee]">
          <Image
            src={imageSrc}
            alt={
              booking.country
                ? `${destinationName} in ${booking.country}`
                : destinationName
            }
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 320px, 384px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5 xl:flex-row xl:items-end xl:gap-6">
          <div className="min-w-0">
            <BookingStatusBadge status={bookingStatus} />

            <h2 className="mt-3 text-2xl font-light tracking-[-0.03em] sm:text-3xl">
              {destinationName}
            </h2>

            <div className="mt-3 space-y-2 text-base text-[#6b6b6b] sm:mt-4 sm:text-lg">
              <p className="flex items-start gap-2">
                <CalendarDays
                  className="mt-0.5 size-5 shrink-0"
                  strokeWidth={1.7}
                />
                <span>
                  Departure: {formatDepartureDate(booking.departureDate)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Tag className="size-5 shrink-0" strokeWidth={1.7} />
                <span>Booking ID: {formatBookingId(bookingId)}</span>
              </p>
            </div>

            <p className="mt-4 text-3xl text-[#159fc0] sm:text-4xl">
              ${price.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row xl:shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={!bookingId}
              onClick={onCancel}
              className="h-12 w-full rounded-none border-red-500 bg-white px-7 text-base font-normal text-red-500 hover:bg-red-50 hover:text-red-500 disabled:border-red-200 disabled:text-red-300 sm:w-auto"
            >
              <Trash2 className="size-5" strokeWidth={1.7} />
              Cancel
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={getDestinationHref(booking)} />}
              className="h-12 w-full rounded-none bg-[#1ea4c3] px-7 text-base font-normal text-white hover:bg-[#148da9] sm:w-auto"
            >
              <Eye className="size-5" strokeWidth={1.7} />
              View
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
