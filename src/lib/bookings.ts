export const BOOKINGS_API = "http://localhost:8000/myBookings";
export const CANCEL_BOOKING_API = "http://localhost:8000/bookings";

export type ObjectId = string | { $oid?: string };

export type Booking = {
  _id?: ObjectId;
  userId?: string;
  userEmail?: string;
  userName?: string;
  userImage?: string;
  destinationId?: ObjectId;
  destinationName?: string;
  destinationSlug?: string;
  slug?: string;
  country?: string;
  category?: string;
  duration?: string;
  description?: string;
  imageUrl?: string;
  price?: number | null;
  departureDate?: string;
  bookingDate?: string;
  createdAt?: string;
  status?: string;
};

export type BookingStatus = "Confirmed" | "Pending";

export async function fetchBookings(
  email: string,
  signal?: AbortSignal,
): Promise<Booking[]> {
  const response = await fetch(`${BOOKINGS_API}/${encodeURIComponent(email)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "The bookings API endpoint was not found. Make sure GET /myBookings/:email is available on the API server."
        : `The bookings API returned ${response.status}.`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The bookings API returned an invalid response.");
  }

  return (data as Booking[])
    .map((booking) => ({ ...booking, status: getBookingStatus(booking) }))
    .sort((a, b) => getBookingTimestamp(b) - getBookingTimestamp(a));
}

export async function cancelBooking(bookingId: string) {
  const response = await fetch(
    `${CANCEL_BOOKING_API}/${encodeURIComponent(bookingId)}`,
    {
      method: "DELETE",
      headers: { Accept: "application/json" },
    },
  );

  // A missing booking is already cancelled, so treat it as success.
  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      result?.message ?? `Booking cancellation failed (${response.status}).`,
    );
  }
}

export function getObjectId(value: ObjectId | undefined) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && typeof value.$oid === "string") {
    return value.$oid;
  }

  return "";
}

export function getBookingId(booking: Booking) {
  return getObjectId(booking._id);
}

export function getBookingStatus(booking: Booking): BookingStatus {
  const status =
    typeof booking.status === "string"
      ? booking.status.trim().toLowerCase()
      : "";

  if (status === "pending") {
    return "Pending";
  }

  if (status === "confirmed") {
    return "Confirmed";
  }

  return booking.bookingDate ? "Confirmed" : "Pending";
}

export function getBookingTimestamp(booking: Booking) {
  const value = booking.bookingDate ?? booking.createdAt;

  if (!value) {
    return 0;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
}

export function getDestinationHref(booking: Booking) {
  const slug = booking.slug?.trim() || booking.destinationSlug?.trim();

  if (slug) {
    return `/destinations/${encodeURIComponent(slug)}`;
  }

  const destinationId = getObjectId(booking.destinationId);

  if (destinationId) {
    return `/destinations/${encodeURIComponent(destinationId)}`;
  }

  return "/destinations/all-destinations";
}

export function formatDepartureDate(value?: string) {
  if (!value) {
    return "—";
  }

  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatBookingId(bookingId: string) {
  if (!bookingId) {
    return "—";
  }

  return bookingId.length > 8
    ? `BKG-${bookingId.slice(-6).toUpperCase()}`
    : bookingId;
}
