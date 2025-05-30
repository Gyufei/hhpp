"use client";
import { formatNum } from "@/lib/utils/number";
import { useUserStats } from "@/lib/hooks/api/use-user-stats";
import { useTranslations } from "next-intl";

export default function AccountOverview() {
  const T = useTranslations("Dashboard");
  const { data: userStat } = useUserStats();

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
          <NoDataDisplay noData={!userStat?.trade_vol}>
            ${formatNum(Number(userStat?.trade_vol || 0))}
          </NoDataDisplay>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <LabelText>{T("MakerOrders")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userStat?.maker_orders}>
            {formatNum(Number(userStat?.maker_orders || 0))}
          </NoDataDisplay>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <LabelText>{T("TakerOrders")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userStat?.taker_orders}>
            {formatNum(Number(userStat?.taker_orders || 0))}
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
