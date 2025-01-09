"use client";
import OverviewInfo from "./overview-info";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-56px)]">
      <div className="flex flex-1 items-stretch overflow-y-auto border-2 border-[#303030]">
        <div className="ml-0 flex flex-1 rounded-none bg-bg-black sm:p-5">
          {children}
        </div>
        <div className="w-full border-l-2 border-[#303030] sm:w-[368px]">
          <OverviewInfo />
        </div>
      </div>
    </div>
  );
}
