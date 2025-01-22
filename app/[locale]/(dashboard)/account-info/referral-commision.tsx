import Image from "next/image";

import { formatNum } from "@/lib/utils/number";
import { useMemo, useEffect } from "react";
import NP from "number-precision";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { useTranslations } from "next-intl";
import { useUserTokenBalance } from "@/lib/hooks/api/use-user-token-balance";
import HoverIcon from "@/components/share/hover-icon";
import { useWithdrawToken } from "@/lib/hooks/contract/use-withdraw-token";

export default function ReferralCommision() {
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
          {T("ReferralCommission")}
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
          {userClaim ? <ReferralChange /> : "-"}
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
  );
}

function ReferralChange() {
  const { data: referralData } = useReferralData();

  const commission = useMemo(() => {
    return (referralData || []).reduce((acc, cur) => {
      return acc + Number(cur.commission);
    }, 0);
  }, [referralData]);

  const lastCommission = useMemo(() => {
    return (referralData || []).reduce((acc, cur) => {
      return acc + Number(cur.last_commission);
    }, 0);
  }, [referralData]);

  const commissionRate = useMemo(() => {
    if (Number(lastCommission) === 0 || Number(commission) === 0) return 0;

    const yesterdayCommission = NP.minus(commission, lastCommission);
    if (yesterdayCommission === 0) return 1;

    return NP.divide(lastCommission, yesterdayCommission);
  }, [lastCommission, commission]);

  return (
    <>
      <div className="flex flex-col items-center justify-start text-[12px] sm:flex-row sm:space-x-10">
        <div className="mt-0 flex w-full items-stretch justify-between">
          <div className="flex flex-col items-start justify-between">
            <div className="mt-1 flex items-center justify-center text-title-white">
              <div>${commission}</div>
              <div className="ml-[10px] flex items-center justify-center">
                <DisplayArrow
                  isUp={
                    Number(commissionRate === 0) ? "zero" : commissionRate > 0
                  }
                />
                <div className="flex w-max items-center">
                  <span
                    data-up={
                      Number(commissionRate === 0) ? "zero" : commissionRate > 0
                    }
                    className="data-[up=false]:text-red data-[up=true]:text-green data-[up=zero]:text-gray"
                  >
                    {commissionRate > 0 ? "+" : ""}
                    {formatNum(commissionRate * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DisplayArrow({ isUp }: { isUp: "zero" | boolean }) {
  return (
    <div
      data-up={isUp}
      className="flex h-[18px] w-[18px] items-center justify-center rounded-[12px] "
    >
      <Image
        src={
          isUp === "zero"
            ? "/icons/gray-up-arrow.svg"
            : isUp
            ? "/icons/green-up-arrow.svg"
            : "/icons/red-down-arrow.svg"
        }
        width={8}
        height={14}
        alt="arrow"
        style={{
          transform: isUp === "zero" ? "rotate(90deg)" : "",
        }}
      />
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
