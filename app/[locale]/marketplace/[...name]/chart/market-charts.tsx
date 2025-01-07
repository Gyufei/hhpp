"use client";

import Image from "next/image";
import { useState } from "react";
import DepthChart from "./depth-chart";
import SalesChart, { Durations, IDurationType } from "./sales-chart";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";

type IChartType = "depth" | "sales";

export default function MarketCharts({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const [chartType, setChartType] = useState<IChartType>("sales");
  const [duration, setDuration] = useState<IDurationType>(Durations[0].value);

  function handleChangType(type: IChartType) {
    setChartType(type);
  }

  function handleChangeDuration(duration: IDurationType) {
    setDuration(duration);
  }

  return (
    <div className="flex h-[336px] flex-col rounded-3xl bg-bg-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between space-x-[6px] sm:w-auto sm:justify-start">
          <ChartSwitch
            chartType={chartType}
            handleChangeType={handleChangType}
          />
          {chartType === "sales" && (
            <DurationSelect
              duration={duration}
              handleChangeDuration={handleChangeDuration}
            />
          )}
        </div>

        {/* <div className="hidden cursor-pointer items-center justify-center rounded-full p-[6px] sm:flex">
          <Image src="/icons/extend.svg" width={20} height={20} alt="extend" />
        </div> */}
      </div>

      <div className="mt-5 h-[280px]">
        {chartType === "sales" ? (
          <SalesChart duration={duration} marketplace={marketplace} />
        ) : (
          <DepthChart />
        )}
      </div>
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
  // const isDepth = chartType === "depth";
  const isSales = chartType === "sales";
  return (
    <div className="flex space-x-1 rounded-full border border-border-black bg-bg-black p-1">
      {/* <div
        data-checked={isDepth}
        className="flex cursor-pointer items-center rounded-full bg-transparent data-[checked=true]:bg-bg-black data-[checked=true]:px-3 data-[checked=false]:px-[6px] data-[checked=true]:py-[6px]"
        onClick={() => handleChangeType("depth")}
      >
        <Image
          src={isDepth ? "/icons/depth.svg" : "/icons/depth-gray.svg"}
          width={20}
          height={20}
          alt="depth"
        />
        {isDepth && (
          <div className="ml-[6px] text-sm leading-5 text-txt-white">{t('tg-Depth')}</div>
        )}
      </div> */}
      <div
        data-checked={isSales}
        className="flex cursor-pointer items-center rounded-full bg-transparent data-[checked=true]:bg-main data-[checked=false]:px-[6px] data-[checked=true]:px-3 data-[checked=true]:py-[6px]"
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
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm leading-5 text-gray data-[checked=true]:text-txt-white"
          onClick={() => handleChangeDuration(d.value)}
        >
          {d.name}
        </div>
      ))}
    </div>
  );
}
