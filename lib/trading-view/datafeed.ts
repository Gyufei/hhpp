import { apiFetcher } from "../fetcher";
import { ApiPaths, WithApiHost } from "../PathMap";
import { IMarketplace } from "../types/marketplace";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

const lastBarsCache = new Map();

// DatafeedConfiguration implementation
const configurationData = {
  exchanges: [
    {
      value: "hypeTrade",
      name: "hypeTrade",
    },
  ],
  supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
  units: [],
  currency_codes: "",
  support_marks: false,
  support_time: false,
  support_timescale_marks: false,
  symbols_types: [],
  symbols_grouping: [],
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
  const data = await apiFetcher(WithApiHost(ApiPaths.markets));

  const allSymbols: any = data.map((market: IMarketplace) => {
    return {
      symbol: market.market_symbol,
      full_name: `${market.market_name}/USDC`,
      description: `${market.market_name}/USDC`,
      exchange: "hypeTrade",
      type: "",
    };
  });

  console.log("[getAllSymbols]: Method call", allSymbols);
  return allSymbols;
}

const datafeed = {
  onReady: (callback: any) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any,
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol: any) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName: any,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any,
    // extension: any,
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ symbol }: any) => symbol === symbolName);
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }

    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      timezone: "Etc/UTC",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      has_intraday: true, //true => support time scale
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming",
    };
    console.log(symbolInfo);

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any,
    onErrorCallback: any,
  ) => {
    console.log("periodParams", periodParams);
    const { from, to, firstDataRequest } = periodParams;
    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);

    const allMarkets = await apiFetcher(WithApiHost(ApiPaths.markets));
    const marketData = allMarkets.find(
      ({ market_symbol }: any) => market_symbol === symbolInfo.name,
    );
    const marketAccount = marketData.market_place_account;

    const resolutionMap = {
      1: 60,
      5: 300,
      15: 900,
      30: 1800,
      60: 3600,
      "1D": 86400,
      "1W": 604800,
      "1M": 2592000,
    };

    const urlParameters = {
      market_place_account: marketAccount,
      from,
      to,
      interval: (resolutionMap as any)[resolution] || 60,
    };

    const query = Object.keys(urlParameters)
      .map(
        (name: string) =>
          `${name}=${encodeURIComponent(
            urlParameters[name as keyof typeof urlParameters],
          )}`,
      )
      .join("&");

    try {
      const data = await apiFetcher(
        WithApiHost(ApiPaths.marketKline) + `?${query}`,
      );

      if (firstDataRequest && data.length === 0) {
        onHistoryCallback([], {
          noData: true,
        });
        return;
      }

      const bars: any = [];
      data.map((item: any) => {
        if (item.time >= from && item.time < to) {
          bars.push({
            time: item.time * 1000,
            low: item.low,
            high: item.high,
            open: item.open,
            close: item.close,
            volume: item.volume,
          });
        }
      });
      console.log("[getBars]: Get history", bars);

      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.name, {
          ...bars[bars.length - 1],
        });
      }

      onHistoryCallback(bars);
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscriberUID: any,
    onResetCacheNeededCallback: any,
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID,
    );
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.name),
    );
  },

  unsubscribeBars: (subscriberUID: any) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID,
    );
    unsubscribeFromStream(subscriberUID);
  },
};

export default datafeed;
