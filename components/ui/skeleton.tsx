import { cn } from "@/lib/utils/common";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-[#f0f1f5]", className)}
      {...props}
    />
  );
}

export { Skeleton };
