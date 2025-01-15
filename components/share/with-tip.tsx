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
  content,
  align = "center",
  contentClassName,
}: {
  className?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  contentClassName?: string;
  align?: "center" | "end" | "start" | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  if (!content) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger onClick={handleToggle}>
          <div
            className={cn(
              className,
              content
                ? "underline-[#474747] cursor-pointer underline hover:text-main"
                : "",
            )}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          align={align}
          className={cn("z-[103] w-fit", contentClassName)}
        >
          <p>{content}</p>
          <TooltipArrow asChild>
            <CTooltipArrow />
          </TooltipArrow>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
