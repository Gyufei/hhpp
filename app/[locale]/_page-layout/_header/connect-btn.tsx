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

const SignMessageKey = "hyper-trade-sign-message";

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
        { message: "Hello, Welcome to HyperTrade!" },
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
      localStorage.removeItem(SignMessageKey);
    },
  });

  if (!connected) {
    if (isMobileSize) {
      return (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d3d4d6] bg-white "
          onClick={() => handleConnect()}
        >
          <Image src="/icons/wallet.svg" width={20} height={20} alt="wallet" />
        </button>
      );
    }

    return (
      <>
        <button
          className="shadow-25 h-10 rounded-full bg-[#f0f1f5] px-4 text-base leading-6 transition-all sm:h-12 sm:px-[22px]"
          onClick={() => handleConnect()}
        >
          <span className="hidden sm:inline-block">
            {t("btn-ConnectWallet")}
          </span>
          <span className="inline-block sm:hidden">{t("btn-Connect")}</span>
        </button>
      </>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="shadow-25 h-10 rounded-full border border-[#d3d4d6] px-6 text-base leading-6 text-black transition-all hover:border-transparent hover:bg-yellow sm:h-12">
          <div className="flex items-center">
            {!shortAddr || connecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[288px] flex-col items-stretch space-y-2 border-none bg-white p-6 text-[12px] text-[#2D2E33]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        align="end"
      >
        <BalancePopContent />
      </PopoverContent>
    </Popover>
  );
}
