"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import Drawer from "react-modern-drawer";
import { cn } from "@/lib/utils/common";

export default function MarketFoldPop() {
  const t = useTranslations("Common");
  const { data: marketplaceData } = useMarketplaces();

  const [popOpen, setPopOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { isMobileSize } = useDeviceSize();

  const cateList = useMemo(() => {
    return (marketplaceData || [])
      .filter((m) => m.status !== "offline")
      .map((marketplace) => {
        return {
          name: marketplace.market_name,
          id: marketplace.market_symbol,
          tokenLogo: marketplace.projectLogo,
          link: marketplace.market_symbol,
        };
      });
  }, [marketplaceData]);

  const filteredCateList = useMemo(
    () =>
      searchText
        ? cateList.filter((cate) =>
            cate.name
              .toLocaleUpperCase()
              .includes(searchText.toLocaleUpperCase()),
          )
        : cateList,
    [cateList, searchText],
  );

  function renderContent() {
    return (
      <>
        <div className="relative pb-[10px]">
          <Image
            src={
              isInputFocused ? "/icons/search.svg" : "/icons/search-gray.svg"
            }
            width={20}
            height={20}
            alt="search"
            className="absolute left-[7px] top-[10px] "
          />
          <Input
            placeholder={t("Search")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="h-10 rounded-lg border-border-black bg-bg-black pl-8 text-title-white placeholder:text-gray focus:border-txt-white"
          />
        </div>
        {filteredCateList.map((cate, i) => (
          <PopMarketItem
            key={cate.id}
            id={cate.id}
            name={cate.name}
            link={cate.link}
            logo={cate.tokenLogo}
            index={i}
          />
        ))}
      </>
    );
  }

  if (isMobileSize) {
    return (
      <div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-black"
          onClick={() => setPopOpen(!popOpen)}
        >
          <Image
            src={popOpen ? "/icons/fold.svg" : "/icons/fold-gray.svg"}
            width={20}
            height={20}
            alt="fold"
          />
        </button>
        <Drawer
          open={popOpen}
          onClose={() => setPopOpen(!popOpen)}
          direction={"bottom"}
          size={"calc(100vh - 100px)"}
          className="flex flex-col overflow-y-auto rounded !bg-bg-black p-4"
        >
          <MobileDrawerTitle
            title={t("Switch")}
            onClose={() => setPopOpen(!popOpen)}
          />
          {renderContent()}
        </Drawer>
      </div>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-black">
          <Image
            src={popOpen ? "/icons/fold.svg" : "/icons/fold-gray.svg"}
            width={20}
            height={20}
            alt="fold"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[240px] flex-col items-stretch border border-border-black bg-bg-black p-2"
      >
        {renderContent()}
      </PopoverContent>
    </Popover>
  );
}

function PopMarketItem({
  id,
  name,
  link,
  logo,
  index,
}: {
  id: string;
  name: string;
  link: string;
  logo: string;
  index: number;
}) {
  const router = useRouter();

  const [isHover, setIsHover] = useState(false);

  function handleGo(id: string) {
    router.push(`/direct-trade/${id}`);
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex cursor-pointer rounded-lg px-2 py-2"
      onClick={() => handleGo(id)}
      key={name}
      style={{
        marginTop: index === 0 ? 0 : 12,
      }}
    >
      <Image
        src={logo}
        width={40}
        height={40}
        alt="avatar"
        className="rounded-full"
      />
      <div className="ml-[10px] flex flex-col">
        <div
          className={cn(
            "text-sm leading-[20px] text-title-white",
            isHover ? "text-main" : "",
          )}
        >
          {name}
        </div>
        <div
          style={{
            width: "150px",
          }}
          className={cn(
            "mt-[2px] w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-[18px] text-gray",
            isHover ? "text-main" : "",
          )}
        >
          {link}
        </div>
      </div>
    </div>
  );
}
