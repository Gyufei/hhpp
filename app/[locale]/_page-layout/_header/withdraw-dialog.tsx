import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { NumericalInput } from "@/components/share/numerical-input";
import { useEffect, useState } from "react";
import { formatNum } from "@/lib/utils/number";
import { useUserWithdraw } from "@/lib/hooks/contract/use-user-withdraw";
import { toast } from "react-hot-toast";
import { IUserBalance } from "@/lib/hooks/api/use-user-balance";
import NP from "number-precision";
import { cn } from "@/lib/utils";

export function WithdrawDialog({
  tokenBalance,
  open,
  onOpenChange,
  onSuccess,
}: {
  tokenBalance: IUserBalance;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}) {
  const T = useTranslations("Common");
  const CT = useTranslations("Common");

  const { token } = tokenBalance || {};
  const balanceNum = tokenBalance?.available_balance_num;

  const {
    trigger: triggerWithdraw,
    isMutating,
    data: isSuccess,
  } = useUserWithdraw();

  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  function handleConfirmWithdraw() {
    if (withdrawError) return;
    if (!Number(withdrawAmount)) {
      setWithdrawError("Withdraw amount is not a number");
      return;
    }

    const amount = NP.times(withdrawAmount, 10 ** token.decimals);

    triggerWithdraw({ token_address: token.address, amount: String(amount) });
  }

  useEffect(() => {
    if (Number(withdrawAmount) > Number(balanceNum)) {
      setWithdrawError("Withdraw amount is greater than balance");
      return;
    }

    setWithdrawError(null);
  }, [withdrawAmount, balanceNum]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      toast.success("Withdrawal successful");
      onSuccess();
    }
  }, [isSuccess]);

  function handleToggleOpen(isOpen: boolean) {
    if (isOpen) {
      setWithdrawAmount("");
      setWithdrawError(null);
    }
    onOpenChange(isOpen);
  }

  if (!token) return null;

  return (
    <Dialog open={open} onOpenChange={handleToggleOpen}>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <DialogTitle>{T("Withdraw")}</DialogTitle>

        <div className="relative w-full border-b border-border-black p-5">
          <NumericalInput
            data-error={!!withdrawError}
            value={withdrawAmount}
            onUserInput={(value) => setWithdrawAmount(value)}
            placeholder="Enter amount"
            className="h-12 w-full rounded border border-border-black py-3 pl-[10px] pr-[75px] text-base leading-6 text-title-white focus:border-txt-white data-[error=true]:!border-red"
          />
          <div className="absolute right-[30px] top-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            Max: {formatNum(balanceNum)}
          </div>
        </div>

        <div className="w-full px-5 py-[15px]">
          <button
            disabled={!!withdrawError || isMutating}
            onClick={handleConfirmWithdraw}
            className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:bg-main-inactive"
          >
            {CT("Confirm")}
          </button>
          <div
            className={cn(
              "w-full rounded p-1 text-center text-xs leading-[18px] text-red",
              withdrawError ? "block" : "hidden",
            )}
          >
            {withdrawError}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
