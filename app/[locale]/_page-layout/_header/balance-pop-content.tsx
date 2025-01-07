import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { reportEvent } from "@/lib/utils/analytics";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { DepositDialog } from "./deposit-dialog";
import { WithdrawDialog } from "./withdraw-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsdcTokenBalance } from "@/lib/hooks/api/use-usdc-balance";

export default function BalancePopContent() {
  const T = useTranslations("Header");

  const { address, disconnect } = useChainWallet();
  const [balanceHover, setBalanceHover] = useState(false);

  const { data: balanceData, isLoading: isBalanceLoading } =
    useUsdcTokenBalance(address);
  const balance = balanceData?.usdc_balance || "0";

  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  function handleDisconnect() {
    reportEvent("disconnectWalletSuccess", { value: address.slice(-8) });
    disconnect();
  }

  function handleMouseEnter() {
    if (isBalanceLoading) return;
    setBalanceHover(true);
  }

  function handleMouseLeave() {
    setBalanceHover(false);
  }

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-start justify-between rounded-xl border border-border-black p-3"
      >
        <div>
          <div className="text-xs leading-[18px] text-gray">Balance</div>
          <div className="mt-1 flex max-w-[190px] items-center gap-x-2 ">
            {isBalanceLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <div className="truncate text-2xl leading-9 text-txt-white">
                {formatNum(balance)}
              </div>
            )}
            <Image
              src="/icons/withdraw.svg"
              alt="arrow-down"
              width={24}
              height={24}
              className={cn(
                "cursor-pointer",
                balanceHover ? "block" : "hidden",
              )}
              onClick={() => setWithdrawDialogOpen(true)}
            />
          </div>
        </div>
        <Image
          src="/icons/logout.svg"
          className="cursor-pointer"
          alt="close"
          width={24}
          height={24}
          onClick={handleDisconnect}
        />
      </div>

      <button
        className="mt-5 flex h-10 w-full items-center justify-center rounded-2xl bg-green text-sm leading-5 text-white"
        onClick={() => setDepositDialogOpen(true)}
      >
        {T("btn-Deposit")}
      </button>

      <DepositDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
      />
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        balance={balance}
      />
    </>
  );
}
