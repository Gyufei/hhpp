import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import MarketTable from "./market-table";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { cn } from "@/lib/utils/common";

// 生成未来几天的日期标签
const generateDateTabs = () => {
  const dates = [];
  const today = new Date();

  // 添加"All"选项
  dates.push("All");

  // 添加未来7天的日期
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.getTime());
  }

  return dates;
};

// 格式化日期为"DD MMM YY"格式
const formatDateTab = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = [
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
  ][date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
};

type ITab = "All" | number | string; // 改为"All"或时间戳
const TabsArr: ITab[] = generateDateTabs();

export default function MarketSelect() {
  const { data: marketplaceData, isLoading } = useMarketplaces();

  const [popOpen, setPopOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState<ITab>("All");

  const marketList = useMemo(() => {
    return (marketplaceData || []).filter((m) => m.status !== "offline");
  }, [marketplaceData]);

  const filteredMarkets = useMemo(() => {
    // 先按搜索文本筛选
    const textFiltered = searchText
      ? marketList.filter((market) =>
          market.market_name
            .toLocaleUpperCase()
            .includes(searchText.toLocaleUpperCase()),
        )
      : marketList;

    // 如果选择了日期标签，按创建时间筛选
    if (currentTab !== "All" && typeof currentTab === "number") {
      const selectedDate = new Date(currentTab);
      const nextDay = new Date(currentTab);
      nextDay.setDate(selectedDate.getDate() + 1);

      return textFiltered.filter((market) => {
        const marketDate = new Date(Number(market.trading_starts_at));
        return marketDate >= selectedDate && marketDate < nextDay;
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
        <PopoverContent className="ml-2 mt-4 flex w-[956px] flex-col border border-border-black bg-bg-black p-[10px]">
          <div className="relative mb-[10px]">
            <Input
              placeholder={"Search coins"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-8 rounded border-border-black bg-bg-black px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
            />
          </div>
          <SwitchTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <MarketTable marketList={filteredMarkets} isLoading={isLoading} />
        </PopoverContent>
      </Popover>
    </>
  );
}

function SwitchTabs({
  currentTab,
  setCurrentTab,
}: {
  currentTab: ITab;
  setCurrentTab: (tab: ITab) => void;
}) {
  const handleTabClick = (tab: ITab) => {
    setCurrentTab(tab);
  };

  // 创建一个可滚动的日期标签容器
  return (
    <div className="mb-[10px] h-10 w-full overflow-x-auto bg-bg-black">
      <div className="relative flex items-center justify-start">
        {TabsArr.map((tab) => (
          <div
            key={typeof tab === "number" ? tab.toString() : tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "z-10 flex items-center justify-center whitespace-nowrap p-[10px] text-sm leading-5 transition-all",
              currentTab === tab
                ? "bg-[#2D2E33] text-title-white" // 选中时整个背景变为灰色
                : "cursor-pointer text-gray",
            )}
          >
            {tab === "All" ? "All Coins" : formatDateTab(tab as number)}
          </div>
        ))}
        <div className="absolute bottom-0 h-1 w-full border-b border-border-black transition-all"></div>
      </div>
    </div>
  );
}
