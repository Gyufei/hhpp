import { cn } from "@/lib/utils/common";
import { useTranslations } from "next-intl";

export default function Empty({ className }: { className?: string }) {
  const T = useTranslations("Common");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="w-full text-center text-sm leading-4 text-gray">
        {T("NoData")}
      </div>
    </div>
  );
}
