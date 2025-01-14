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
    <div className="flex flex-col items-center justify-center text-[12px] sm:flex-row sm:space-x-4">
      <div className="flex flex-col items-start justify-between object-contain">
        <div className="text-gray">{rt("lb-SignedUp")}</div>
        <div className="flex items-center justify-center text-txt-white">
          <div>${signedUp}</div>
          <div className="ml-[10px] flex items-center justify-center ">
            <DisplayArrow
              isUp={Number(signedUpRate === 0) ? "zero" : signedUpRate > 0}
            />
            <div className="flex items-center">
              <span
                data-up={Number(signedUpRate === 0) ? "zero" : signedUpRate > 0}
                className="data leading-5 data-[up=false]:text-red data-[up=true]:text-green data-[up=zero]:text-gray"
              >
                {signedUpRate > 0 ? "+" : ""}
                {formatNum(signedUpRate * 100)}%
              </span>
              <span className="text-gray">/ 24h</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between object-contain ">
        <div className="flex flex-col items-start justify-between">
          <div className="text-gray">{rt("lb-Commission")}</div>
          <div className="flex items-center justify-center text-txt-white">
            <div>${commission}</div>
            <div className="ml-[10px] flex items-center justify-center">
              <DisplayArrow
                isUp={
                  Number(commissionRate === 0) ? "zero" : commissionRate > 0
                }
              />
              <div className="flex items-center">
                <span
                  data-up={
                    Number(commissionRate === 0) ? "zero" : commissionRate > 0
                  }
                  className="data-[up=false]:text-red  data-[up=true]:text-green data-[up=zero]:text-gray"
                >
                  {commissionRate > 0 ? "+" : ""}
                  {formatNum(commissionRate * 100)}%
                </span>
                <span className="text-gray">/ 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayArrow({ isUp }: { isUp: "zero" | boolean }) {
  return (
    <div
      data-up={isUp}
      className="flex h-8 w-5 items-center justify-center rounded-[12px] "
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
