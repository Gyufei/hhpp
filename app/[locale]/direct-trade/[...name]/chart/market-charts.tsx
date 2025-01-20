"use client";

import Image from "next/image";
import { useState } from "react";
import SalesChart, { Durations, IDurationType } from "./sales-chart";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/common";
import { TradingChart } from "@/app/[locale]/curve-trade/trade-chart";

const OpenKline = false as const;

export default function MarketCharts({
  marketplace,
  showKChart,
  setShowKChart,
}: {
  marketplace: IMarketplace;
  showKChart: boolean;
  setShowKChart: (show: boolean) => void;
}) {
  const [duration, setDuration] = useState<IDurationType>(Durations[0].value);

  function handleChangeDuration(duration: IDurationType) {
    setDuration(duration);
  }

  function handleShowKChart() {
    if (!OpenKline) return;
    setShowKChart(true);
  }

  return (
    <div
      className={cn(
        "flex flex-col p-[10px] transition-all duration-300",
        showKChart ? "relative h-full" : "",
      )}
    >
      {showKChart ? (
        <>
          <div className="absolute bottom-[135px] left-[84px] flex h-[33px] w-[33px] items-center justify-center rounded-full border border-border-black">
            <Image
              src="/icons/line-chart.svg"
              width={20}
              height={20}
              alt="line-chart"
              className=" cursor-pointer"
              onClick={() => setShowKChart(false)}
            />
          </div>
          <TradingChart />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between space-x-[6px] sm:w-auto sm:justify-start">
              <SaleBtn />
            </div>
            <div className="flex items-center justify-end space-x-[10px]">
              <DurationSelect
                duration={duration}
                handleChangeDuration={handleChangeDuration}
              />
              {OpenKline && (
                <>
                  <div className="h-5 w-[1px] bg-border-black"></div>
                  <Image
                    onClick={handleShowKChart}
                    src="/icons/k-chart.svg"
                    width={20}
                    height={20}
                    alt="k-chart"
                    className="cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-5 ">
            <SalesChart duration={duration} marketplace={marketplace} />
          </div>
        </>
      )}
    </div>
  );
}

function SaleBtn() {
  const T = useTranslations("Marketplace");

  return (
    <div className="flex space-x-1 rounded border border-border-black bg-bg-black p-1">
      <div className="flex cursor-pointer items-center rounded bg-main bg-transparent px-3 py-[6px]">
        <Image src={"/icons/sales.svg"} width={20} height={20} alt="sales" />
        <div className="ml-[6px] text-sm leading-5 text-bg-black">
          {T("Sales")}
        </div>
      </div>
    </div>
  );
}

function DurationSelect({
  duration,
  handleChangeDuration,
}: {
  duration: string;
  handleChangeDuration: (_duration: IDurationType) => void;
}) {
  return (
    <div className="flex items-center space-x-1">
      {Durations.map((d) => (
        <div
          key={d.value}
          data-checked={duration === d.value}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm leading-5 text-gray hover:text-main data-[checked=true]:text-main"
          onClick={() => handleChangeDuration(d.value)}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
}
