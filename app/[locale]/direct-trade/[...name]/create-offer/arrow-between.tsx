import Image from "next/image";
import { cn } from "@/lib/utils/common";

export default function ArrowBetween({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-bg-black bg-[#222428]",
        className,
      )}
    >
      <Image src="/icons/sort-down.svg" width={24} height={24} alt="down" />
    </div>
  );
}
