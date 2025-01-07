"use client";

import Image from "next/image";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils/common";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center ",
        caption_label: "text-lg leading-[30px]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1 border-none",
        nav_button_next: "absolute right-4 border-none",
        table: " border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md sm:w-10 w-7 mr-[5px] sm:mr-[15px] font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-10 sm:w-10 w-7 mr-[5px] sm:mr-[15px] text-center text-sm p-0 relative rounded-full [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-main text-txt-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-[#c0c4cc] aria-selected:bg-accent/50 aria-selected:text-txt-white",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-[rgba(224,255,98,0.2)] aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => (
          <Image src="/icons/left.svg" width={24} height={24} alt="right" />
        ),
        IconRight: ({ ..._props }) => (
          <Image
            src="/icons/left.svg"
            width={24}
            height={24}
            alt="right"
            className="rotate-180"
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
