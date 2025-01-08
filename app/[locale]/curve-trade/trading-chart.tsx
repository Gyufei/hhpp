import TradingViewWidget from "./trading-view-widget";

// import {
//   ChartingLibraryWidgetOptions,
//   ResolutionString,
// } from "/public/charting_library/charting_library";

// const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
//   symbol: "AAPL",
//   interval: "1D" as ResolutionString,
//   library_path: "/static/charting_library/",
//   locale: "en",
//   charts_storage_url: "https://saveload.tradingview.com",
//   charts_storage_api_version: "1.1",
//   client_id: "tradingview.com",
//   user_id: 0,
//   fullscreen: false,
//   autosize: true,
// };

export function TradingChart() {
  return (
    <div className="flex-1 basis-[560px]">
      <TradingViewWidget />;
    </div>
  );
}
