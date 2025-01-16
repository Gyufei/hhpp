"use client";

import Image from "next/image";
import { useState } from "react";
import DepthChart from "./depth-chart";
import SalesChart, { Durations, IDurationType } from "./sales-chart";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/common";
import { TradingChart } from "@/app/[locale]/curve-trade/trade-chart";

type IChartType = "depth" | "sales";
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
  const [chartType, setChartType] = useState<IChartType>("sales");
  const [duration, setDuration] = useState<IDurationType>(Durations[0].value);

  function handleChangType(type: IChartType) {
    setChartType(type);
  }

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
              <ChartSwitch
                chartType={chartType}
                handleChangeType={handleChangType}
              />
            </div>
            <div className="flex items-center justify-end space-x-[10px]">
              {chartType === "sales" && (
                <DurationSelect
                  duration={duration}
                  handleChangeDuration={handleChangeDuration}
                />
              )}
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
            {chartType === "sales" ? (
              <SalesChart duration={duration} marketplace={marketplace} />
            ) : (
              <DepthChart />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ChartSwitch({
  chartType,
  handleChangeType,
}: {
  chartType: IChartType;
  handleChangeType: (_type: IChartType) => void;
}) {
  const t = useTranslations("ct-Marketplace");
  const isSales = chartType === "sales";
  return (
    <div className="flex space-x-1 rounded border border-border-black bg-bg-black p-1">
      <div
        data-checked={isSales}
        className="flex cursor-pointer items-center rounded bg-transparent data-[checked=true]:bg-main data-[checked=false]:px-[6px] data-[checked=true]:px-3 data-[checked=true]:py-[6px]"
        onClick={() => handleChangeType("sales")}
      >
        <Image
          src={isSales ? "/icons/sales.svg" : "/icons/sales-gray.svg"}
          width={20}
          height={20}
          alt="sales"
        />
        {isSales && (
          <div className="ml-[6px] text-sm leading-5 text-bg-black">
            {t("tg-Sales")}
          </div>
        )}
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
