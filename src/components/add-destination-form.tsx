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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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
    console.log("Destination form data:", data);

    const response = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to submit destination data:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Destination submitted successfully:", result);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[800px] border border-[#ededed] bg-white px-10 py-10 shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:px-12 sm:py-11"
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
          className="h-14 rounded-none bg-[#18a4c4] px-7 text-base font-normal hover:bg-[#118dab]"
        >
          <Save className="size-4" />
          Add Travel Package
        </Button>
      </div>
    </form>
  );
}
