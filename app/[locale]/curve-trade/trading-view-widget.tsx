/* eslint-disable react/jsx-no-target-blank */
// import { useEffect, useRef } from "react";
// import {
//   ChartingLibraryWidgetOptions,
//   LanguageCode,
//   ResolutionString,
//   widget,
// } from "/public/charting_library/charting_library";
import { useEffect, useRef, memo } from "react";

let hasInit = false;
function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasInit) return;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "1",
          "timezone": "Asia/Shanghai",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "background": "#111a1e",
          "allow_symbol_change": false,
          "hide_side_toolbar": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    if (container.current) {
      (container.current as any).appendChild(script);
    }
    hasInit = true;
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);

// export default function TradingViewWidget(
//   props: Partial<ChartingLibraryWidgetOptions>,
// ) {
//   const chartContainerRef =
//     useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

//   useEffect(() => {
//     const widgetOptions: ChartingLibraryWidgetOptions = {
//       symbol: props.symbol,
//       // BEWARE: no trailing slash is expected in feed URL
//       datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
//         "https://demo_feed.tradingview.com",
//         undefined,
//         {
//           maxResponseLength: 1000,
//           expectedOrder: "latestFirst",
//         },
//       ),
//       interval: props.interval as ResolutionString,
//       container: chartContainerRef.current,
//       library_path: props.library_path,
//       locale: props.locale as LanguageCode,
//       disabled_features: ["use_localstorage_for_settings"],
//       enabled_features: ["study_templates"],
//       charts_storage_url: props.charts_storage_url,
//       charts_storage_api_version: props.charts_storage_api_version,
//       client_id: props.client_id,
//       user_id: props.user_id,
//       fullscreen: props.fullscreen,
//       autosize: props.autosize,
//     };

//     const tvWidget = new widget(widgetOptions);

//     tvWidget.onChartReady(() => {
//       tvWidget.headerReady().then(() => {
//         const button = tvWidget.createButton();
//         button.setAttribute("title", "Click to show a notification popup");
//         button.classList.add("apply-common-tooltip");
//         button.addEventListener("click", () =>
//           tvWidget.showNoticeDialog({
//             title: "Notification",
//             body: "TradingView Charting Library API works correctly",
//             callback: () => {
//               console.log("Noticed!");
//             },
//           }),
//         );

//         button.innerHTML = "Check API";
//       });
//     });

//     return () => {
//       tvWidget.remove();
//     };
//   }, [props]);

//   return <div ref={chartContainerRef} className="h-[calc(100vh-60px)]" />;
// }
