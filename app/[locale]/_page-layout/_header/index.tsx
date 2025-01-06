"use client";
import Image from "next/image";
import ConnectBtn from "./connect-btn";
import NavigationBtns from "./navigation-btns";
import MessageBtn from "./message-btn";
import MobileRouterMenu from "./mobile-router-menu";
import Link from "next/link";
import { usePathname } from "@/app/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMarketItemPage = /\/marketplace\/[a-zA-Z]+/.test(pathname);

  if (isHome) {
    return <></>;
  }

  return (
    <>
      <MobileLogo />
      <div className="flex h-14 items-center justify-between  px-4 py-2 sm:h-24 sm:px-6 sm:py-6">
        {/* pc */}
        <NavigationBtns />
        <Logo />
        <div className="hidden flex-1 items-center justify-end space-x-4 sm:flex md:space-x-4">
          <ConnectBtn />
          <MessageBtn />
        </div>

        {/* Mobile */}
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <MobileRouterMenu />
          <div
            className="flex items-center justify-between space-x-3"
            style={{
              paddingRight: isMarketItemPage ? "52px" : "0",
            }}
          >
            <MessageBtn />
            <ConnectBtn />
          </div>
        </div>
      </div>
    </>
  );
}

function MobileLogo() {
  return (
    <Link href="/">
      <div className="flex h-11 cursor-pointer items-center justify-center sm:hidden">
        <div className="flex h-6 w-[70px] items-center justify-center rounded-full bg-yellow">
          <Image src="/icons/logo.svg" alt="logo" width={37.5} height={10} />
        </div>
      </div>
    </Link>
  );
}

function Logo() {
  return (
    <Link href="/">
      <div className="mx-4 hidden flex-1 cursor-pointer items-center justify-center justify-self-center sm:flex">
        <Image src="/icons/logo.svg" alt="logo" width={150} height={30} />
      </div>
    </Link>
  );
}
