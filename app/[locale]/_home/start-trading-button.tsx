import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/common";

export default function StartTradingButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Link href="/direct-trade">
      <div
        className={cn(
          "hover:bg-main-hover flex h-10 cursor-pointer items-center rounded-3xl bg-main px-6 text-base font-light text-black",
          className,
        )}
      >
        Start Trading
      </div>
    </Link>
  );
}
