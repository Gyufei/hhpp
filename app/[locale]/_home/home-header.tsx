import Image from "next/image";
import { cn } from "@/lib/utils/common";
import StartTradingButton from "./start-trading-button";
import SocialIcon from "./social-icon";
import { Link } from "@/i18n/routing";

const menuItemsClx =
  "flex h-10 items-center rounded-3xl px-[10px] cursor-pointer";

export default function HomeHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-14 w-full items-center justify-between bg-bg-black px-[120px]">
      <div className="flex items-center justify-start space-x-[100px]">
        <Image src="/icons/logo.svg" width={100} height={20} alt="logo" />
        <div className="flex items-center space-x-[30px] text-title-white">
          <div className={menuItemsClx}>Curve Trade</div>
          <Link
            href="/marketplace"
            className="flex h-10 items-center rounded-3xl px-[10px]"
          >
            Direct Trade
          </Link>
          <Link href="/dashboard/holdings" className={menuItemsClx}>
            Portfolio
          </Link>
          <Link href="/dashboard/referrals" className={menuItemsClx}>
            Referrals
          </Link>
          <div className={cn(menuItemsClx, "space-x-[10px]")}>
            <span>More</span>
            <Image
              src="/icons/arrow-down.svg"
              width={10}
              height={10}
              alt="arrow-down"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-[30px]">
        <div className="flex items-center space-x-[20px]">
          <SocialIcon />
        </div>
        <StartTradingButton className="h-9 px-[30px] text-xs" />
      </div>
    </div>
  );
}
