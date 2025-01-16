"use client";
import { formatNum } from "@/lib/utils/number";
import { useAccountStats } from "@/lib/hooks/api/use-account-overview";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useUserXp } from "@/lib/hooks/api/use-user-xp";

export default function OverviewInfo() {
  const T = useTranslations("cd-AccountOverview");
  const { currentChain } = useChainWallet();
  const { data: userPoints } = useUserXp();
  console.log("🚀 ~ OverviewInfo ~ userPoints:", userPoints);

  const { data: accountInfo } = useAccountStats(currentChain!);

  return (
    <div className="flex h-full flex-col space-y-2 pb-5 text-[12px]">
      <div className="m-[10px] pb-8 text-xs">
        <div className="flex items-center justify-between">
          <div className="leading-[18px] text-title-white">
            {T("cap-AccountOverview")}
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-TradeVol")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>
              ${formatNum(Number(accountInfo?.trade_vol))}
            </NoDataDisplay>
          </div>
        </div>
        {/* <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-Profit")}</LabelText>
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

        {/* <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-MakerOrders")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>
              {formatNum(Number(accountInfo?.maker_orders))}
            </NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-TakerOrders")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>
              {formatNum(Number(accountInfo?.taker_orders))}
            </NoDataDisplay>
          </div>
        </div> */}

        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-SettledValue")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>
              ${formatNum(Number(accountInfo?.settled_value))}
            </NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-TaxIncome")}</LabelText>
          <div
            data-loss={
              accountInfo ? Number(accountInfo?.tax_income) < 0 : "null"
            }
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
      {/* <div className="m-[10px] border-t border-border-black">
        <div className="flex items-center justify-between">
          <div className="leading-[18px] text-title-white">
            {TR("th-HTPoints")}
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{TR("txt-TotalPoints")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>10,000</NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{TR("txt-Rank")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>N/A</NoDataDisplay>
          </div>
        </div>
      </div> */}
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
