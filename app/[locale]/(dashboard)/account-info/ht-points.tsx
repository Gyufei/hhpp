"use client";

import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";
import { useUserXp } from "@/lib/hooks/api/use-user-xp";

export default function HTPoints() {
  const T = useTranslations("Dashboard");
  const { data: userPoints } = useUserXp();

  return (
    <div className="mx-[10px] border-t border-border-black pb-[20px] pt-[20px]">
      <div className="flex items-center justify-between">
        <div className="leading-[18px] text-title-white">{T("HTPoints")}</div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText>{T("TotalPoints")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userPoints}>
            {formatNum(Number(userPoints?.xp))}
          </NoDataDisplay>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText>{T("Rank")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userPoints?.rank}>
            {userPoints?.rank || "N/A"}
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
