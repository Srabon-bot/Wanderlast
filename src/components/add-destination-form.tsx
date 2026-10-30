import { Save, Trash2 } from "lucide-react";
import Link from "next/link";

const inputClassName =
  "h-12 w-full border border-[#e5e7eb] bg-[#f8f9fa] px-4 text-base text-[#6b6b6b] outline-none transition-colors placeholder:text-[#777] focus:border-[#18a4c4] focus:ring-1 focus:ring-[#18a4c4]";

export function AddDestinationForm() {
  return (
    <form className="mx-auto max-w-[800px] border border-[#ededed] bg-white px-10 py-10 shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:px-12 sm:py-11">
      <div>
        <label
          htmlFor="destination-name"
          className="mb-2 block text-base font-medium"
        >
          Destination Name
        </label>
        <input
          id="destination-name"
          name="destinationName"
          placeholder="Bali Paradise"
          className={inputClassName}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="country" className="mb-2 block text-base font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            placeholder="Indonesia"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-base font-medium"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue="Beach"
            className={`${inputClassName} appearance-auto`}
          >
            <option>Beach</option>
            <option>Mountain</option>
            <option>City</option>
            <option>Adventure</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-2 block text-base font-medium">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="e.g., 1299"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-base font-medium"
          >
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            placeholder="e.g., 7 Days/6 Nights"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="departure-date"
          className="mb-2 block text-base font-medium"
        >
          Departure Date
        </label>
        <input
          id="departure-date"
          name="departureDate"
          placeholder="mm/dd/yyyy"
          className={inputClassName}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="image-url" className="mb-2 block text-base font-medium">
          Image URL
        </label>
        <input
          id="image-url"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          className={inputClassName}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="description"
          className="mb-2 block text-base font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe the travel experience..."
          className="min-h-36 w-full resize-y border border-[#e5e7eb] bg-[#f8f9fa] px-4 py-4 text-base text-[#6b6b6b] outline-none transition-colors placeholder:text-[#777] focus:border-[#18a4c4] focus:ring-1 focus:ring-[#18a4c4]"
        />
      </div>

      <div className="mt-10 flex flex-col-reverse justify-end gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-14 items-center justify-center gap-2 border border-red-500 px-7 text-base text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="size-4" />
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 bg-[#18a4c4] px-7 text-base text-white transition-colors hover:bg-[#118dab]"
        >
          <Save className="size-4" />
          Add Travel Package
        </button>
      </div>
    </form>
  );
}
