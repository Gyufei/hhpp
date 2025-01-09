"use client";
import OverviewInfo from "./overview-info";
import ReferralLink from "./referral-link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-56px)]">
      <div className="flex flex-1 items-stretch overflow-y-auto bg-border-black">
        <div className="flex flex-1">{children}</div>
        <div className="flex h-full flex-col sm:w-[368px]">
          <div className="m-[2px] flex-1 rounded bg-bg-black">
            <OverviewInfo />
          </div>
          <div className="m-[2px] mt-0 rounded bg-bg-black ">
            <ReferralLink />
          </div>
        </div>
      </div>
    </div>
  );
}
