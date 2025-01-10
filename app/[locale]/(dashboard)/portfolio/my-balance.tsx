"use client";

import { BalanceTable } from "./balance-table";

export default function MyOrders() {
  return (
    <div className="box-content flex h-[calc(100vh-156px)] w-full flex-1 flex-col  text-txt-white sm:h-[calc(100vh-96px)] sm:px-0">
      <div className="flex max-w-[100vw] flex-1 flex-col overflow-x-scroll px-4 sm:max-w-none sm:overflow-x-hidden sm:px-0">
        <div className="max-h-auto relative min-h-[296px] w-[820px] flex-1 flex-col overflow-y-hidden sm:w-full sm:min-w-0">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col text-txt-white">
            <BalanceTable />
          </div>
        </div>
      </div>
    </div>
  );
}
