"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils/common";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border border-transparent bg-[#50D2C120]">
      <SliderPrimitive.Range className="absolute h-full bg-main" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      style={{
        boxShadow: "0px 0px 5px 0px rgba(45, 46, 51, 0.1)",
      }}
      className="focus-visible:ring-ring block h-5 w-5 cursor-pointer rounded-full border-[3px] border-white bg-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
