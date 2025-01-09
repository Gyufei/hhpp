import Image from "next/image";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import { useState, useRef } from "react";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SellContent } from "./create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import { reportEvent } from "@/lib/utils/analytics";

export default function CreateOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const { isMobileSize } = useDeviceSize();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("sell");
  const hasReportedSuccessRef = useRef(false);
  const { checkAndSwitchChain } = useCheckSwitchChain();

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  function handleSuccess() {
    if (!hasReportedSuccessRef.current) {
      hasReportedSuccessRef.current = true;
      reportEvent("createOfferSuccess", { value: currentTab });
      handleCloseDrawer();
      onSuccess();
    }
  }

  const isJustSell = marketplace?.market_catagory === "offchain_fungible_point";

  return (
    <>
      <WithWalletConnectBtn
        chain={marketplace.chain}
        className="w-full "
        onClick={() => {
          checkAndSwitchChain();
          setDrawerOpen(true);
          hasReportedSuccessRef.current = false;
          reportEvent("click", { value: "createOffer" });
        }}
      >
        <button className="hidden h-8 w-full items-center justify-center rounded-xl bg-[#97FCE4] bg-main text-[12px] leading-4 text-bg-black sm:flex">
          {T("btn-CreateOffer")}
        </button>
        <button className="absolute -top-[49px] right-[10px] flex h-10 w-10 items-center justify-center rounded-lg bg-main sm:hidden">
          <Image
            src="/icons/plus-black.svg"
            width={30}
            height={30}
            alt="create"
          />
        </button>
      </WithWalletConnectBtn>
      {drawerOpen && (
        <Drawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          direction={isMobileSize ? "bottom" : "right"}
          size={isMobileSize ? "calc(100vh - 44px)" : 500}
          className="flex flex-col overflow-y-auto rounded-none !bg-bg-black p-4 sm:rounded-l-2xl sm:p-6"
        >
          {isMobileSize ? (
            <MobileDrawerTitle
              title={T("cap-CreateMakerOffer")}
              onClose={handleCloseDrawer}
            />
          ) : (
            <DrawerTitle
              title={T("cap-CreateMakerOffer")}
              onClose={handleCloseDrawer}
            />
          )}

          <Tabs
            value={currentTab}
            className="flex flex-1 flex-col"
            onValueChange={setCurrentTab}
          >
            <TabsContent
              value="sell"
              className="flex flex-1 flex-col data-[state=inactive]:hidden"
              forceMount={true}
            >
              <SellContent
                className={isJustSell ? "mt-0" : ""}
                onSuccess={handleSuccess}
                marketplace={marketplace}
              />
            </TabsContent>
          </Tabs>
        </Drawer>
      )}
    </>
  );
}
