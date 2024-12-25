import { cn } from "@/lib/utils/common";
import Image from "next/image";

export default function Empty({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Image
        width={200}
        height={200}
        src={`/icons/empty.svg`}
        alt="no data"
      ></Image>
      <div className="w-full text-center text-sm leading-4 text-gray">
        There is currently no data available
      </div>
    </div>
  );
}
