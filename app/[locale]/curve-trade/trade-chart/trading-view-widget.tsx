import { useEffect, useRef } from "react";
import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
} from "public/charting_library/charting_library";
import datafeed from "@/lib/trading-view/datafeed";
import { useLocale } from "next-intl";

export function TradingViewWidget({ symbol }: { symbol: string }) {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const locale = useLocale();

  useEffect(() => {
    const tvConfig: ChartingLibraryWidgetOptions = {
      container: chartContainerRef.current,
      datafeed,
      symbol: symbol,
      interval: "1D" as ResolutionString,
      library_path: "/charting_library/charting_library/",
      locale: locale as LanguageCode,
      timezone: "Asia/Shanghai",
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "0",
      user_id: "0",
      fullscreen: false,
      autosize: true,
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "header_screenshot",
        "symbol_search_hot_key",
        "allow_arbitrary_symbol_search_input",
        "save_shortcut",
      ],
      enabled_features: [],
      overrides: {
        "paneProperties.backgroundType": "solid", // or 'gradient'
        "paneProperties.background": "#111a1e",
      },
      theme: "dark",
      custom_css_url: "/charting_library/themed.css",
    };

    const tvWidget = new widget(tvConfig);

    return () => {
      tvWidget.remove();
    };
  }, [locale]);

  return (
    <div
      id="tv_chart_container"
      ref={chartContainerRef}
      className="h-full w-full"
    />
  );
}
