"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { usePathname, useRouter } from "@/app/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import PageFooter from "@/app/[locale]/_page-layout/_page-footer";

export default function MobileRouterMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="block sm:hidden">
      <button
        data-show={showMenu ? true : false}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#303030] bg-bg-black transition-all data-[show=true]:border-black"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <X className="h-4 w-4" />
        ) : (
          <div className="flex flex-col space-y-[5.5px]">
            <Image
              src="/icons/line-menu.svg"
              width={18}
              height={18}
              alt="menu"
            />
          </div>
        )}
      </button>
      {showMenu && <MenuList onEnd={() => setShowMenu(false)} />}
    </div>
  );
}

function MenuList({ onEnd }: { onEnd: () => void }) {
  const t = useTranslations("Header");
  const router = useRouter();
  const routePath = [`/dashboard`, `/marketplace`];
  const currentRoute = usePathname();

  const isDashboardActive = currentRoute.includes(routePath[0]);
  const isMarketplaceActive = currentRoute.includes(routePath[1]);

  const handleClick = (r: string) => {
    if (currentRoute === r) {
      onEnd();
      return;
    }

    router.push(r);
    onEnd();
  };

  return (
    <div className="fixed left-0 top-[100px] z-10 h-[calc(100vh-100px)] w-screen bg-bg-black p-4">
      <div
        data-active={isDashboardActive}
        className="mb-2 flex items-center space-x-3 py-3 data-[active=true]:opacity-50"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/dashboard")}
      >
        <Image
          src={
            isDashboardActive ? "/icons/dashboard.svg" : "/icons/dashboard.svg"
          }
          width={40}
          height={40}
          alt="pools"
        />
        <div className="text-lg leading-5 text-txt-white">{t("btn-Dashboard")}</div>
      </div>
      <div
        data-active={isMarketplaceActive}
        className="mb-2 flex items-center justify-between py-3 data-[active=true]:opacity-50"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/marketplace")}
      >
        <div className="flex items-center justify-start space-x-3">
          <Image
            src={
              isMarketplaceActive
                ? "/icons/Marketplace.svg"
                : "/icons/Marketplace.svg"
            }
            width={40}
            height={40}
            alt="governance"
          />
          <div className="text-lg leading-5 text-txt-white">
            {t("btn-Marketplace")}
          </div>
        </div>
      </div>
      <PageFooter className="fixed bottom-0 left-0 w-screen" />
    </div>
  );
}
