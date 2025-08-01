"use client";

import { truncateAddr } from "@/lib/utils/web3";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { PerpTable } from "./perp-table";
import { UserProfileDialogOpen } from "@/lib/states/user";
import { useSetAtom } from "jotai";
import { useUserStats } from "@/lib/hooks/api/use-user-stats";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: { address: string } }) {
  const address = params.address;
  const { data: accountStat } = useUserStats();

  const [currentTab, setCurrentTab] = useState("PERPS");

  const [mobileInfoTab, setMobileInfoTab] = useState("Overview");

  const setShowProDialog = useSetAtom(UserProfileDialogOpen);

  function handleMobileInfoTabChange(tab: string) {
    setMobileInfoTab(tab);
  }

  function handleTabChange(tab: string) {
    setCurrentTab(tab);
  }

  function handleProfileClick() {
    setShowProDialog(true);
  }

  const tabClx =
    "flex w-[105px] items-center px-[10px] font-[400] py-[10px] text-sm leading-5 border-b-2 data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray rounded-none";

  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-col">
      <div className="flex flex-1 items-stretch overflow-y-auto bg-border-black p-[2px]">
        {/* Desktop Layout */}
        <div className="mr-[2px] hidden flex-1 flex-col sm:flex">
          {/* Address Header */}
          <div className="mb-[2px] flex h-[80px] items-center justify-between rounded bg-bg-black p-4">
            <div className="flex items-center gap-[10px] text-[20px] text-title-white">
              <div className="">Address:</div>
              <div className="">{address}</div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 rounded bg-bg-black">
            <Tabs
              value={currentTab}
              className="flex h-full flex-col"
              onValueChange={handleTabChange}
            >
              <TabsList className="w-full justify-start rounded-none border-b border-border-black bg-transparent text-gray">
                <TabsTrigger
                  value="TRANSACTIONS"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="OPTIONS"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  Options
                </TabsTrigger>
                <TabsTrigger value="PERPS" className={tabClx}>
                  Perps
                </TabsTrigger>
                <TabsTrigger
                  value="ORDERS"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="VAULTS"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  Vaults
                </TabsTrigger>
                <TabsTrigger
                  value="STAKING"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  Staking
                </TabsTrigger>
                <TabsTrigger
                  value="MORE"
                  className={cn(tabClx, "pointer-events-none")}
                >
                  More
                </TabsTrigger>
              </TabsList>
              <TabsContent value="PERPS" className="m-0 flex-1 p-0">
                <PerpTable />
              </TabsContent>
              <TabsContent value="TRANSACTIONS" className="flex-1 p-4">
                <div className="text-gray">Transactions content</div>
              </TabsContent>
              <TabsContent value="OPTIONS" className="flex-1 p-4">
                <div className="text-gray">Options content</div>
              </TabsContent>
              <TabsContent value="ORDERS" className="flex-1 p-4">
                <div className="text-gray">Orders content</div>
              </TabsContent>
              <TabsContent value="VAULTS" className="flex-1 p-4">
                <div className="text-gray">Vaults content</div>
              </TabsContent>
              <TabsContent value="STAKING" className="flex-1 p-4">
                <div className="text-gray">Staking content</div>
              </TabsContent>
              <TabsContent value="MORE" className="flex-1 p-4">
                <div className="text-gray">More content</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-1 flex-col text-[14px] sm:hidden">
          {/* Address Header */}
          <div className="mb-[2px] flex h-[80px] items-center justify-between rounded bg-bg-black p-4">
            <div className="flex items-center gap-[10px] text-[16px] text-title-white">
              <div className="">Address:</div>
              <div className="">
                {truncateAddr(address, { nPrefix: 10, nSuffix: 8 })}
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="mb-[2px] rounded bg-bg-black">
            <Tabs
              value={mobileInfoTab}
              className="w-full"
              onValueChange={handleMobileInfoTabChange}
            >
              <TabsList className="h-auto w-full rounded-none border-b border-border-black bg-transparent p-0 p-0 text-gray">
                <TabsTrigger
                  value="Overview"
                  className="flex-1 py-3 data-[state=active]:border-b-2 data-[state=active]:border-main data-[state=active]:text-title-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="Infos"
                  className="flex-1 py-3 data-[state=active]:border-b-2 data-[state=active]:border-main data-[state=active]:text-title-white"
                >
                  Infos
                </TabsTrigger>
                <TabsTrigger
                  value="Positions"
                  className="flex-1 py-3 data-[state=active]:border-b-2 data-[state=active]:border-main data-[state=active]:text-title-white"
                >
                  Positions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Overview" className="p-4">
                <div className="space-y-[10px] text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-title-white">Overview</span>
                    <span className="text-main">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">Perps (2)</span>
                    <span className="text-title-white">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">Spot</span>
                    <span className="text-title-white">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">Vault</span>
                    <span className="text-title-white">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">Staked</span>
                    <span className="text-title-white">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">Settled Value</span>
                    <span className="text-title-white">-</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="Infos" className="p-4">
                <div className="text-[12px]">
                  <div className="mb-[10px] flex items-center justify-between">
                    <div className="break-all text-gray">
                      {accountStat?.uid
                        ? `${accountStat?.user_name}(${truncateAddr(address, {
                            nPrefix: 10,
                            nSuffix: 8,
                          })})`
                        : truncateAddr(address, { nPrefix: 10, nSuffix: 8 })}
                    </div>
                    <button className="flex h-[24px] w-[84px] items-center justify-center rounded-full border border-main text-main">
                      Add alias
                    </button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="Positions" className="p-4">
                <div className="text-[12px]">
                  <div className="rounded bg-[#00D4AA] px-4 py-2 text-center">
                    <div className="text-[#111A1E]">BTC-USD</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile Main Content */}
          <div className="flex-1 rounded bg-bg-black">
            <Tabs
              value={currentTab}
              className="flex h-full flex-col"
              onValueChange={handleTabChange}
            >
              <TabsList className="h-auto w-[100vw] overflow-hidden rounded-none border-b border-border-black bg-transparent p-0 text-gray">
                <div className="scrollbar-hide flex overflow-x-auto">
                  <TabsTrigger
                    value="TRANSACTIONS"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger
                    value="OPTIONS"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Options
                  </TabsTrigger>
                  <TabsTrigger
                    value="PERPS"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Perps
                  </TabsTrigger>
                  <TabsTrigger
                    value="ORDERS"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="VAULTS"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Vaults
                  </TabsTrigger>
                  <TabsTrigger
                    value="STAKING"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    Staking
                  </TabsTrigger>
                  <TabsTrigger
                    value="MORE"
                    className="relative flex-shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-3 data-[state=active]:border-main data-[state=active]:text-title-white"
                  >
                    More
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent
                value="PERPS"
                className="m-0 w-[100vw] flex-1 overflow-hidden p-0 lg:w-full"
              >
                <PerpTable />
              </TabsContent>
              <TabsContent value="TRANSACTIONS" className="flex-1 p-4">
                <div className="text-gray">Transactions content</div>
              </TabsContent>
              <TabsContent value="OPTIONS" className="flex-1 p-4">
                <div className="text-gray">Options content</div>
              </TabsContent>
              <TabsContent value="ORDERS" className="flex-1 p-4">
                <div className="text-gray">Orders content</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Desktop Right Sidebar */}
        <div className="hidden h-full flex-col text-[12px] sm:flex sm:w-[368px]">
          {/* Overview Section */}
          <div className="rounded bg-bg-black p-[10px]">
            <div className="space-y-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-title-white">Overview</span>
                <span className="text-main">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray">Perps (2)</span>
                <span className="text-title-white">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray">Spot</span>
                <span className="text-title-white">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray">Vault</span>
                <span className="text-title-white">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray">Staked</span>
                <span className="text-title-white">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray">Settled Value</span>
                <span className="text-title-white">-</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-[2px] rounded bg-bg-black p-[10px]">
            <div className="mb-[10px] font-semibold text-title-white">
              Infos
            </div>
            <div className="mb-[10px] flex items-center justify-between">
              <div className="mb-2 break-all text-gray">
                {truncateAddr(address, { nPrefix: 6, nSuffix: 4 })}
              </div>
              <button
                onClick={handleProfileClick}
                className="flex h-[24px] w-[84px] items-center justify-center rounded-full border border-main text-main"
              >
                Add alias
              </button>
            </div>
          </div>

          {/* Positions Section */}
          <div className="mt-[2px] flex-1 rounded bg-bg-black p-[10px]">
            <div className="mb-4 text-title-white">Positions</div>
            <div className="rounded bg-[#00D4AA] px-4 py-2 text-center">
              <div className="text-[#111A1E]">BTC-USDT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
