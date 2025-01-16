import NP from "number-precision";
import React, { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { IMarketplace } from "@/lib/types/marketplace";
import { useSalesVolume } from "@/lib/hooks/api/use-sales-volume";
import { useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";
import { sortBy } from "lodash";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export type IDurationType = "hour" | "day" | "week";

export const Durations: { name: string; value: IDurationType }[] = [
  {
    name: "1h",
    value: "hour",
  },
  {
    name: "1d",
    value: "day",
  },
  {
    name: "1w",
    value: "week",
  },
];

export default function SalesChart({
  marketplace,
  duration,
}: {
  marketplace: IMarketplace;
  duration: IDurationType;
}) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const marketplaceId = marketplace?.market_place_account;

  const { data: salesData, mutate } = useSalesVolume(
    marketplace.chain,
    marketplaceId,
  );
  const { data } = useWsMsgSub(marketplace.chain);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentMsg = data[data.length - 1];
      if (currentMsg.market_id === marketplace?.market_place_account) {
        mutate();
      }
    }
  }, [data]);

  const now = new Date().getTime();
  const oneHourDuration = 3600 * 1000;

  const chartData = useMemo(() => {
    const durationData = (salesData || []).filter((item) => {
      if (duration === "hour") {
        return item.create_at > now - oneHourDuration;
      }
      if (duration === "day") {
        return item.create_at > now - oneHourDuration * 24;
      }
      if (duration === "week") {
        return item.create_at > now - oneHourDuration * 24 * 7;
      }
    });

    const dData = sortBy(durationData, "create_at");

    const col = dData.map((item) => {
      return [
        item.create_at,
        Number(NP.divide(NP.times(item.sales_volume, item.sales_price), 500)),
      ];
    });

    const line = dData.map((item) => {
      return [item.create_at, Number(item.sales_price)];
    });

    const scatter = dData.map((item) => {
      return [item.create_at, Number(item.sales_price)];
    });

    return {
      col,
      line,
      scatter,
    };
  }, [salesData, duration, now, oneHourDuration]);

  const xAxisOptions = useMemo(() => {
    if (duration === "hour") {
      return {
        min: now - oneHourDuration,
        dateTimeLabelFormats: {
          minute: "%H:%M",
        },
      };
    }

    if (duration === "day") {
      return {
        min: now - oneHourDuration * 24,
        // tickInterval: oneHourDuration,
        dateTimeLabelFormats: {
          hour: "%H:%M",
        },
      };
    }

    if (duration === "week") {
      return {
        min: now - oneHourDuration * 24 * 7,
        dateTimeLabelFormats: {
          day: "%e. %b",
        },
      };
    }
  }, [duration]);

  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: "transparent",
        height:
          (window.innerHeight - 56 - 297 - 66 - 86 > 260
            ? window.innerHeight - 56 - 297 - 66 - 86
            : 260) + "px",
      },
      time: {
        useUTC: false,
      },
      title: undefined,
      exporting: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        ...(xAxisOptions as any),
        tickAmount: 5,
        max: now,
        tickWidth: 0,
        title: undefined,
        lineColor: "#303030",
        lineWidth: 1,
        labels: {
          style: {
            color: "#949E9C",
            fontSize: "12px",
          },
        },
        showFirstLabel: true,
      },
      yAxis: [
        {
          lineWidth: 1,
          lineColor: "#303030",
          min: 0,
          gridLineWidth: 1,
          gridLineColor: "#303030",
          title: undefined,
          tickWidth: 0,
          showFirstLabel: false,
          labels: {
            align: "left",
            x: 8,
            style: {
              color: "#949E9C",
              fontSize: "12px",
            },
          },
        },
      ],
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
        shared: true,
        useHTML: true,
        headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
        pointFormat:
          '<tr><td style="color: {series.color}">{series.name} ' +
          "</td>" +
          '<td style="text-align: right"><b>{point.y} ETH</b></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 2,
      },
      series: [
        {
          name: "Column",
          type: "column",
          color: "#346A65",
          column: {
            borderColor: "#346A65",
            borderWidth: 0,
            borderRadius: 40,
            shadow: true,
          },
          data: chartData?.col,
        },
        {
          name: "Line",
          type: "line",
          data: chartData?.line,
          color: "#50d2c1",
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        {
          name: "Scatter",
          type: "scatter",
          marker: {
            symbol: "circle",
            fillColor: "transparent",
            lineColor: "#c0c4cc",
            lineWidth: 1,
            radius: 3,
          },
          data: chartData?.scatter,
        },
      ],
      accessibility: {
        enabled: false,
      },
    }),
    [xAxisOptions, chartData, now],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
}
