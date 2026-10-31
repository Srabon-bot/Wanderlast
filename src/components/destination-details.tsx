"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  MapPin,
  Pencil,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import type { Destination } from "@/components/destinations-catalog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const defaultHighlights = [
  "Luxury accommodation",
  "Traditional local experience",
  "Guided destination highlights",
  "Flexible travel planning",
  "Dedicated trip support",
];

export function DestinationDetails({
  destination,
}: {
  destination: Destination;
}) {
  const highlights = defaultHighlights;
  const router = useRouter();
  const [currentDestination, setCurrentDestination] =
    React.useState(destination);
  const rating = currentDestination.rating ?? 4.5;
  const price = currentDestination.price ?? 0;
  const reviews = 234;
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [editError, setEditError] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState("");
  const [draft, setDraft] = React.useState(() => ({
    destinationName: currentDestination.destinationName,
    country: currentDestination.country,
    category: currentDestination.category,
    price: currentDestination.price?.toString() ?? "",
    duration: currentDestination.duration,
    departureDate: currentDestination.departureDate,
    imageUrl: currentDestination.imageUrl,
    description: currentDestination.description ?? "",
  }));

  function updateDraft(
    field: keyof typeof draft,
    value: (typeof draft)[keyof typeof draft],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function openEditDialog() {
    setDraft({
      destinationName: currentDestination.destinationName,
      country: currentDestination.country,
      category: currentDestination.category,
      price: currentDestination.price?.toString() ?? "",
      duration: currentDestination.duration,
      departureDate: currentDestination.departureDate,
      imageUrl: currentDestination.imageUrl,
      description: currentDestination.description ?? "",
    });
    setEditError("");
    setEditOpen(true);
  }

  async function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = getDestinationId(currentDestination);
    if (!id) {
      setEditError("This destination is missing its database ID.");
      return;
    }

    setIsSaving(true);
    setEditError("");

    try {
      const payload = {
        destinationName: draft.destinationName.trim(),
        country: draft.country.trim(),
        category: draft.category,
        price: draft.price.trim() ? Number(draft.price) : null,
        duration: draft.duration.trim(),
        departureDate: draft.departureDate,
        imageUrl: draft.imageUrl.trim(),
        description: draft.description.trim(),
      };
      const response = await fetch(
        `http://localhost:8000/alldestinations/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(
          result?.message ?? `Destination update failed (${response.status}).`,
        );
      }

      setCurrentDestination((current) => ({ ...current, ...payload }));
      setEditOpen(false);
    } catch (error) {
      setEditError(
        error instanceof Error
          ? error.message
          : "Unable to update this destination.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function openDeleteDialog() {
    setDeleteError("");
    setDeleteOpen(true);
  }

  async function handleDelete() {
    const id = getDestinationId(currentDestination);
    if (!id) {
      setDeleteError("This destination is missing its database ID.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `http://localhost:8000/alldestinations/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(
          result?.message ??
            `Destination deletion failed (${response.status}).`,
        );
      }

      router.push("/destinations/all-destinations");
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Unable to delete this destination.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <main className="bg-white px-6 pb-20 pt-32 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            nativeButton={false}
            render={<Link href="/destinations/all-destinations" />}
            variant="ghost"
            className="h-auto justify-start px-0 text-lg font-normal text-[#6b6b6b] hover:bg-transparent hover:text-[#159fc0]"
          >
            <ArrowLeft className="size-5" strokeWidth={1.6} />
            Back to Destinations
          </Button>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-auto border-[#bdbdbd] px-6 py-3 text-base font-normal text-[#6b6b6b]"
              onClick={openEditDialog}
            >
              <Pencil className="size-5" strokeWidth={1.7} />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-auto border-red-400 px-6 py-3 text-base font-normal text-red-500 hover:bg-red-50 hover:text-red-500"
              onClick={openDeleteDialog}
            >
              <Trash2 className="size-5" strokeWidth={1.7} />
              Delete
            </Button>
          </div>
        </div>

        <EditDestinationDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          draft={draft}
          onDraftChange={updateDraft}
          onSubmit={handleEditSubmit}
          isSaving={isSaving}
          error={editError}
        />
        <DeleteDestinationDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          destinationName={currentDestination.destinationName}
          isDeleting={isDeleting}
          error={deleteError}
          onDelete={handleDelete}
        />

        <div className="relative mt-8 aspect-[1.9] overflow-hidden bg-[#e8eeee]">
          <Image
            src={currentDestination.imageUrl}
            alt={`${currentDestination.destinationName} in ${currentDestination.country}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 grid gap-12 border-t border-[#e5e5e5] pt-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-lg text-[#6b6b6b]">
              <MapPin className="size-5" strokeWidth={1.7} />
              {currentDestination.country}
            </p>
            <h1 className="mt-4 text-5xl font-light tracking-[-0.06em] sm:text-6xl">
              {currentDestination.destinationName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
              <span className="inline-flex items-center gap-2">
                <Star className="size-5 fill-green-600 text-green-600" />
                <strong>{rating.toFixed(1)}</strong>
                <span className="text-[#6b6b6b]">({reviews} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-5 text-[#6b6b6b]" />
                {currentDestination.duration}
              </span>
            </div>

            <DetailSection title="Overview">
              <p>
                {currentDestination.description ??
                  defaultOverview(currentDestination)}
              </p>
            </DetailSection>

            <DetailSection title="Highlights">
              <p>
                {currentDestination.description ??
                  defaultOverview(currentDestination)}
              </p>
              <ul className="mt-6 grid gap-4 text-[#6b6b6b] sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          </div>

          <BookingCard destination={currentDestination} price={price} />
        </div>
      </div>
    </main>
  );
}

type DestinationDraft = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

function EditDestinationDialog({
  open,
  onOpenChange,
  draft,
  onDraftChange,
  onSubmit,
  isSaving,
  error,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: DestinationDraft;
  onDraftChange: (field: keyof DestinationDraft, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isSaving: boolean;
  error: string;
}) {
  const fieldClassName =
    "h-12 rounded-none border-[#e5e7eb] bg-[#f8f9fa] px-4 text-base text-[#6b6b6b] placeholder:text-[#777] focus-visible:border-[#18a4c4] focus-visible:ring-[#18a4c4]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="!max-w-[800px] max-h-[calc(100vh-12px)] w-[calc(100%-12px)] overflow-y-auto rounded-none border border-[#ededed] bg-white p-0 text-[#090909] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
      >
        <form onSubmit={onSubmit} className="p-8 sm:p-10">
          <DialogHeader className="gap-2">
            <DialogTitle className="text-3xl font-light tracking-[-0.05em]">
              Update Travel Package
            </DialogTitle>
            <DialogDescription className="text-base text-[#6b6b6b]">
              Make changes to the travel package details below
            </DialogDescription>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
          </DialogHeader>

          <div className="mt-8 space-y-5">
            <Field label="Destination Name" htmlFor="edit-destination-name">
              <Input
                id="edit-destination-name"
                value={draft.destinationName}
                onChange={(event) =>
                  onDraftChange("destinationName", event.target.value)
                }
                className={fieldClassName}
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Country" htmlFor="edit-country">
                <Input
                  id="edit-country"
                  value={draft.country}
                  onChange={(event) =>
                    onDraftChange("country", event.target.value)
                  }
                  className={fieldClassName}
                />
              </Field>
              <Field label="Category" htmlFor="edit-category">
                <Select
                  value={draft.category}
                  onValueChange={(value) =>
                    onDraftChange("category", value ?? draft.category)
                  }
                >
                  <SelectTrigger
                    id="edit-category"
                    className={`${fieldClassName} w-full`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="City">City</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Price (USD)" htmlFor="edit-price">
                <Input
                  id="edit-price"
                  type="number"
                  placeholder="e.g., 1299"
                  value={draft.price}
                  onChange={(event) =>
                    onDraftChange("price", event.target.value)
                  }
                  className={fieldClassName}
                />
              </Field>
              <Field label="Duration" htmlFor="edit-duration">
                <Input
                  id="edit-duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={draft.duration}
                  onChange={(event) =>
                    onDraftChange("duration", event.target.value)
                  }
                  className={fieldClassName}
                />
              </Field>
            </div>

            <Field label="Departure Date" htmlFor="edit-departure-date">
              <Input
                id="edit-departure-date"
                type="date"
                value={draft.departureDate}
                onChange={(event) =>
                  onDraftChange("departureDate", event.target.value)
                }
                className={fieldClassName}
              />
            </Field>

            <Field label="Image URL" htmlFor="edit-image-url">
              <Input
                id="edit-image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={draft.imageUrl}
                onChange={(event) =>
                  onDraftChange("imageUrl", event.target.value)
                }
                className={fieldClassName}
              />
            </Field>

            <Field label="Description" htmlFor="edit-description">
              <Textarea
                id="edit-description"
                placeholder="Describe the travel experience..."
                value={draft.description}
                onChange={(event) =>
                  onDraftChange("description", event.target.value)
                }
                className="min-h-36 resize-y rounded-none border-[#e5e7eb] bg-[#f8f9fa] px-4 py-4 text-base text-[#6b6b6b] placeholder:text-[#777] focus-visible:border-[#18a4c4] focus-visible:ring-[#18a4c4]"
              />
            </Field>
          </div>

          <DialogFooter className="mt-8 flex-row justify-end gap-4 border-0 bg-transparent p-0">
            <DialogClose
              render={
                <Button
                  type="button"
                  disabled={isSaving}
                  variant="outline"
                  className="h-14 rounded-none border-red-500 px-7 text-base font-normal text-red-500 hover:bg-red-50 hover:text-red-500"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-14 rounded-none bg-[#18a4c4] px-7 text-base font-normal hover:bg-[#118dab]"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDestinationDialog({
  open,
  onOpenChange,
  destinationName,
  isDeleting,
  error,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinationName: string;
  isDeleting: boolean;
  error: string;
  onDelete: () => void | Promise<void>;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        size="default"
        className="!max-w-[600px] w-[calc(100%-24px)] rounded-none border border-[#ededed] bg-white p-8 text-[#090909] shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:p-10"
      >
        <AlertDialogCancel
          variant="ghost"
          size="icon-sm"
          aria-label="Close delete dialog"
          className="absolute right-3 top-3 rounded-none text-[#b3b3b3] hover:bg-transparent hover:text-[#777]"
        >
          <X className="size-6" strokeWidth={1.5} />
        </AlertDialogCancel>
        <AlertDialogHeader className="grid-cols-[auto_1fr] gap-x-4 text-left">
          <AlertDialogMedia className="row-span-2 size-14 rounded-full bg-[#fceeee] text-red-500">
            <CircleAlert className="size-7" strokeWidth={1.8} />
          </AlertDialogMedia>
          <AlertDialogTitle className="self-center text-2xl font-light">
            Delete Travel Package
          </AlertDialogTitle>
          <AlertDialogDescription className="col-start-2 text-base leading-relaxed text-[#6b6b6b]">
            Are you sure you want to delete{" "}
            <strong className="text-[#090909]">"{destinationName}"</strong>?
            This action cannot be undone and will permanently remove this travel
            package from the system.
          </AlertDialogDescription>
          {error ? (
            <p className="col-start-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-row justify-end gap-4 border-0 bg-transparent p-0">
          <AlertDialogCancel
            size="lg"
            className="h-14 rounded-none px-7 text-base font-normal"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isDeleting}
            variant="destructive"
            size="lg"
            className="h-14 rounded-none bg-[#f04444] px-7 text-base text-white hover:bg-[#d93636]"
            onClick={onDelete}
          >
            <Trash2 className="size-5" />
            {isDeleting ? "Deleting..." : "Delete Package"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2 text-base font-medium">
        {label}
      </Label>
      {children}
    </div>
  );
}

function getDestinationId(destination: Destination) {
  if (typeof destination._id === "string") {
    return destination._id;
  }

  return destination._id?.$oid ?? destination.id ?? null;
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-light tracking-[-0.04em]">{title}</h2>
      <div className="mt-5 text-lg leading-relaxed text-[#6b6b6b]">
        {children}
      </div>
    </section>
  );
}

function BookingCard({
  destination,
  price,
}: {
  destination: Destination;
  price: number;
}) {
  const [departureDate, setDepartureDate] = React.useState(
    destination.departureDate,
  );
  const [message, setMessage] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Your booking details are ready for the next step.");
  }

  return (
    <Card className="h-fit rounded-none border-[#e4e4e4] p-5 shadow-[0_3px_10px_rgba(0,0,0,0.12)] lg:sticky lg:top-32">
      <p className="text-lg text-[#6b6b6b]">Starting from</p>
      <p className="mt-1 text-4xl text-[#159fc0]">${price.toLocaleString()}</p>
      <p className="mt-1 text-base text-[#6b6b6b]">per person</p>

      <form onSubmit={handleSubmit} className="mt-10">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>
        <Input
          id="departure-date"
          type="date"
          value={departureDate}
          onChange={(event) => {
            setDepartureDate(event.target.value);
            setMessage("");
          }}
          className="h-auto rounded-none border-[#e5e5e5] bg-[#fafafa] px-4 py-4 text-lg focus-visible:border-[#159fc0] focus-visible:ring-0"
          required
        />
        <Button
          type="submit"
          size="lg"
          className="mt-6 h-auto w-full rounded-none bg-[#1ea4c3] px-5 py-4 text-lg text-white hover:bg-[#148da9]"
        >
          Book Now
          <ArrowRight className="size-5" />
        </Button>
        {message ? (
          <output
            className="mt-3 block text-sm text-green-700"
            aria-live="polite"
          >
            {message}
          </output>
        ) : null}
      </form>

      <ul className="mt-6 space-y-4 border-t border-[#e5e5e5] pt-5 text-base text-[#6b6b6b]">
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          Free cancellation up to 7 days
        </li>
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          Travel insurance included
        </li>
        <li className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-green-600" />
          24/7 customer support
        </li>
      </ul>
    </Card>
  );
}

function defaultOverview(destination: Destination) {
  return `Discover the highlights of ${destination.destinationName} with memorable local experiences, scenic landscapes, and thoughtfully planned travel days.`;
}
