"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useState } from "react";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useWalletModalContext } from "@/components/provider/wallet-modal-provider";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BalancePopContent from "./balance-pop-content";
import { useAccountEffect, useSignMessage } from "wagmi";
import { isProduction } from "@/lib/PathMap";
import HoverIcon from "@/components/share/hover-icon";

const SignMessageKey = "hypes-trade-sign-message";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectBtn() {
  const t = useTranslations("Header");

  const { signMessage } = useSignMessage();
  const { isMobileSize } = useDeviceSize();
  const { openWalletModal } = useWalletModalContext();
  const { shortAddr, connected, connecting } = useChainWallet();

  const [popOpen, setPopOpen] = useState(false);

  function handleConnect() {
    openWalletModal(true);
  }

  useAccountEffect({
    onConnect() {
      if (!isProduction) return;

      signMessage(
        { message: "Hello, Welcome to HypesTrade!" },
        {
          onSuccess(data) {
            localStorage.setItem(SignMessageKey, data);
          },
          onError(error) {
            console.log("Error!", error);
          },
        },
      );
    },
    onDisconnect() {
      localStorage.removeItem("hyper-trade-sign-message");
      localStorage.removeItem(SignMessageKey);
    },
  });

  if (!connected) {
    if (isMobileSize) {
      return (
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-black bg-bg-black "
          onClick={() => handleConnect()}
        >
          <Image src="/icons/wallet.svg" width={20} height={20} alt="wallet" />
        </button>
      );
    }

    return (
      <>
        <button
          className="hover:bg-main-hover h-10 rounded bg-[#f0f1f5] bg-main px-4 text-xs leading-6 text-bg-black transition-all sm:h-9 sm:px-[10px]"
          onClick={() => handleConnect()}
        >
          <span>{t("btn-Connect")}</span>
        </button>
      </>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-[5px]">
          <div className="flex items-center text-xs leading-[18px] text-title-white hover:text-main">
            {!shortAddr || connecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
            )}
          </div>
          <HoverIcon
            src="/icons/arrow-down.svg"
            hoverSrc="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow-down"
            className={`${popOpen ? "rotate-180" : ""}`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[276px] flex-col items-stretch space-y-[10px] border-border-black bg-bg-black p-[10px] text-[12px]"
        align="end"
      >
        <BalancePopContent />
      </PopoverContent>
    </Popover>
  );
}
