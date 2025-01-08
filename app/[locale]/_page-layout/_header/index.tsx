"use client";
import ConnectBtn from "./connect-btn";
import NavigationBtns from "./navigation-btns";
import MessageBtn from "./message-btn";
import MobileRouterMenu from "./mobile-router-menu";
import { usePathname } from "@/i18n/routing";
import Logo from "./logo";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <></>;
  }

  return (
    <>
      <div className="flex h-14 items-center justify-between px-4 py-2 sm:h-24 sm:px-[10px] sm:py-6">
        {/* pc */}
        <div className="flex items-center justify-start space-x-[30px]">
          <Logo />
          <NavigationBtns />
        </div>
        <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex md:space-x-4">
          <ConnectBtn />
          <MessageBtn />
        </div>

        {/* Mobile */}
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <MobileRouterMenu />
          <div className="flex items-center justify-between space-x-3">
            <MessageBtn />
            <ConnectBtn />
          </div>
        </div>
      </div>
    </>
  );
}
