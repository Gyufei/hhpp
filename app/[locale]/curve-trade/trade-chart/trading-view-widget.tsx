import { useEffect, useRef } from "react";

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  LanguageCode,
  widget,
} from "public/charting_library/charting_library.min.js";

const config: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "AAPL",
  interval: "1D" as ResolutionString,
  library_path: "/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "0",
  user_id: "0",
  fullscreen: false,
  autosize: true,
};

let init = false;
export function TradingViewWidget() {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (init) return;

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: config.symbol as string,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        "https://demo_feed.tradingview.com",
        undefined,
        {
          maxResponseLength: 1000,
          expectedOrder: "latestFirst",
        },
      ),
      interval: config.interval as ResolutionString,
      container_id: "tv_chart_container",
      library_path: config.library_path,
      locale: config.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: config.charts_storage_url,
      charts_storage_api_version: config.charts_storage_api_version,
      client_id: config.client_id,
      user_id: config.user_id,
      fullscreen: config.fullscreen,
      autosize: config.autosize,
      custom_css_url: "/charting_library/themed.css",
      time_frames: [
        { text: "1y", resolution: "1W" },
        { text: "6m", resolution: "3D" },
        { text: "3m", resolution: "1D" },
        { text: "1m", resolution: "1D" },
        { text: "1w", resolution: "30" },
        { text: "3d", resolution: "30" },
        { text: "1d", resolution: "30" },
        { text: "6h", resolution: "15" },
        { text: "1h", resolution: "1" },
      ],
      overrides: {
        "symbolWatermarkProperties.color": "rgba(0,0,0, 0)",
        "paneProperties.background": "#20334d",
        "paneProperties.vertGridProperties.color": "#344568",
        "paneProperties.horzGridProperties.color": "#344568",
        "paneProperties.crossHairProperties.color": "#58637a",
        "paneProperties.crossHairProperties.style": 2,
        "mainSeriesProperties.style": 9,
        "mainSeriesProperties.showCountdown": false,
        "scalesProperties.showSeriesLastValue": true,
        "mainSeriesProperties.visible": false,
        "mainSeriesProperties.showPriceLine": false,
        "mainSeriesProperties.priceLineWidth": 1,
        "mainSeriesProperties.lockScale": false,
        "mainSeriesProperties.minTick": "default",
        "mainSeriesProperties.extendedHours": false,
        volumePaneSize: "tiny",
        editorFontsList: [
          "Lato",
          "Arial",
          "Verdana",
          "Courier New",
          "Times New Roman",
        ],
        "paneProperties.topMargin": 5,
        "paneProperties.bottomMargin": 5,
        "paneProperties.leftAxisProperties.autoScale": true,
        "paneProperties.leftAxisProperties.autoScaleDisabled": false,
        "paneProperties.leftAxisProperties.percentage": false,
        "paneProperties.leftAxisProperties.percentageDisabled": false,
        "paneProperties.leftAxisProperties.log": false,
        "paneProperties.leftAxisProperties.logDisabled": false,
        "paneProperties.leftAxisProperties.alignLabels": true,
        // "paneProperties.legendProperties.showStudyArguments": true,
        "paneProperties.legendProperties.showStudyTitles": true,
        "paneProperties.legendProperties.showStudyValues": true,
        "paneProperties.legendProperties.showSeriesTitle": true,
        "paneProperties.legendProperties.showSeriesOHLC": true,
        "scalesProperties.showLeftScale": false,
        "scalesProperties.showRightScale": true,
        "scalesProperties.backgroundColor": "#20334d",
        "scalesProperties.lineColor": "#46587b",
        "scalesProperties.textColor": "#8f98ad",
        "scalesProperties.scaleSeriesOnly": false,
        "mainSeriesProperties.priceAxisProperties.autoScale": true,
        "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
        "mainSeriesProperties.priceAxisProperties.percentage": false,
        "mainSeriesProperties.priceAxisProperties.percentageDisabled": false,
        "mainSeriesProperties.priceAxisProperties.log": false,
        "mainSeriesProperties.priceAxisProperties.logDisabled": false,
        "mainSeriesProperties.candleStyle.upColor": "#3fcfb4",
        "mainSeriesProperties.candleStyle.downColor": "#fe4761",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderColor": "#3fcfb4",
        "mainSeriesProperties.candleStyle.borderUpColor": "#3fcfb4",
        "mainSeriesProperties.candleStyle.borderDownColor": "#fe4761",
        "mainSeriesProperties.candleStyle.wickColor": "#737375",
        "mainSeriesProperties.candleStyle.wickUpColor": "#3fcfb4",
        "mainSeriesProperties.candleStyle.wickDownColor": "#fe4761",
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.hollowCandleStyle.upColor": "#3fcfb4",
        "mainSeriesProperties.hollowCandleStyle.downColor": "#fe4761",
        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.borderColor": "#3fcfb4",
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#3fcfb4",
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#fe4761",
        "mainSeriesProperties.hollowCandleStyle.wickColor": "#737375",
        "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#3fcfb4",
        "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#fe4761",
        "mainSeriesProperties.haStyle.upColor": "#3fcfb4",
        "mainSeriesProperties.haStyle.downColor": "#fe4761",
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.borderColor": "#3fcfb4",
        "mainSeriesProperties.haStyle.borderUpColor": "#3fcfb4",
        "mainSeriesProperties.haStyle.borderDownColor": "#fe4761",
        "mainSeriesProperties.haStyle.wickColor": "#737375",
        "mainSeriesProperties.haStyle.wickUpColor": "#3fcfb4",
        "mainSeriesProperties.haStyle.wickDownColor": "#fe4761",
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.upColor": "#3fcfb4",
        "mainSeriesProperties.barStyle.downColor": "#fe4761",
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        "mainSeriesProperties.lineStyle.color": "#0cbef3",
        "mainSeriesProperties.lineStyle.linestyle": 0,
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.color1": "#0cbef3",
        "mainSeriesProperties.areaStyle.color2": "#0098c4",
        "mainSeriesProperties.areaStyle.linecolor": "#0cbef3",
        "mainSeriesProperties.areaStyle.linestyle": 0,
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.transparency": 80,
      },
    };

    const tvWidget = new widget(widgetOptions);

    init = true;

    return () => {
      if (!init) {
        tvWidget.remove();
      }
    };
  }, []);

  return (
    <div id="tv_chart_container" ref={chartContainerRef} className="h-full" />
  );
}
