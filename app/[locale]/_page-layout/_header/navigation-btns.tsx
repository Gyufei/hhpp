"use client";
import { Link, usePathname } from "@/i18n/routing";
import MoreMenu from "./more-menu";

const menuItemsClx =
  "flex h-10 items-center px-[10px] cursor-pointer data-[active=true]:text-main hover:text-main";

export default function NavigationBtns() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center space-x-[30px] text-title-white sm:flex">
      <Link
        href="/curve-trade"
        data-active={pathname.startsWith("/curve-trade")}
        className={menuItemsClx}
      >
        Curve Trade
      </Link>
      <Link
        href="/direct-trade"
        data-active={pathname.startsWith("/direct-trade")}
        className={menuItemsClx}
      >
        Direct Trade
      </Link>
      <Link
        href="/portfolio"
        data-active={pathname.startsWith("/portfolio")}
        className={menuItemsClx}
      >
        Portfolio
      </Link>
      <Link
        data-active={pathname.startsWith("/referrals")}
        href="/referrals"
        className={menuItemsClx}
      >
        Referrals
      </Link>
      <MoreMenu />
    </div>
  );
}
