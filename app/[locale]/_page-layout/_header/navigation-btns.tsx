"use client";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/common";

const menuItemsClx =
  "flex h-10 items-center rounded-3xl px-[10px] cursor-pointer data-[active=true]:text-main";

export default function NavigationBtns() {
  return (
    <div className="flex items-center space-x-[30px] text-title-white">
      <Link href="/curve-trade" className={menuItemsClx}>
        Curve Trade
      </Link>
      <Link
        href="/direct-trade"
        className="flex h-10 items-center rounded-3xl px-[10px]"
      >
        Direct Trade
      </Link>
      <Link href="/portfolio" className={menuItemsClx}>
        Portfolio
      </Link>
      <Link href="/referrals" className={menuItemsClx}>
        Referrals
      </Link>
      <div className={cn(menuItemsClx, "space-x-[10px]")}>
        <span>More</span>
        <Image
          src="/icons/arrow-down.svg"
          width={20}
          height={20}
          alt="arrow-down"
        />
      </div>
    </div>
  );
}
