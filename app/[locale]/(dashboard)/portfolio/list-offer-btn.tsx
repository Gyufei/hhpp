import Image from "next/image";
import { useState } from "react";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { SellContent } from "@/app/[locale]/direct-trade/[...name]/create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
          <VisuallyHidden asChild>
            <DialogTitle>List</DialogTitle>
          </VisuallyHidden>
          <DialogContent
            showClose={false}
            className="flex w-[480px] flex-col items-center justify-stretch gap-0 rounded border border-border-black bg-bg-black p-0"
            aria-describedby={undefined}
          >
            <div className="flex w-full items-center justify-between border-b border-border-black px-5 py-4">
              <div className="flex items-center space-x-[10px]">
                <div className="text-[18px] leading-[28px] text-title-white">
                  {T("cap-List")}
                </div>
              </div>
              <Image
                src="/icons/close.svg"
                width={24}
                height={24}
                alt="close"
                className="cursor-pointer"
                onClick={() => setDrawerOpen(false)}
              />
            </div>

            <SellContent onSuccess={handleSuccess} marketplace={marketplace} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
