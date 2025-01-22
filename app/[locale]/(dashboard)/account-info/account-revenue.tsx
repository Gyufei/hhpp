"use client";

import { formatNum } from "@/lib/utils/number";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUserTokenBalance } from "@/lib/hooks/api/use-user-token-balance";
import HoverIcon from "@/components/share/hover-icon";
import { useWithdrawToken } from "@/lib/hooks/contract/use-withdraw-token";

export default function AccountRevenue() {
  const T = useTranslations("Dashboard");
  const { data: tokenBlcData, mutate: refetchTokenBlcData } =
    useUserTokenBalance();
  const userClaim = tokenBlcData?.[0]?.ledgers;

  const {
    isLoading: isClaiming,
    write: writeAction,
    isSuccess: isClaimSuccess,
  } = useWithdrawToken();

  useEffect(() => {
    if (isClaimSuccess) {
      refetchTokenBlcData();
    }
  }, [isClaimSuccess, refetchTokenBlcData]);

  const handleWithdraw = (type: string, value: any) => {
    if (value <= 0) return;
    writeAction({
      token_balance_type: type,
      dest_account: value,
    });
  };

  return (
    <div className="mx-[10px] border-t border-border-black pb-[20px] pt-[20px]">
      <div className="flex items-center justify-between">
        <div className="leading-[18px] text-title-white">
          {T("AccountRevenue")}
        </div>
        {userClaim && (
          <HoverIcon
            onClick={() =>
              handleWithdraw("sales_revenue", userClaim?.sales_revenue)
            }
            src="/icons/claim-gray.svg"
            hoverSrc={
              isClaiming || +(userClaim?.sales_revenue as string) <= 0
                ? "/icons/claim-gray.svg"
                : "/icons/claim.svg"
            }
            width={20}
            height={20}
            alt="copy"
            data-disabled={
              isClaiming || +(userClaim?.sales_revenue as string) <= 0
            }
            className="data-[disabled=true]:cursor-not-allowed"
          />
        )}
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText>{T("Total")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userClaim}>
            ${formatNum(Number(userClaim?.total_sales_revenue))}
          </NoDataDisplay>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText> {T("AvailableToClaim")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userClaim}>
            ${formatNum(Number(userClaim?.sales_revenue))}
          </NoDataDisplay>
        </div>
      </div>
    </div>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-[18px] text-gray">{children}</div>;
}

function NoDataDisplay({
  noData,
  children,
}: {
  noData: boolean;
  children: React.ReactNode;
}) {
  return noData ? <>-</> : <>{children}</>;
}
