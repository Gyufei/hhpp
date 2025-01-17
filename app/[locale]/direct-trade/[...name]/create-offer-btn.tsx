import { useState } from "react";
import { SellContent } from "./create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";
import DrawerTitle from "@/components/share/drawer-title";
import Drawer from "react-modern-drawer";

export default function CreateOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("Offer");
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSuccess() {
    setDrawerOpen(false);
    onSuccess();
  }

  return (
    <>
      <WithWalletConnectBtn
        chain={marketplace.chain}
        className="w-full text-right sm:text-center"
        onClick={() => {
          setDrawerOpen(true);
          reportEvent("click", { value: "createOffer" });
        }}
      >
        <button className="h-10 w-[160px] items-center justify-center rounded bg-[#97FCE4] bg-main text-[14px] leading-5 text-bg-black hover:bg-main-hover sm:flex sm:h-8 sm:w-full sm:text-[12px] sm:leading-4">
          {T("CreateOffer")}
        </button>
      </WithWalletConnectBtn>
      {drawerOpen && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          direction="right"
          size={500}
          className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-4 sm:p-0"
        >
          <DrawerTitle
            title={T("CreateOffer")}
            onClose={() => setDrawerOpen(false)}
          />

          <SellContent onSuccess={handleSuccess} marketplace={marketplace} />
        </Drawer>
      )}
    </>
  );
}
