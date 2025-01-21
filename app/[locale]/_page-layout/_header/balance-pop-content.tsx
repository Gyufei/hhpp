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
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { UserProfileDialogOpen } from "@/lib/states/user";
import { useSetAtom } from "jotai";

export default function BalancePopContent() {
  const T = useTranslations("Common");
  const setShowProDialog = useSetAtom(UserProfileDialogOpen);

  const { disconnect } = useChainWallet();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";
  const [balanceHover, setBalanceHover] = useState(false);

  const {
    data: balanceData,
    isLoading,
    isValidating,
  } = useUsdcTokenBalance(address);

  const balance = balanceData?.usdc_balance || "0";

  const isBalanceLoading = isLoading || isValidating;

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

  function handleProfileClick() {
    setShowProDialog(true);
  }

  return (
    <>
      <div className="flex items-center justify-between text-xs leading-[18px]">
        <div className="text-title-white">{accountInfo?.user_name}</div>
        <div
          onClick={handleProfileClick}
          className="cursor-pointer text-main hover:text-main-hover"
        >
          {T("EditProfile")}
        </div>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-start justify-between rounded border border-dashed border-border-black p-[10px]"
      >
        <div className="flex flex-col">
          <div className="text-xs leading-[18px] text-gray">Balance</div>
          <div className="mt-1 flex max-w-[160px] items-center gap-x-[5px] ">
            {isBalanceLoading ? (
              <Skeleton className="my-2 h-[22px] w-14" />
            ) : (
              <div className="truncate text-[20px] leading-[30px] text-title-white">
                {formatNum(balance)}
              </div>
            )}
            <Image
              src="/icons/withdraw.svg"
              alt="arrow-down"
              width={20}
              height={20}
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
          width={20}
          height={20}
          onClick={handleDisconnect}
        />
      </div>

      <button
        className="mt-5 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black outline-none hover:bg-main-hover"
        onClick={() => setDepositDialogOpen(true)}
      >
        {T("Deposit")}
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
