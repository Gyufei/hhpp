"use client";
import { Link, usePathname } from "@/i18n/routing";
import MoreMenu from "./more-menu";
import Image from "next/image";
import Logo from "./logo";
import { useState } from "react";
import { cn } from "@/lib/utils/common";
import Setting from "./setting";
import LanguageSetting from "./language-setting";

const menuItemsClx =
  "flex h-10 items-center px-[10px] cursor-pointer text-xs text-title-white data-[active=true]:text-main hover:text-main";

export default function NavigationBtns() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const LinkList = [
    {
      title: "Curve Trade",
      href: "/curve-trade",
    },
    {
      title: "Direct Trade",
      href: "/direct-trade",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
    },
    {
      title: "Referrals",
      href: "/referrals",
    },
  ];

  return (
    <>
      {/* desktop */}
      <div className="hidden items-center space-x-[30px] text-title-white sm:flex">
        {LinkList.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-active={pathname.startsWith(item.href)}
            className={menuItemsClx}
          >
            {item.title}
          </Link>
        ))}
        <MoreMenu />
      </div>

      {/* mobile */}
      <Image
        src="/icons/h-menu.svg"
        width={24}
        height={24}
        alt="menu"
        className="mr-[10px] cursor-pointer sm:hidden"
        onClick={() => setDrawerOpen(true)}
      />

      {drawerOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-bg-black sm:hidden">
          <div className="flex items-center justify-between border-b border-border-black px-[10px] py-[14px]">
            <Logo />
            <Image
              src="/icons/close.svg"
              width={24}
              height={24}
              alt="close"
              className="cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
          <div className="flex flex-col">
            {LinkList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={pathname.startsWith(item.href)}
                className={cn(menuItemsClx, "h-12 px-5 text-[18px]")}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mx-5 my-[10px] h-1 border-b border-border-black"></div>
          <MoreMenu />
          <div className="mx-5 my-[10px] h-1 border-b border-border-black"></div>
          <Setting />
          <LanguageSetting />
        </div>
      )}
    </>
  );
}
