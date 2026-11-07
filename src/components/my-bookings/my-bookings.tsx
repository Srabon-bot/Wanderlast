"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import {
  type Booking,
  cancelBooking,
  fetchBookings,
  formatDepartureDate,
  getBookingId,
} from "@/lib/bookings";
import { BookingCard } from "./booking-card";
import { BookingSkeletons } from "./booking-skeleton";
import { BookingsError, EmptyBookings, SignInPrompt } from "./bookings-states";
import { CancelBookingDialog } from "./cancel-booking-dialog";

type LoadState = "idle" | "loading" | "loaded" | "error";

export function MyBookings() {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loadState, setLoadState] = React.useState<LoadState>("idle");
  const [loadError, setLoadError] = React.useState("");
  const [reloadToken, setReloadToken] = React.useState(0);
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(
    null,
  );
  const [isCancelling, setIsCancelling] = React.useState(false);
  const [cancelError, setCancelError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userEmail) {
      setBookings([]);
      setLoadState("idle");
      setLoadError("");
      return;
    }

    void reloadToken;

    const controller = new AbortController();

    setLoadState("loading");
    setLoadError("");

    fetchBookings(userEmail, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setBookings(data);
          setLoadState("loaded");
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load your bookings right now.",
          );
          setLoadState("error");
        }
      });

    return () => controller.abort();
  }, [isPending, userEmail, reloadToken]);

  React.useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setSuccessMessage(""), 6000);

    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  function openCancelDialog(booking: Booking) {
    setCancelError("");
    setSelectedBooking(booking);
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedBooking(null);
      setCancelError("");
    }
  }

  async function handleConfirmCancel() {
    if (!selectedBooking) {
      return;
    }

    const bookingId = getBookingId(selectedBooking);

    if (!bookingId) {
      setCancelError("This booking is missing its database ID.");
      return;
    }

    setIsCancelling(true);
    setCancelError("");

    try {
      await cancelBooking(bookingId);
      setBookings((current) =>
        current.filter((item) => getBookingId(item) !== bookingId),
      );
      setSelectedBooking(null);
      setSuccessMessage("Booking cancelled successfully.");
    } catch (error) {
      setCancelError(
        error instanceof Error
          ? error.message
          : "Unable to cancel this booking right now.",
      );
    } finally {
      setIsCancelling(false);
    }
  }

  let content: React.ReactNode;

  if (isPending) {
    content = <BookingSkeletons />;
  } else if (!session?.user) {
    content = <SignInPrompt />;
  } else if (loadState === "idle" || loadState === "loading") {
    content = <BookingSkeletons />;
  } else if (loadState === "error") {
    content = (
      <BookingsError
        message={loadError}
        onRetry={() => setReloadToken((value) => value + 1)}
      />
    );
  } else if (bookings.length === 0) {
    content = <EmptyBookings />;
  } else {
    content = (
      <div className="space-y-4 sm:space-y-6">
        {bookings.map((booking, index) => (
          <BookingCard
            key={getBookingId(booking) || `booking-${index}`}
            booking={booking}
            onCancel={() => openCancelDialog(booking)}
          />
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white px-4 pb-20 pt-32 text-[#090909] sm:px-6 sm:pt-36 md:px-10 lg:px-20 lg:pb-24 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-light tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            My Bookings
          </h1>
          <p className="mt-3 text-base text-[#6b6b6b] sm:mt-4 sm:text-lg lg:text-xl">
            Manage and view your upcoming travel plans
          </p>
        </header>

        <section className="mt-8 sm:mt-10" aria-live="polite">
          {successMessage ? (
            <output className="mb-5 block border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800 sm:text-base">
              {successMessage}
            </output>
          ) : null}
          {content}
        </section>
      </div>

      <CancelBookingDialog
        open={Boolean(selectedBooking)}
        onOpenChange={handleDialogOpenChange}
        bookingName={
          selectedBooking?.destinationName?.trim() || "Travel package"
        }
        departureDate={formatDepartureDate(selectedBooking?.departureDate)}
        isCancelling={isCancelling}
        error={cancelError}
        onConfirm={handleConfirmCancel}
      />
    </main>
  );
}
