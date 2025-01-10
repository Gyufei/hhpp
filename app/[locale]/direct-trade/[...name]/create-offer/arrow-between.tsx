import Image from "next/image";
import { cn } from "@/lib/utils/common";

export default function ArrowBetween({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-border-black bg-bg-black",
        className,
      )}
    >
      <Image
        src="/icons/sort-up.svg"
        width={24}
        height={24}
        alt="down"
        className="rotate-180"
      />
    </div>
  );
}
