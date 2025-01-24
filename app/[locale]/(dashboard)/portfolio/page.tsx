"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MyOrders from "./my-orders";
import MyBalances from "./my-balances";
import PortfolioInfo from "./portfolio-info";

const tabClx =
  "flex w-[105px] items-center px-[10px] font-[400] py-[10px] text-sm leading-5 border-b-2 data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray rounded-none";

export default function PortFolio() {
  const HT = useTranslations("Common");
  const MOT = useTranslations("MyOrders");
  const MBT = useTranslations("MyBalances");

  const [currentTab, setCurrentTab] = useState("orders");

  return (
    <div className="flex flex-1 flex-col sm:p-0">
      <div className="mb-[2px] mr-0 hidden items-center justify-between rounded bg-bg-black px-5 py-[25px] sm:flex">
        <div className="flex w-full items-center justify-between space-x-5">
          <div className="text-xl leading-[30px] text-title-white">
            {HT("Dashboard")}
          </div>
          <PortfolioInfo />
        </div>
      </div>
      <Tabs
        value={currentTab}
        className="flex flex-1 flex-col rounded bg-bg-black px-[10px] py-[12px]"
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex items-center justify-between rounded-none border-b border-[#303030] p-0">
          <div className="flex items-center justify-start space-x-[10px]">
            <TabsTrigger className={tabClx} value="orders">
              {MOT("MyOrders")}
            </TabsTrigger>
            <TabsTrigger className={tabClx} value="balances">
              {MBT("MyBalances")}
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent
          value="orders"
          className="flex flex-1 flex-col data-[state=inactive]:hidden"
          forceMount={true}
        >
          <MyOrders />
        </TabsContent>
        <TabsContent
          value="balances"
          className="flex flex-1 flex-col data-[state=inactive]:hidden"
          forceMount={true}
        >
          <MyBalances />
        </TabsContent>
      </Tabs>
    </div>
  );
}
