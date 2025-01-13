import Image from "next/image";
import { useState } from "react";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { SellContent } from "./create-offer/sell-content";
import { IMarketplace } from "@/lib/types/marketplace";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
        className="w-full "
        onClick={() => {
          checkAndSwitchChain();
          setDrawerOpen(true);
          reportEvent("click", { value: "createOffer" });
        }}
      >
        <button className="hidden h-8 w-full items-center justify-center rounded bg-[#97FCE4] bg-main text-[12px] leading-4 text-bg-black hover:bg-main-hover sm:flex">
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
        <Dialog
          open={drawerOpen}
          onOpenChange={(isOpen) => setDrawerOpen(isOpen)}
        >
          <VisuallyHidden asChild>
            <DialogTitle>Create Offer</DialogTitle>
          </VisuallyHidden>
          <DialogContent
            showClose={false}
            className="flex w-[480px] flex-col items-center justify-stretch gap-0 rounded border border-border-black bg-bg-black p-0"
            aria-describedby={undefined}
          >
            <div className="flex w-full items-center justify-between border-b border-border-black px-5 py-4">
              <div className="flex items-center space-x-[10px]">
                <div className="text-[18px] leading-[28px] text-title-white">
                  {T("cap-CreateOffer")}
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
