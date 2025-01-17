"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useRef, useState } from "react";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useWalletModalContext } from "@/components/provider/wallet-modal-provider";
import * as Sentry from "@sentry/nextjs";

import BalancePopContent from "./balance-pop-content";
import { useAccountEffect, useSignMessage } from "wagmi";
import HoverIcon from "@/components/share/hover-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

const SignMessageKey = "hypes-trade-sign-message";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectBtn() {
  const T = useTranslations("Header");

  const { signMessage } = useSignMessage();
  const { isMobileSize } = useDeviceSize();
  const { openWalletModal } = useWalletModalContext();
  const { shortAddr, connected, connecting } = useChainWallet();
  const { checkAndSwitchChain } = useCheckSwitchChain();

  const [popOpen, setPopOpen] = useState(false);
  const balancePopRef = useRef<{
    refetchBalance: () => void;
  }>(null);

  function handleConnect() {
    openWalletModal(true);
  }

  useAccountEffect({
    onConnect({ address, connector }) {
      const userToken = localStorage.getItem(SignMessageKey);
      if (userToken) {
        checkAndSwitchChain();
        return;
      }

      signMessage(
        { message: "Hello, Welcome to HypesTrade!" },
        {
          onSuccess(data) {
            localStorage.setItem(SignMessageKey, data);
            checkAndSwitchChain();
          },
          onError(error) {
            console.log("Error!", error);
          },
        },
      );

      try {
        Sentry.setUser({
          username: address,
        });
        Sentry.setTag("connectWallet", (connector as any)?.rkDetails?.name);
        Sentry.setTag(
          "client_px",
          document?.documentElement?.clientWidth +
            "*" +
            document?.documentElement?.clientHeight,
        );
      } catch (error) {
        console.error("Error!", error);
      }
    },
    onDisconnect() {
      localStorage.removeItem("hyper-trade-sign-message");
      localStorage.removeItem(SignMessageKey);
    },
  });

  function handleOpenBalancePop(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!connected) return;
    setPopOpen(true);
  }

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
          className="h-10 rounded bg-[#f0f1f5] bg-main px-4 text-xs leading-6 text-bg-black transition-all hover:bg-main-hover sm:h-9 sm:px-[10px]"
          onClick={() => handleConnect()}
        >
          <span>{T("Connect")}</span>
        </button>
      </>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          onClick={handleOpenBalancePop}
          className="flex cursor-pointer items-center gap-[5px]"
        >
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
        {/* <button onClick={() => checkAndSwitchChain()}>111</button> */}
        <BalancePopContent ref={balancePopRef} />
      </PopoverContent>
    </Popover>
  );
}
