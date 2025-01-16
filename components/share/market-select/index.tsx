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

export default function MarketSelect() {
  const { data: marketplaceData, isLoading } = useMarketplaces();

  const [popOpen, setPopOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState<ITab>("All");

  const marketList = useMemo(() => {
    return (marketplaceData || []).filter((m) => m.status !== "offline");
  }, [marketplaceData]);

  const filteredMarkets = useMemo(
    () =>
      searchText
        ? marketList.filter((market) =>
            market.market_name
              .toLocaleUpperCase()
              .includes(searchText.toLocaleUpperCase()),
          )
        : marketList,
    [marketList, searchText],
  );

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

type ITab = "All" | "New";
const TabsArr: ITab[] = ["All", "New"];

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

  return (
    <div className="mb-[10px] h-10 w-full bg-bg-black">
      <div className="relative flex items-center justify-start">
        {TabsArr.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "z-10 flex items-center justify-center border-b p-[10px] text-sm leading-5 text-gray transition-all",
              currentTab === tab
                ? "border-main text-title-white"
                : "cursor-pointer border-transparent",
            )}
          >
            {tab === "All" ? "All Coins" : "New"}
          </div>
        ))}
        <div className="absolute bottom-0 h-1 w-full border-b border-border-black transition-all"></div>
      </div>
    </div>
  );
}
