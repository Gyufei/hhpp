"use client";
import { formatNum } from "@/lib/utils/number";
import { useAccountStats } from "@/lib/hooks/api/use-account-overview";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useUserXp } from "@/lib/hooks/api/use-user-xp";
import { useUserTokenBalance } from "@/lib/hooks/api/use-user-token-balance";
import HoverIcon from "@/components/share/hover-icon";
import { useWithdrawToken } from "@/lib/hooks/contract/use-withdraw-token";
import { useEffect } from "react";
import ReferralInfo from "./referral-info";
import { usePathname } from "next/navigation";

export default function OverviewInfo() {
  const T = useTranslations("Dashboard");
  const { currentChain } = useChainWallet();
  const {
    isLoading: isClaiming,
    write: writeAction,
    isSuccess: isClaimSuccess,
  } = useWithdrawToken();
  const { data: userPoints } = useUserXp();

  const { data: accountInfo } = useAccountStats(currentChain!);
  const { data: tokenBlcData, mutate: refetchTokenBlcData } =
    useUserTokenBalance();
  const userClaim = tokenBlcData?.[0]?.ledgers;
  const pathname = usePathname();

  const isReferrals = pathname.includes("/referrals");

  const handleWithdraw = (type: string, value: any) => {
    if (value <= 0) return;
    writeAction({
      token_balance_type: type,
      dest_account: value,
    });
  };

  useEffect(() => {
    if (isClaimSuccess) {
      refetchTokenBlcData();
    }
  }, [isClaimSuccess, refetchTokenBlcData]);

  return (
    <div className="flex h-full flex-col pb-5 text-[12px]">
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

        {/* <div className="mt-3 flex justify-between">
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
        </div> */}

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
      {!isReferrals ? (
        <>
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

          <div className="mx-[10px] border-t border-border-black pb-[20px] pt-[20px]">
            <div className="flex items-center justify-between">
              <div className="leading-[18px] text-title-white">
                {T("HTPoints")}
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <LabelText>{T("txt-TotalPoints")}</LabelText>
              <div className="leading-[18px] text-title-white">
                <NoDataDisplay noData={!userPoints}>
                  {formatNum(Number(userPoints?.xp))}
                </NoDataDisplay>
              </div>
            </div>
            {/* <div className="mt-3 flex justify-between">
          <LabelText>{RT("txt-Rank")}</LabelText>
          <div className="leading-[18px] text-title-white">
            <NoDataDisplay noData={!accountInfo}>N/A</NoDataDisplay>
          </div>
        </div> */}
          </div>
        </>
      ) : (
        <div className="mx-[10px] border-t border-border-black pb-[20px] pt-[20px]">
          <div className="flex items-center justify-between">
            <div className="leading-[18px] text-title-white">
              {T("ReferralCommision")}
            </div>
            {userClaim && (
              <HoverIcon
                onClick={() =>
                  handleWithdraw("referral_bonus", userClaim?.referral_bonus)
                }
                src="/icons/claim-gray.svg"
                hoverSrc={
                  isClaiming || +(userClaim?.referral_bonus as string) <= 0
                    ? "/icons/claim-gray.svg"
                    : "/icons/claim.svg"
                }
                width={20}
                height={20}
                alt="copy"
                data-disabled={
                  isClaiming || +(userClaim?.referral_bonus as string) <= 0
                }
                className="data-[disabled=true]:cursor-not-allowed"
              />
            )}
          </div>
          <div className="mt-3 flex justify-between">
            <LabelText>{T("Total")}</LabelText>
            <div className="leading-[18px] text-title-white">
              <NoDataDisplay noData={!userClaim}>
                ${formatNum(Number(userClaim?.total_referral_bonus))}
              </NoDataDisplay>
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <LabelText>{T("Change(24h)")}</LabelText>
            <div className="leading-[18px] text-title-white">
              {userClaim ? <ReferralInfo /> : "-"}
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <LabelText>{T("AvailableToClaim")}</LabelText>
            <div className="leading-[18px] text-title-white">
              <NoDataDisplay noData={!userClaim}>
                ${formatNum(Number(userClaim?.referral_bonus))}
              </NoDataDisplay>
            </div>
          </div>
        </div>
      )}
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
