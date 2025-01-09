"use client";
import { formatNum } from "@/lib/utils/number";
import { useAccountStats } from "@/lib/hooks/api/use-account-overview";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import ReferralLink from "./referral-link";

export default function OverviewInfo() {
  const T = useTranslations("cd-AccountOverview");
  const { currentChain } = useChainWallet();

  const { data: accountInfo } = useAccountStats(currentChain!);

  return (
    <div className="flex h-full max-h-[800px] flex-col justify-between space-y-12 pb-5">
      <div className="mt-2 border-b border-[#303030] bg-bg-black px-4 pb-8">
        <div className="flex items-center justify-between">
          <div className="leading-6 text-txt-white">
            {T("cap-AccountOverview")}
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-TradeVol")}</LabelText>
          <div className="leading-6 text-txt-white">
            <NoDataDisplay noData={!accountInfo}>
              ${formatNum(Number(accountInfo?.trade_vol))}
            </NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-Profit")}</LabelText>
          <div
            // data-loss={accountInfo ? accountInfo?.profit < 0 : "null"}
            className="leading-6 data-[loss=false]:text-green data-[loss=null]:text-txt-white data-[loss=true]:text-red"
          >
            <NoDataDisplay noData={!accountInfo}>
              <>
                {/* {accountInfo?.profit < 0 ? "-" : "+"}$
                    {formatNum(Math.abs(accountInfo?.profit || 0))} */}
              </>
            </NoDataDisplay>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-MakerOrders")}</LabelText>
          <div className="leading-6 text-txt-white">
            <NoDataDisplay noData={!accountInfo}>
              {formatNum(Number(accountInfo?.maker_orders))}
            </NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-TakerOrders")}</LabelText>
          <div className="leading-6 text-txt-white">
            <NoDataDisplay noData={!accountInfo}>
              {formatNum(Number(accountInfo?.taker_orders))}
            </NoDataDisplay>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-SettledValue")}</LabelText>
          <div className="leading-6 text-txt-white">
            <NoDataDisplay noData={!accountInfo}>
              ${formatNum(Number(accountInfo?.settled_value))}
            </NoDataDisplay>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <LabelText>{T("lb-BonusIncome")}</LabelText>
          <div
            data-loss={
              accountInfo ? Number(accountInfo?.tax_income) < 0 : "null"
            }
            className="leading-6 data-[loss=false]:text-green data-[loss=null]:text-txt-white data-[loss=true]:text-red"
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
      <ReferralLink />
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
