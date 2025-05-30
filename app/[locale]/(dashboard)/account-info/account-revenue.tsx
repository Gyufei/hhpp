"use client";

import { useTranslations } from "next-intl";

export default function AccountRevenue() {
  const T = useTranslations("Dashboard");

  const userClaim = null;

  return (
    <div className="mx-[10px] border-t border-border-black pb-[20px] pt-[20px]">
      <div className="flex items-center justify-between">
        <div className="leading-[18px] text-title-white">
          {T("AccountRevenue")}
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText>{T("Total")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userClaim}>-</NoDataDisplay>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <LabelText> {T("AvailableToClaim")}</LabelText>
        <div className="leading-[18px] text-title-white">
          <NoDataDisplay noData={!userClaim}>-</NoDataDisplay>
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
