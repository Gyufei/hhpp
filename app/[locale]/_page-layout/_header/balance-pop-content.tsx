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
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { UserProfileDialogOpen } from "@/lib/states/user";
import { useSetAtom } from "jotai";
import { useUserStats } from "@/lib/hooks/api/use-user-stats";
import { IUserBalance, useUserBalance } from "@/lib/hooks/api/use-user-balance";

export default function BalancePopContent() {
  const T = useTranslations("Common");
  const setShowProDialog = useSetAtom(UserProfileDialogOpen);

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: accountStat } = useUserStats();

  const { disconnect } = useChainWallet();

  const {
    data: tokenBalances,
    isLoading,
    isValidating,
    mutate,
  } = useUserBalance(address);

  const [targetBalance, setTargetBalance] = useState<IUserBalance | null>(null);

  const isBalanceLoading = isLoading || isValidating;

  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);

  function handleWithdraw(balance: IUserBalance) {
    setTargetBalance(balance);
    setWithdrawDialogOpen(true);
  }

  function handleCloseWithdrawDialog() {
    setWithdrawDialogOpen(false);
    setTargetBalance(null);
  }

  function handleDeposit(balance: IUserBalance) {
    setTargetBalance(balance);
    setDepositDialogOpen(true);
  }

  function handleCloseDepositDialog() {
    setDepositDialogOpen(false);
    setTargetBalance(null);
  }

  function handleDisconnect() {
    reportEvent("disconnectWalletSuccess", { value: address.slice(-8) });
    disconnect();
  }

  function handleProfileClick() {
    setShowProDialog(true);
  }

  return (
    <>
      <div className="flex items-center justify-between text-xs leading-[18px]">
        <div className="text-title-white">{accountStat?.user_name}</div>
        <div className="flex items-center gap-x-2">
          <div
            onClick={handleProfileClick}
            className="cursor-pointer text-main hover:text-main-hover"
          >
            {T("EditProfile")}
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
      </div>

      {isBalanceLoading ? (
        <>
          <Skeleton className="my-2 h-[22px]" />
          <Skeleton className="my-2 h-[22px]" />
        </>
      ) : (
        tokenBalances?.map((tokenBalance) => (
          <BalanceItem
            key={tokenBalance.token_address}
            isLoading={isBalanceLoading}
            tokenBalance={tokenBalance}
            onWithdraw={() => handleWithdraw(tokenBalance)}
            onDeposit={() => handleDeposit(tokenBalance)}
          />
        ))
      )}

      <DepositDialog
        tokenBalance={targetBalance!}
        open={depositDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseDepositDialog();
          }
        }}
        onSuccess={() => {
          mutate();
        }}
      />

      <WithdrawDialog
        tokenBalance={targetBalance!}
        open={withdrawDialogOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseWithdrawDialog();
          }
        }}
        onSuccess={() => {
          mutate();
        }}
      />
    </>
  );
}

function BalanceItem({
  tokenBalance,
  isLoading,
  onWithdraw,
  onDeposit,
}: {
  tokenBalance: IUserBalance;
  isLoading: boolean;
  onWithdraw: () => void;
  onDeposit: () => void;
}) {
  const T = useTranslations("Common");

  const [balanceHover, setBalanceHover] = useState(false);

  const { token } = tokenBalance || {};
  const balanceNum = tokenBalance.available_balance_num;

  function handleMouseEnter() {
    if (isLoading) return;
    setBalanceHover(true);
  }

  function handleMouseLeave() {
    setBalanceHover(false);
  }

  if (!tokenBalance) return null;

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-start justify-between rounded border border-dashed border-border-black p-[10px]"
      >
        <div className="flex flex-col">
          <div className="text-xs leading-[18px] text-gray">
            {token.symbol} Balance
          </div>
          <div className="mt-1 flex max-w-[160px] items-center gap-x-[5px] ">
            {isLoading ? (
              <Skeleton className="my-2 h-[22px] w-14" />
            ) : (
              <div className="truncate text-[20px] leading-[30px] text-title-white">
                {formatNum(balanceNum)}
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
              onClick={onWithdraw}
            />
          </div>
        </div>
      </div>

      <button
        className="mt-1 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black outline-none hover:bg-main-hover"
        onClick={onDeposit}
      >
        {T("Deposit")} {token.symbol}
      </button>
    </>
  );
}
