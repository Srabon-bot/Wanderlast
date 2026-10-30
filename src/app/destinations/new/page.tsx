import { AddDestinationForm } from "@/components/add-destination-form";

export default function AddDestinationPage() {
  return (
    <main className="bg-white px-6 pb-20 pt-36 text-[#090909] sm:px-10 lg:px-20 lg:pb-24 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-light tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          Add New Travel Package
        </h1>
        <div className="mt-20">
          <AddDestinationForm />
        </div>
      </div>
    </main>
  );
}
