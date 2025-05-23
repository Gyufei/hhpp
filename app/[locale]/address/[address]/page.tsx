"use client";

import HoverIcon from "@/components/share/hover-icon";
import { truncateAddr } from "@/lib/utils/web3";
import { toast } from "react-hot-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils/common";
import { PerpTable } from "./perp-table";

export default function Page({ params }: { params: { address: string } }) {
  const address = params.address;

  const handleCopy = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast.success("Copied to clipboard");
  };

  const [currentTab, setCurrentTab] = useState("PERPS");

  function handleTabChange(tab: string) {
    return;
    setCurrentTab(tab);
  }

  const ActiveClx =
    "data-[state=active]:text-title-white data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-white data-[state=active]:after:content-['']";

  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-col gap-[2px] bg-border-black px-[2px] py-[2px]">
      <div className="flex items-start justify-between gap-[2px] bg-[#222428] p-4">
        <div className="flex items-center gap-[10px]">
          <div className="text-gray">Address:</div>
          <div className="text-txt-white">{address}</div>
        </div>
        <button onClick={() => handleCopy(address)} className="ml-2">
          <HoverIcon
            src="/icons/copy-gray.svg"
            hoverSrc="/icons/white-copy.svg"
            width={24}
            height={24}
            alt="copy"
          />
        </button>
      </div>

      <div className="flex items-start justify-between gap-[2px]">
        <div className="flex flex-1 flex-col">
          <div className="min-w-[260px] rounded bg-[#222428] p-6">
            <div className="flex items-center justify-between">
              <div className="mb-2 text-2xl font-bold text-title-white">
                Overview
              </div>
              <div className="mb-4 text-3xl font-bold text-title-white">
                418,170.91$
              </div>
            </div>
            <div className="mb-1 flex items-center justify-between text-sm text-gray">
              <span>Perps (2) :</span>
              <span className="text-title-white">418,170.91$</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-sm text-gray">
              <span>Spot :</span>
              <span className="text-title-white">0.00$</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-sm text-gray">
              <span>Vault :</span>
              <span className="text-title-white">0.00$</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray">
              <span>Staked :</span>
              <span className="text-title-white">0.00$</span>
            </div>
          </div>
        </div>

        <div className="flex min-w-[260px] max-w-[400px] flex-1 flex-col">
          <div className="flex h-full flex-col justify-between rounded bg-[#222428] p-6">
            <div className="text-2xl font-bold text-title-white">Infos</div>
            <div className="flex items-center justify-between">
              <div className="break-all text-sm text-title-white">
                {truncateAddr(address, { nPrefix: 6, nSuffix: 4 })}
              </div>
              <button className="mt-4 w-fit cursor-not-allowed rounded bg-[#303030] px-4 py-1 text-xs text-gray opacity-60">
                ADD ALIAS
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-[260px] flex-1 flex-col">
          <div className="h-full rounded bg-[#222428] p-6">
            <div className="mb-4 text-2xl font-bold text-title-white">
              Positions
            </div>
            <div className="flex w-full">
              <div className="flex-1 cursor-pointer rounded bg-red px-6 py-3 text-lg font-bold text-white">
                BTC-USD
              </div>
              <div className="flex-1 cursor-pointer rounded bg-red px-6 py-3 text-lg font-bold text-white">
                PEPE-USD
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        value={currentTab}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full rounded-none bg-[#222428] text-gray">
          <TabsTrigger
            value="TRANSACTIONS"
            className={cn("relative flex-1", ActiveClx)}
          >
            TRANSACTIONS
          </TabsTrigger>
          <TabsTrigger
            value="HOLDINGS"
            className={cn("relative flex-1", ActiveClx)}
          >
            HOLDINGS
          </TabsTrigger>
          <TabsTrigger
            value="PERPS"
            className={cn("relative flex-1", ActiveClx)}
          >
            PERPS
          </TabsTrigger>
          <TabsTrigger
            value="ORDERS"
            className={cn("relative flex-1", ActiveClx)}
          >
            ORDERS
          </TabsTrigger>
          <TabsTrigger
            value="VAULTS"
            className={cn("relative flex-1", ActiveClx)}
          >
            VAULTS
          </TabsTrigger>
          <TabsTrigger
            value="STAKING"
            className={cn("relative flex-1", ActiveClx)}
          >
            STAKING
          </TabsTrigger>
          <TabsTrigger
            value="MORE"
            className={cn("relative flex-1", ActiveClx)}
          >
            MORE
          </TabsTrigger>
        </TabsList>
        <TabsContent value="PERPS" className="mt-[2px]">
          {/* Table */}
          <PerpTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
