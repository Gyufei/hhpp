"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useWalletModalContext } from "../provider/wallet-modal-provider";
import { EvmWallets } from "./evm-wallets";

export default function WalletsModal() {
  const { isWalletModalOpen, openWalletModal } = useWalletModalContext();

  return (
    <Dialog
      open={isWalletModalOpen}
      onOpenChange={(isOpen) => openWalletModal(isOpen)}
    >
      <VisuallyHidden asChild>
        <DialogTitle>Connect Wallet</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[400px] flex-col items-center gap-0 rounded-3xl border-none bg-bg-black p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <div className="flex text-xl capitalize leading-[30px] text-txt-white">
          Connect Wallet
        </div>
        <EvmWallets onSelected={() => openWalletModal(false)} />
      </DialogContent>
    </Dialog>
  );
}
