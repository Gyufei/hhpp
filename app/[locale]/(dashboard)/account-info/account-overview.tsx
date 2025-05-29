"use client";
import { formatNum } from "@/lib/utils/number";
import { useAccountStats } from "@/lib/hooks/api/use-account-stats";
import { useTranslations } from "next-intl";

export default function AccountOverview() {
  const T = useTranslations("Dashboard");
  const { data: accountInfo } = useAccountStats();

  return (
    <div className="m-[10px] mb-0 pb-[20px] text-xs">
      <div className="flex items-center justify-between">
        <div className="leading-[18px] text-title-white">
          {T("AccountOverview")}
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <LabelText>{T("TradeVol")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!accountInfo}>
            ${formatNum(Number(accountInfo?.trade_vol))}
          </NoDataDisplay>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <LabelText>{T("MakerOrders")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!accountInfo}>
            {formatNum(Number(accountInfo?.maker_orders))}
          </NoDataDisplay>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <LabelText>{T("TakerOrders")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!accountInfo}>
            {formatNum(Number(accountInfo?.taker_orders))}
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
