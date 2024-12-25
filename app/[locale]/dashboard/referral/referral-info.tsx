import Image from "next/image";
import { useTranslations } from "next-intl";

import { formatNum } from "@/lib/utils/number";
import { IReferralItem } from "@/lib/hooks/api/use-referral-data";
import { useMemo } from "react";

export default function ReferralInfo({
  referralData,
}: {
  referralData: Array<IReferralItem>;
}) {
  const rt = useTranslations("page-Referral");

  const signedUp = useMemo(() => {
    return referralData.reduce((acc, cur) => {
      return acc + Number(cur.referral_users);
    }, 0);
  }, [referralData]);

  const commission = useMemo(() => {
    return referralData.reduce((acc, cur) => {
      return acc + Number(cur.commission);
    }, 0);
  }, [referralData]);

  const lastSignedUp = useMemo(() => {
    return referralData.reduce((acc, cur) => {
      return acc + Number(cur.last_referral_users);
    }, 0);
  }, [referralData]);

  const lastCommission = useMemo(() => {
    return referralData.reduce((acc, cur) => {
      return acc + Number(cur.last_commission);
    }, 0);
  }, [referralData]);

  const signedUpRate = useMemo(() => {
    if (lastSignedUp === 0) return 0;
    return lastSignedUp / (signedUp - lastSignedUp);
  }, [lastSignedUp, signedUp]);

  const commissionRate = useMemo(() => {
    if (lastCommission === 0) return 0;

    return lastCommission / (commission - lastCommission);
  }, [lastCommission, commission]);

  return (
    <>
      <div className="mt-5 flex flex-col items-center justify-start sm:flex-row sm:space-x-5">
        <div
          className="flex w-full items-stretch justify-between rounded-[20px] bg-white px-5 py-3 sm:w-[300px]"
          style={{
            backgroundImage: "url(/img/new-users.png)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col items-start justify-between">
            <div className="mt-1 text-[30px] leading-[30px] text-black">
              {signedUp}
            </div>
            <div className="text-sm leading-5 text-gray">
              {rt("lb-SignedUp")}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between space-y-1">
            <DisplayArrow
              isUp={Number(signedUpRate === 0) ? "zero" : signedUpRate > 0}
            />
            <div className="flex items-center space-x-1">
              <span
                data-up={Number(signedUpRate === 0) ? "zero" : signedUpRate > 0}
                className="data text-sm leading-5 data-[up=false]:text-red data-[up=true]:text-green data-[up=zero]:text-gray"
              >
                {signedUpRate > 0 ? "+" : ""}
                {formatNum(signedUpRate * 100)}%
              </span>
              <span className="text-gray">/ 24h</span>
            </div>
          </div>
        </div>
        <div
          className="mt-3 flex w-full items-stretch justify-between rounded-[20px] bg-white px-5 py-3 sm:mt-0 sm:w-[300px]"
          style={{
            backgroundImage: "url(/img/trading-fee.png)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col items-start justify-between">
            <div className="mt-1 text-[30px] leading-[30px] text-black">
              ${commission}
            </div>
            <div className="text-sm leading-5 text-gray">
              {rt("lb-Commission")}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between space-y-1">
            <DisplayArrow
              isUp={Number(commissionRate === 0) ? "zero" : commissionRate > 0}
            />
            <div className="flex items-center space-x-1">
              <span
                data-up={
                  Number(commissionRate === 0) ? "zero" : commissionRate > 0
                }
                className="text-sm leading-5 data-[up=false]:text-red  data-[up=true]:text-green data-[up=zero]:text-gray"
              >
                {commissionRate > 0 ? "+" : ""}
                {formatNum(commissionRate * 100)}%
              </span>
              <span className="text-gray">/ 24h</span>
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
      className="flex h-8 w-11 items-center justify-center rounded-[12px] data-[up=false]:bg-[rgba(255,98,98,0.2)] data-[up=true]:bg-[rgba(76,191,135,0.2)] data-[up=zero]:bg-[rgba(240,241,245,1)]"
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
