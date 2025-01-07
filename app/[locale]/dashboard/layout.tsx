"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import PageFooter from "../_page-layout/_page-footer";
import MobilePageFooter, {
  IMobilePanel,
} from "../_page-layout/_page-footer/page-footer-mobile";
import MenuCol from "./menu-col";
import OverviewInfo from "./overview-info";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isMobileSize } = useDeviceSize();
  const pt = useTranslations("menu-Dashboard");
  const router = useRouter();
  const pathname = usePathname();

  const mobilePanels: Array<IMobilePanel> = useMemo(
    () => [
      {
        name: "orders",
        icon: "/icons/menus.svg",
        label: pt("cap-Orders"),
      },
      {
        name: "holdings",
        icon: "/icons/holdings.svg",
        label: pt("cap-Holdings"),
      },
      {
        name: "balances",
        icon: "/icons/wallet.svg",
        label: pt("cap-Balances"),
      },
      {
        name: "referral",
        icon: "/icons/referral-system.svg",
        label: pt("cap-Referral"),
      },
      {
        name: "Overview",
        icon: "/icons/overview.svg",
        label: pt("cap-Overview"),
      },
    ],
    [pt],
  );
  const [activePanel, setActivePanel] = useState(
    pathname.split("/").pop() || mobilePanels[0].name,
  );

  function checkIsActive(name: string) {
    if (!isMobileSize) return true;

    return activePanel === name;
  }

  function handleClickMenuItem(pn: string) {
    setActivePanel(pn);

    if (pn === "Overview") {
      return;
    }

    const hrefMap = {
      orders: "/dashboard/orders",
      holdings: "/dashboard/holdings",
      balances: "/dashboard/balances",
      referral: "/dashboard/referral",
    };

    router.push((hrefMap as any)[pn]);
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <div className="flex flex-1 items-stretch overflow-y-auto">
        {!(isMobileSize && checkIsActive("Overview")) && (
          <div className="ml-0 flex flex-1 rounded-none bg-bg-black sm:ml-4 sm:rounded-3xl sm:p-5">
            <MenuCol />
            {children}
          </div>
        )}
        {checkIsActive("Overview") && (
          <div className="w-full sm:w-[368px]">
            <OverviewInfo />
          </div>
        )}
      </div>
      <PageFooter className="hidden sm:flex" />
      <MobilePageFooter
        panels={mobilePanels}
        activePanel={activePanel}
        setActivePanel={handleClickMenuItem}
      />
    </div>
  );
}
