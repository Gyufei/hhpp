import { cn } from "@/lib/utils/common";
import Image from "next/image";

export default function DrawerTitle({
  title,
  onClose,
  tag,
  tagClassName,
}: {
  title: string;
  onClose: () => void;
  tag?: string;
  tagClassName?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-[10px]">
        <div className="h-6 w-6 rounded-lg bg-main"></div>
        <div className="text-xl leading-[30px] text-title-white">{title}</div>
        {tag && (
          <div
            className={cn(
              "flex h-5 items-center rounded-[4px] px-[6px] text-xs leading-4 text-white",
              tagClassName,
            )}
          >
            {tag}
          </div>
        )}
      </div>
      <Image
        src="/icons/close.svg"
        width={24}
        height={24}
        alt="close"
        className="cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}
