import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { NumericalInput } from "@/components/share/numerical-input";
import { useEffect, useState } from "react";
import { formatNum } from "@/lib/utils/number";
import { IUserBalance } from "@/lib/hooks/api/use-user-balance";
import { useUserDeposit } from "@/lib/hooks/contract/use-user-deposit";
import { toast } from "react-hot-toast";
import NP from "number-precision";
import { cn } from "@/lib/utils";

export function DepositDialog({
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
  const tokenBalanceNum = useTokenBalance({
    abiAddress: token?.address,
    decimals: token?.decimals,
  });

  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositError, setDepositError] = useState<string | null>(null);

  const {
    trigger: triggerDeposit,
    isMutating,
    data: isSuccess,
  } = useUserDeposit();

  function handleConfirmDeposit() {
    if (depositError) return;

    if (!Number(depositAmount)) {
      setDepositError("Deposit amount is not a number");
      return;
    }

    if (Number(depositAmount) > Number(tokenBalanceNum)) {
      setDepositError("Deposit amount is greater than balance");
      return;
    }

    const amount = NP.times(depositAmount, 10 ** token.decimals);

    triggerDeposit({ token_address: token?.address, amount: String(amount) });
  }

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      toast.success("Withdrawal successful");
      onSuccess();
    }
  }, [isSuccess]);

  function handleToggleOpen(isOpen: boolean) {
    if (isOpen) {
      setDepositAmount("");
      setDepositError(null);
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
        <DialogTitle>{T("Deposit")}</DialogTitle>

        <div className="relative w-full border-b border-border-black p-5">
          <NumericalInput
            data-error={!!depositError}
            value={depositAmount}
            onUserInput={(value) => setDepositAmount(value)}
            placeholder="Enter amount"
            className="h-12 w-full rounded border border-border-black py-3 pl-[10px] pr-[75px] text-base leading-6 text-title-white focus:border-txt-white data-[error=true]:!border-red"
          />
          <div className="absolute right-[30px] top-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            Max: {formatNum(tokenBalanceNum || "0")}
          </div>
        </div>

        <div className="w-full px-5 py-[15px]">
          <button
            disabled={!!depositError || isMutating}
            onClick={handleConfirmDeposit}
            className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:bg-main-inactive"
          >
            {CT("Confirm")}
          </button>
          <div
            className={cn(
              "w-full rounded p-1 text-center text-xs leading-[18px] text-red",
              depositError ? "block" : "hidden",
            )}
          >
            {depositError}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
