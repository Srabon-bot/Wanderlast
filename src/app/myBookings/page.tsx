import type { Metadata } from "next";
import { MyBookings } from "@/components/my-bookings/my-bookings";

export const metadata: Metadata = {
  title: "My Bookings | Wonderlast",
  description: "Manage and view your upcoming travel plans with Wonderlast.",
};

export default function MyBookingsPage() {
  return <MyBookings />;
}
