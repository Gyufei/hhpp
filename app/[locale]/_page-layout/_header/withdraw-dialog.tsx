import Image from "next/image";
import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NumericalInput } from "@/components/share/numerical-input";
import { useEffect, useState } from "react";
import { formatNum } from "@/lib/utils/number";
import { useUserWithdraw } from "@/lib/hooks/contract/use-user-withdraw";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";

export function WithdrawDialog({
  open,
  onOpenChange,
  balance,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  balance: string;
}) {
  const T = useTranslations("Header");
  const CT = useTranslations("Common");

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

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

    triggerWithdraw({ amount: withdrawAmount });
  }

  useEffect(() => {
    if (Number(withdrawAmount) > Number(balance)) {
      setWithdrawError("Withdraw amount is greater than balance");
      return;
    }

    setWithdrawError(null);
  }, [withdrawAmount, balance]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      setGlobalMessage({
        type: "success",
        message: "Withdrawal successful",
      });
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <VisuallyHidden asChild>
        <DialogTitle>Withdraw Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <div className="relative flex w-full items-center justify-between border-b border-border-black px-5 py-[10px]">
          <div className="text-[18px] leading-[28px] text-title-white">
            {T("btn-Withdraw")}
          </div>
          <Image
            onClick={() => onOpenChange(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="cursor-pointer rounded-full"
          />
        </div>

        <div className="relative w-full border-b border-border-black p-5">
          <NumericalInput
            data-error={!!withdrawError}
            value={withdrawAmount}
            onUserInput={(value) => setWithdrawAmount(value)}
            placeholder="Enter amount"
            className="h-12 w-full rounded border border-border-black py-3 pl-[10px] pr-[75px] text-base leading-6 text-title-white focus:border-txt-white data-[error=true]:!border-red"
          />
          <div className="absolute right-[30px] top-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            Max: {formatNum(balance)}
          </div>
        </div>

        <div className="w-full px-5 py-[15px]">
          <button
            disabled={!!withdrawError || isMutating}
            onClick={handleConfirmWithdraw}
            className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:bg-main-inactive"
          >
            {CT("btn-Confirm")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
