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
