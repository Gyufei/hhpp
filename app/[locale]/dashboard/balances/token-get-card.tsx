import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";

import Image from "next/image";

import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";
import { useWithdrawToken } from "@/lib/hooks/contract/use-withdraw-token";
import { IToken } from "@/lib/types/token";
import { useEffect, useRef } from "react";
import { reportEvent } from "@/lib/utils/analytics";

export function TokenGetCard({
  tokenInfo,
  amount,
  onSuccess,
}: {
  tokenInfo: IToken | null;
  amount: number;
  withdrawerName: string | null;
  onSuccess: () => void;
}) {
  const mbt = useTranslations("page-MyBalance");
  const hasReportedSuccessRef = useRef(false);

  const {
    isLoading: isWdTokenLoading,
    write: wdTokenAction,
    isSuccess: isWdTokenSuccess,
  } = useWithdrawToken();

  function handleWithdrawToken() {
    if (isWdTokenLoading) return;
    hasReportedSuccessRef.current = false;
    reportEvent("click", { value: "withdrawToken" });
    wdTokenAction(undefined);
  }

  useEffect(() => {
    if (isWdTokenSuccess) {
      if (!hasReportedSuccessRef.current) {
        hasReportedSuccessRef.current = true;
        reportEvent("withdrawSuccess", {
          value: isWdTokenSuccess ? "token" : "item",
        });
        onSuccess();
      }
    }
  }, [isWdTokenSuccess, onSuccess]);

  return (
    <div className="flex w-full flex-col items-stretch justify-between rounded-xl bg-white px-4 py-3 sm:w-[220px]">
      <div className="flex flex-col">
        <div className="hidden text-sm leading-5 text-lightgray sm:flex">
          {mbt("lb-Token")}
        </div>
        <div className="flex items-center gap-x-1">
          <Image
            src={tokenInfo?.logoURI || ""}
            width={16}
            height={16}
            className="rounded-full"
            alt="token logo"
          />
          <div className="text-base leading-6 text-black">
            {tokenInfo?.symbol}
          </div>
        </div>
      </div>

      <div className="mt-[10px] flex flex-col justify-between sm:items-end">
        <div className="mb-8 mt-4 flex flex-row justify-between sm:mb-0 sm:mt-0 sm:flex-col">
          <div className="text-sm leading-5 text-lightgray">
            {mbt("lb-Amount")}
          </div>
          <div className="text-base leading-6 text-black">
            {formatNum(amount)}
          </div>
        </div>
        <WithWalletConnectBtn onClick={handleWithdrawToken}>
          <div
            data-active={amount > 0}
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-[#d3d4d6] hover:border-0 hover:bg-yellow data-[active=false]:pointer-events-none data-[active=false]:opacity-70 sm:h-7 sm:w-14 sm:rounded-full"
          >
            {mbt("btn-Get")}
          </div>
        </WithWalletConnectBtn>
      </div>
    </div>
  );
}
