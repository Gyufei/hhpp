"use client";
import AccountRevenue from "./account-revenue";
import HTPoints from "./ht-points";
import AccountOverview from "./account-overview";
import ReferralCommision from "./referral-commision";
import { usePathname } from "next/navigation";

export default function AccountInfo() {
  const pathname = usePathname();

  const isReferrals = pathname.includes("/referrals");

  return (
    <div className="flex h-full flex-col pb-5 text-[12px]">
      <AccountOverview />
      {!isReferrals ? (
        <>
          <AccountRevenue />
          <HTPoints />
        </>
      ) : (
        <ReferralCommision />
      )}
    </div>
  );
}
