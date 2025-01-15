import { useState } from "react";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { SellContent } from "./create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function CreateOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { checkAndSwitchChain } = useCheckSwitchChain();

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
          checkAndSwitchChain();
          setDrawerOpen(true);
          reportEvent("click", { value: "createOffer" });
        }}
      >
        <button className="h-10 w-[160px] items-center justify-center rounded bg-[#97FCE4] bg-main text-[14px] leading-5 text-bg-black hover:bg-main-hover sm:flex sm:h-8 sm:w-full sm:text-[12px] sm:leading-4">
          {T("btn-CreateOffer")}
        </button>
      </WithWalletConnectBtn>
      {drawerOpen && (
        <Dialog
          open={drawerOpen}
          onOpenChange={(isOpen) => setDrawerOpen(isOpen)}
        >
          <DialogContent
            className="flex w-[480px] flex-col items-center justify-stretch gap-0 rounded border border-border-black bg-bg-black p-0"
            aria-describedby={undefined}
          >
            <DialogTitle>Create Offer</DialogTitle>

            <SellContent onSuccess={handleSuccess} marketplace={marketplace} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
