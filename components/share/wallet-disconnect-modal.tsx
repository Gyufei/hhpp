"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useWalletModalContext } from "../provider/wallet-modal-provider";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { reportEvent } from "@/lib/utils/analytics";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function WalletDisconnectModal() {
  const { isWalletDisconnectModalOpen, openDisconnectModal } =
    useWalletModalContext();

  const { address, disconnect } = useChainWallet();

  const handleDisconnect = () => {
    openDisconnectModal(false);
    reportEvent("disconnectWalletSuccess", { value: address.slice(-8) });
    disconnect();
  };

  return (
    <>
      <Dialog
        open={isWalletDisconnectModalOpen}
        onOpenChange={(isOpen) => {
          openDisconnectModal(isOpen);
        }}
      >
        <VisuallyHidden asChild>
          <DialogTitle>Disconnect Wallet</DialogTitle>
        </VisuallyHidden>
        <DialogContent
          showClose={false}
          className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
          aria-describedby={undefined}
        >
          <SignOutBtn logout={handleDisconnect} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function SignOutBtn({ logout }: { logout: () => void }) {
  const t = useTranslations("Header");

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-black">
        {t("cap-YouAreSignedIn")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-black"></div>
      <div className="mt-10 w-full">
        <button
          onClick={logout}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-red bg-white text-red hover:bg-red hover:text-white"
        >
          {t("btn-SignOut")}
        </button>
      </div>
    </>
  );
}
