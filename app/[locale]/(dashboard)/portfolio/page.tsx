"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTranslations } from "next-intl";
import MyOrders from "./orders/page";
import MyBalances from "./my-balance";
import PortfolioInfo from "./portfolio-info";

const tabClx =
  "flex w-[105px] items-center px-[10px] py-[10px] text-sm leading-5 border-b-2 data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray rounded-none";

export default function PortFolio() {
  const TH = useTranslations("Header");

  const [currentTab, setCurrentTab] = useState("orders");

  return (
    <div className="flex flex-1 flex-col text-txt-white sm:p-0">
      <div className="m-[2px] mr-0 hidden items-center justify-between rounded bg-bg-black p-5 sm:flex">
        <div className="flex w-full items-center justify-between space-x-5">
          <div className="text-xl leading-[30px] text-txt-white">
            {TH("btn-Dashboard")}
          </div>
          <PortfolioInfo />
        </div>
      </div>
      <Tabs
        value={currentTab}
        className="m-[2px] mr-0 mt-0 flex flex-1 flex-col rounded bg-bg-black p-5"
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex items-center justify-between p-0">
          <div className="flex items-center justify-start space-x-[10px]">
            <TabsTrigger className={tabClx} value="orders">
              My Orders
            </TabsTrigger>
            <TabsTrigger className={tabClx} value="balances">
              My Balances
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
