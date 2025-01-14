import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TabFilter } from "./tab-filter";
import { TransactionsTable } from "./transactions-table";

const tabClx =
  "flex w-[105px] items-center px-[10px] py-[10px] text-sm leading-5 border-b data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray rounded-none";

export function TradeTabs() {
  const [currentTab, setCurrentTab] = useState("transactions");
  const [hideSmallBalances, setHideSmallBalances] = useState(false);

  return (
    <div className="mt-[2px] rounded bg-bg-black p-[10px]">
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
        <TabsContent value="transactions" className="h-fit">
          <TransactionsTable />
        </TabsContent>
        <TabsContent value="history" className="flex-1">
          <div className="h-[115px]"></div>
        </TabsContent>
      </Tabs>
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
