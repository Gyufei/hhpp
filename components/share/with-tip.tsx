import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/common";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/c-tooltip-arrow";
import { useState } from "react";

export function WithTip({
  className,
  children,
  align = "center",
}: {
  className?: string;
  children?: React.ReactNode;
  align?: "center" | "end" | "start" | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger onClick={handleToggle}>
          <Image
            src="/icons/help.svg"
            width={16}
            height={16}
            alt="msg"
            className="ml-1"
          />
        </TooltipTrigger>
        <TooltipContent
          align={align}
          className={cn("z-[103] w-[300px]", className)}
        >
          <p className="text-xs leading-[18px]">{children}</p>
          <TooltipArrow asChild>
            <CTooltipArrow />
          </TooltipArrow>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
