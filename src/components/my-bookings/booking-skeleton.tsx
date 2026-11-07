export function BookingSkeleton() {
  return (
    <div className="border border-[#e5e5e5] bg-white p-4 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-6 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        <div className="aspect-[1.75] animate-pulse bg-[#eeeeee]" />
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div className="w-full max-w-md">
            <div className="h-7 w-28 animate-pulse rounded-full bg-[#eeeeee]" />
            <div className="mt-4 h-8 w-56 animate-pulse bg-[#eeeeee] sm:h-9 sm:w-64" />
            <div className="mt-5 h-5 w-48 animate-pulse bg-[#eeeeee] sm:w-52" />
            <div className="mt-3 h-5 w-36 animate-pulse bg-[#eeeeee] sm:w-40" />
            <div className="mt-5 h-9 w-28 animate-pulse bg-[#eeeeee] sm:h-10 sm:w-32" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-12 w-full animate-pulse bg-[#eeeeee] sm:w-36" />
            <div className="h-12 w-full animate-pulse bg-[#eeeeee] sm:w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingSkeletons() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {[0, 1, 2].map((item) => (
        <BookingSkeleton key={item} />
      ))}
    </div>
  );
}
