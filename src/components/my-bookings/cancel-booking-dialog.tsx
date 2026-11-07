import { CircleAlert, Trash2, X } from "lucide-react";
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

type CancelBookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingName: string;
  departureDate: string;
  isCancelling: boolean;
  error: string;
  onConfirm: () => void;
};

export function CancelBookingDialog({
  open,
  onOpenChange,
  bookingName,
  departureDate,
  isCancelling,
  error,
  onConfirm,
}: CancelBookingDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        size="default"
        className="!max-w-[600px] w-[calc(100%-24px)] rounded-none border border-[#ededed] bg-white p-6 text-[#090909] shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:p-8"
      >
        <AlertDialogCancel
          variant="ghost"
          size="icon-sm"
          aria-label="Close cancel booking dialog"
          className="absolute right-3 top-3 rounded-none text-[#b3b3b3] hover:bg-transparent hover:text-[#777]"
        >
          <X className="size-5" strokeWidth={1.5} />
        </AlertDialogCancel>

        <AlertDialogHeader className="grid-cols-[auto_1fr] gap-x-4 text-left">
          <AlertDialogMedia className="row-span-2 size-14 rounded-full bg-[#fceeee] text-red-500">
            <CircleAlert className="size-7" strokeWidth={1.8} />
          </AlertDialogMedia>
          <AlertDialogTitle className="self-center text-2xl font-light">
            Cancel Booking
          </AlertDialogTitle>
          <AlertDialogDescription className="col-start-2 text-base leading-relaxed text-[#6b6b6b]">
            Are you sure you want to cancel{" "}
            <strong className="text-[#090909]">"{bookingName}"</strong>{" "}
            departing {departureDate}? This action cannot be undone.
          </AlertDialogDescription>
          {error ? (
            <p className="col-start-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-col-reverse gap-3 border-0 bg-transparent p-0 sm:flex-row sm:justify-end sm:gap-4">
          <AlertDialogCancel
            size="lg"
            className="h-12 w-full rounded-none px-7 text-base font-normal sm:w-auto"
          >
            Keep Booking
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isCancelling}
            variant="destructive"
            size="lg"
            className="h-12 w-full rounded-none bg-[#f04444] px-7 text-base text-white hover:bg-[#d93636] sm:w-auto"
            onClick={onConfirm}
          >
            <Trash2 className="size-5" />
            {isCancelling ? "Cancelling..." : "Cancel Booking"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
