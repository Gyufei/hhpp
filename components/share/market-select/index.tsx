import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import MarketTable from "./market-table";
import { cn } from "@/lib/utils/common";
import { useMarketplacesDisplay } from "@/lib/hooks/api/use-marketplaces-display";

// 格式化日期为"DD MMM YY"格式
const formatDateTab = (expiryDate: string) => {
  const year = expiryDate.slice(0, 4);
  const monthStr = expiryDate.slice(4, 6);
  const dayStr = expiryDate.slice(6, 8);

  const monthNumber = parseInt(monthStr);

  // 日去除前导零
  const day = parseInt(dayStr).toString(); // 如 "01" → "1"

  // 月转换为三位字母
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthAbbr = monthNames[monthNumber - 1];

  return `${day} ${monthAbbr} ${year.slice(2)}`;
};

export default function MarketSelect() {
  const { data: marketplaceData, isLoading } = useMarketplacesDisplay();

  const [popOpen, setPopOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState<string>("All");

  const marketList = useMemo(() => {
    return (marketplaceData || []).filter(
      (m) => m.market_place_status !== "offline",
    );
  }, [marketplaceData]);

  const TabsArr = useMemo(() => {
    return ["All", ...new Set(marketList.map((m) => m.expiry_date))];
  }, [marketList]);

  const filteredMarkets = useMemo(() => {
    // 先按搜索文本筛选
    const textFiltered = searchText
      ? marketList.filter((market) =>
          String(market.token_name)
            .toLocaleUpperCase()
            .includes(searchText.toLocaleUpperCase()),
        )
      : marketList;

    // 如果选择了日期标签，按创建时间筛选
    if (currentTab !== "All") {
      return textFiltered.filter((market) => {
        return market.expiry_date === currentTab;
      });
    }

    return textFiltered;
  }, [marketList, searchText, currentTab]);

  return (
    <>
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger className="flex items-center">
          <Image
            src={"/icons/fold-gray.svg"}
            width={20}
            height={20}
            alt="fold"
          />
        </PopoverTrigger>
        <PopoverContent className="ml-2 mt-4 flex max-h-[500px] w-[956px] flex-col border border-border-black bg-bg-black p-[10px]">
          <div className="relative mb-[10px]">
            <Input
              placeholder={"Search coins"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-8 rounded border-border-black bg-bg-black px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
            />
          </div>
          <SwitchTabs
            tabs={TabsArr}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <MarketTable marketList={filteredMarkets} isLoading={isLoading} />
        </PopoverContent>
      </Popover>
    </>
  );
}

function SwitchTabs({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: string[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) {
  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
  };

  // 创建一个可滚动的日期标签容器
  return (
    <div className="scrollbar-hover relative mb-[10px] min-h-10 w-full flex-1 overflow-x-auto overflow-y-hidden bg-bg-black">
      <div className="flex items-center justify-start overflow-y-hidden">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "z-10 flex items-center justify-center whitespace-nowrap p-[10px] text-sm leading-5 transition-all",
              currentTab === tab
                ? "bg-[#2D2E33] text-title-white" // 选中时整个背景变为灰色
                : "cursor-pointer text-gray",
            )}
          >
            {tab === "All" ? "All Coins" : formatDateTab(tab)}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 h-1 w-full border-b border-border-black transition-all"></div>
    </div>
  );
}
