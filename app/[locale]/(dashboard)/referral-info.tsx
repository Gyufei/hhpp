import Image from "next/image";

import { formatNum } from "@/lib/utils/number";
import { useMemo } from "react";
import NP from "number-precision";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";

export default function ReferralInfo() {
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
