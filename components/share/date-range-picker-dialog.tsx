import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DateRangePickerDialog({
  dateRange,
  setDateRange,
  children,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  children: React.ReactNode;
}) {
  const T = useTranslations("Common");
  const [range, setRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: undefined,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dateRange) {
      setRange(dateRange);
    }
  }, [dateRange]);

  function handleConfirm() {
    setDateRange(range);
    setOpen(false);
  }

  return (
    <Dialog aria-describedby={undefined} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="h-[80%] w-min overflow-auto border-none bg-white p-4 sm:h-auto sm:w-[838px] sm:overflow-hidden"
        showClose={false}
      >
        <div>
          <Calendar
            initialFocus
            mode="range"
            className=""
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            formatters={{
              formatCaption: (month: Date) => {
                return format(month, "yyyy - MM");
              },
            }}
          />
          <div className="mt-5 flex justify-end border-t border-[#F0F1F5] pt-4">
            <Button
              onClick={handleConfirm}
              className="h-7 rounded-full border border-[#eee] hover:border-black"
            >
              {T("btn-Confirm")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
