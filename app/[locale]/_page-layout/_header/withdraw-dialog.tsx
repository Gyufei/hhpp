import Image from "next/image";
import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NumericalInput } from "@/components/share/numerical-input";
import { useEffect, useState } from "react";
import { formatNum } from "@/lib/utils/number";

export function WithdrawDialog({
  open,
  onOpenChange,
  balance,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  balance: number;
}) {
  const T = useTranslations("Header");
  const CT = useTranslations("Common");

  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  function handleConfirmWithdraw() {
    if (withdrawError) return;
    if (!withdrawAmount) return;

    console.log("handleConfirmWithdraw", withdrawAmount);
  }

  useEffect(() => {
    if (Number(withdrawAmount) > balance) {
      setWithdrawError("Withdraw amount is greater than balance");
      return;
    }

    setWithdrawError(null);
  }, [withdrawAmount, balance]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <VisuallyHidden asChild>
        <DialogTitle>Withdraw Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <div className="relative flex w-full items-center justify-center">
          <div className="text-xl leading-[30px] text-black">
            {T("btn-Withdraw")}
          </div>
          <Image
            onClick={() => onOpenChange(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="absolute right-0 top-1 cursor-pointer rounded-full hover:bg-yellow"
          />
        </div>

        <div className="relative mt-5 w-full">
          <NumericalInput
            data-error={!!withdrawError}
            value={withdrawAmount}
            onUserInput={(value) => setWithdrawAmount(value)}
            placeholder="0"
            className="h-[50px] w-full rounded-xl border border-[#d8d8d8] py-[14px] pl-4 pr-[100px] focus:border-focus disabled:cursor-not-allowed disabled:bg-[#F0F1F5] data-[error=true]:!border-red"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs leading-[18px] text-gray">
            Max: {formatNum(balance)}
          </div>
        </div>

        <button
          disabled={!!withdrawError}
          onClick={handleConfirmWithdraw}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-[16px] bg-yellow leading-6 text-black disabled:bg-[#F0F1F5]"
        >
          {CT("btn-Confirm")}
        </button>
      </DialogContent>
    </Dialog>
  );
}
