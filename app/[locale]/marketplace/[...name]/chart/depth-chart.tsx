import React, { useMemo, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighChartsMouseWheelZoom from "highcharts/modules/mouse-wheel-zoom";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighChartsMouseWheelZoom(Highcharts);
}

const data = new Array(20).fill(1).map((_, i) => {
  return [i, 50 + Math.floor(Math.random() * 50)];
});

export default function DepthChart(props: any) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options = useMemo<Options>(
    () => ({
      chart: {
        type: "area",
        backgroundColor: "transparent",
        height: "249px",
        zoomType: "xy",
      },
      title: undefined,
      exporting: {
        enabled: false,
      },
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        tickWidth: 0,
        tickLength: 0,
        title: undefined,
        lineColor: "#F0F1F5",
        lineWidth: 1,
        labels: {
          style: {
            color: "#99A0AF",
            fontSize: "12px",
          },
        },
        crosshair: {
          width: 1,
          color: "red",
        },
      },
      yAxis: {
        lineWidth: 1,
        lineColor: "#F0F1F5",
        min: 0,
        gridLineWidth: 0,
        title: undefined,
        tickWidth: 0,
        tickLength: 0,
        tickPosition: "inside",
        showFirstLabel: false,
        labels: {
          align: "left",
          x: 4,
          style: {
            color: "#99A0AF",
            fontSize: "12px",
          },
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: "center",
        },
      },
      tooltip: {
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
          name: "Bids",
          type: "area",
          data: data,
          color: "#D8F369",
        },
      ],
      accessibility: {
        enabled: false,
      },
    }),
    [],
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
}
