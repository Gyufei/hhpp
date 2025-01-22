"use client";
import AccountInfo from "./account-info";
import ReferralLink from "./referral-link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-col">
      <div className="flex flex-1 items-stretch overflow-y-auto bg-border-black p-[2px]">
        <div className="mr-[2px] flex flex-1">{children}</div>
        <div className="flex h-full flex-col sm:w-[368px]">
          <div className="flex-1 rounded bg-bg-black">
            <AccountInfo />
          </div>
          <div className="mt-[2px] rounded bg-bg-black ">
            <ReferralLink />
          </div>
        </div>
      </div>
    </div>
  );
}
