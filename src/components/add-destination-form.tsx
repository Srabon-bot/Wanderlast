"use client";

import { Save, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
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
import { apiUrl } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const inputClassName =
  "h-12 rounded-none border-[#e5e7eb] bg-[#f8f9fa] px-4 text-base text-[#6b6b6b] placeholder:text-[#777] focus-visible:border-[#18a4c4] focus-visible:ring-[#18a4c4]";

export type DestinationFormData = {
  destinationName: string;
  country: string;
  category: string;
  price: number | null;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type AddDestinationFormProps = {
  onSubmit?: (data: DestinationFormData) => void;
};

export function AddDestinationForm({ onSubmit }: AddDestinationFormProps) {
  const [category, setCategory] = React.useState("Beach");
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setStatus({
        type: "error",
        message: "Please sign in before adding a travel package.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const priceValue = String(formData.get("price") ?? "").trim();
    const data: DestinationFormData = {
      destinationName: String(formData.get("destinationName") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      category,
      price: priceValue ? Number(priceValue) : null,
      duration: String(formData.get("duration") ?? "").trim(),
      departureDate: String(formData.get("departureDate") ?? "").trim(),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    onSubmit?.(data);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(apiUrl("/add-destination"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ownerId: user.id,
          ownerName: user.name,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.message ?? `Unable to add the package (${response.status}).`,
        );
      }

      form.reset();
      setCategory("Beach");
      setStatus({
        type: "success",
        message: "Travel package added successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to add the package right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isPending) {
    return (
      <p className="mx-auto max-w-[800px] text-base text-[#6b6b6b]">
        Checking your session…
      </p>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-[800px] border border-dashed border-[#cfcfcf] px-5 py-12 text-center sm:px-6 sm:py-16">
        <h2 className="text-xl sm:text-2xl">Sign in to manage packages</h2>
        <p className="mt-2 text-sm text-[#6b6b6b] sm:text-base">
          Only signed-in users can add travel packages. You can only edit or
          delete packages you created.
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[800px] border border-[#ededed] bg-white px-5 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:px-10 sm:py-10 lg:px-12 lg:py-11"
    >
      <div>
        <Label
          htmlFor="destination-name"
          className="mb-2 block text-base font-medium"
        >
          Destination Name
        </Label>
        <Input
          id="destination-name"
          name="destinationName"
          placeholder="Bali Paradise"
          className={inputClassName}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="country" className="mb-2 block text-base font-medium">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            placeholder="Indonesia"
            className={inputClassName}
          />
        </div>
        <div>
          <Label
            htmlFor="category"
            className="mb-2 block text-base font-medium"
          >
            Category
          </Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value ?? "Beach")}
          >
            <SelectTrigger className={`${inputClassName} w-full`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beach">Beach</SelectItem>
              <SelectItem value="Mountain">Mountain</SelectItem>
              <SelectItem value="City">City</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="category" value={category} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="price" className="mb-2 block text-base font-medium">
            Price (USD)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g., 1299"
            className={inputClassName}
          />
        </div>
        <div>
          <Label
            htmlFor="duration"
            className="mb-2 block text-base font-medium"
          >
            Duration
          </Label>
          <Input
            id="duration"
            name="duration"
            placeholder="e.g., 7 Days/6 Nights"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-5">
        <Label
          htmlFor="departure-date"
          className="mb-2 block text-base font-medium"
        >
          Departure Date
        </Label>
        <Input
          id="departure-date"
          name="departureDate"
          type="date"
          className={inputClassName}
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="image-url" className="mb-2 block text-base font-medium">
          Image URL
        </Label>
        <Input
          id="image-url"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          className={inputClassName}
        />
      </div>

      <div className="mt-5">
        <Label
          htmlFor="description"
          className="mb-2 block text-base font-medium"
        >
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the travel experience..."
          className="min-h-36 resize-y rounded-none border-[#e5e7eb] bg-[#f8f9fa] px-4 py-4 text-base text-[#6b6b6b] placeholder:text-[#777] focus-visible:border-[#18a4c4] focus-visible:ring-[#18a4c4]"
        />
      </div>

      {status ? (
        status.type === "error" ? (
          <p
            role="alert"
            className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:text-base"
          >
            {status.message}
          </p>
        ) : (
          <output className="mt-6 block border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 sm:text-base">
            {status.message}
          </output>
        )
      ) : null}

      <div className="mt-10 flex flex-col-reverse justify-end gap-4 sm:flex-row">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="outline"
          className="h-14 rounded-none border-red-500 px-7 text-base font-normal text-red-500 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="size-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-none bg-[#18a4c4] px-7 text-base font-normal hover:bg-[#118dab] disabled:opacity-60"
        >
          <Save className="size-4" />
          {isSubmitting ? "Adding..." : "Add Travel Package"}
        </Button>
      </div>
    </form>
  );
}
