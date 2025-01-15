import { useState } from "react";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { SellContent } from "@/app/[locale]/direct-trade/[...name]/create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { reportEvent } from "@/lib/utils/analytics";

export default function ListOfferBtn({
  marketplace,
  onSuccess,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
}) {
  const T = useTranslations("drawer-CreateOffer");
  const TB = useTranslations("page-MyBalances");
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
        className="flex w-fit"
        onClick={() => {
          checkAndSwitchChain();
          setDrawerOpen(true);
          reportEvent("click", { value: "createOffer" });
        }}
      >
        <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] hover:border-[#50D2C1] hover:text-[#50D2C1]">
          {TB("th-List")}
        </div>
      </WithWalletConnectBtn>
      {drawerOpen && (
        <Dialog
          open={drawerOpen}
          onOpenChange={(isOpen: boolean) => setDrawerOpen(isOpen)}
        >
          <DialogContent
            className="flex w-[480px] flex-col items-center justify-stretch gap-0 rounded border border-border-black bg-bg-black p-0"
            aria-describedby={undefined}
          >
            <DialogTitle>{T("cap-List")}</DialogTitle>

            <SellContent onSuccess={handleSuccess} marketplace={marketplace} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
