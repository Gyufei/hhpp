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
    <div className="flex items-center justify-between border-b border-border-black px-5 py-[15px]">
      <div className="flex items-center space-x-[10px]">
        <div className="text-[18px] leading-[28px] text-title-white">
          {title}
        </div>
        {tag && (
          <div
            className={cn(
              "txt-white flex h-5 items-center rounded px-[6px] text-xs leading-4",
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
