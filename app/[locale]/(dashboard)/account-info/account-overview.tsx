"use client";
import { formatNum } from "@/lib/utils/number";
import { useAccountStats } from "@/lib/hooks/api/use-account-overview";
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
      {/* <div className="mt-3 flex justify-between">
          <LabelText>{T("Profit")}</LabelText>
          <div
            data-loss={accountInfo ? accountInfo?.profit < 0 : "null"}
            className="leading-[18px] data-[loss=false]:text-main data-[loss=null]:text-title-white data-[loss=true]:text-red"
          >
            <NoDataDisplay noData={!accountInfo}>
              <>
                {accountInfo?.profit < 0 ? "-" : "+"}$
                    {formatNum(Math.abs(accountInfo?.profit || 0))}
              </>
            </NoDataDisplay>
          </div>
        </div> */}

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

      <div className="mt-3 flex justify-between">
        <LabelText>{T("SettledValue")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!accountInfo}>
            ${formatNum(Number(accountInfo?.settled_value))}
          </NoDataDisplay>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText>{T("TaxIncome")}</LabelText>
        <div
          data-loss={accountInfo ? Number(accountInfo?.tax_income) < 0 : "null"}
          className="leading-[18px] data-[loss=false]:text-[#50D2C1] data-[loss=null]:text-title-white data-[loss=true]:text-red"
        >
          <NoDataDisplay noData={!accountInfo}>
            <>
              {Number(accountInfo?.tax_income) < 0 ? "-" : "+"}$
              {formatNum(Math.abs(Number(accountInfo?.tax_income) || 0))}
            </>
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
