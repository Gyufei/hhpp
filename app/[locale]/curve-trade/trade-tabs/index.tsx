import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TabFilter } from "./tab-filter";

const tabClx =
  "flex w-[105px] items-center px-[10px] py-[10px] text-sm leading-5 border-b-2 data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray rounded-none";

export function TradeTabs() {
  const [currentTab, setCurrentTab] = useState("transactions");
  const [hideSmallBalances, setHideSmallBalances] = useState(false);

  return (
    <div className="no-scroll-bar mt-[2px] w-full overflow-x-scroll rounded bg-bg-black p-[10px] sm:w-auto sm:overflow-x-hidden">
      <div className="max-h-[415px] min-w-[820px]">
        <Tabs
          value={currentTab}
          className="flex flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList className="flex items-center justify-between p-0">
            <div className="flex items-center justify-start space-x-[10px]">
              <TabsTrigger className={tabClx} value="transactions">
                Transactions
              </TabsTrigger>
              <TabsTrigger className={tabClx} value="history">
                History
              </TabsTrigger>
            </div>
            <div className="flex items-center space-x-[14px]">
              <TabFilter />
              <HideSmallBalances
                hide={hideSmallBalances}
                onHideChange={setHideSmallBalances}
              />
            </div>
          </TabsList>
          <TabsContent value="orders" className="h-fit"></TabsContent>
          <TabsContent value="history" className="flex-1"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function HideSmallBalances({
  hide,
  onHideChange,
}: {
  hide: boolean;
  onHideChange: (hide: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      <div className="px-1 text-xs leading-[18px] text-title-white">
        Hide Small Balances
      </div>
      <Checkbox checked={hide} onCheckedChange={onHideChange} />
    </div>
  );
}
