"use client";
import OverviewInfo from "./overview-info";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <div className="flex flex-1 items-stretch overflow-y-auto">
        <div className="ml-0 flex flex-1 rounded-none bg-bg-black sm:ml-4 sm:rounded-3xl sm:p-5">
          {children}
        </div>
        <div className="w-full sm:w-[368px]">
          <OverviewInfo />
        </div>
      </div>
    </div>
  );
}
