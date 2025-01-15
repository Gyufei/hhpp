import { useRef } from "react";
import Script from "next/script";
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "public/charting_library/charting_library.standalone";

const config:
  | Partial<ChartingLibraryWidgetOptions> & {
      [key: string]: any;
    } = {
  symbol: "intel.tkn.near",
  interval: "1" as ResolutionString,
  library_path: "https://dynamic-moxie-09a484.netlify.app/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "0",
  user_id: "0",
  fullscreen: false,
  autosize: true,
  disabled_features: ["use_localstorage_for_settings"],
  enabled_features: ["study_templates"],
  theme: "dark"
};

export function TradingViewWidget() {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  function initOnReady() {
    // const subscriptions = {};
    const timezone =
      {
        "-780": "Pacific/Fakaofo",
        "-765": "Pacific/Chatham",
        "-720": "Pacific/Auckland",
        "-660": "Pacific/Norfolk",
        "-540": "Asia/Seoul",
        "-600": "Australia/Brisbane",
        "-570": "Australia/Adelaide",
        "-480": "Asia/Chongqing",
        "-420": "Asia/Bangkok",
        "-390": "Asia/Yangon",
        "-360": "Asia/Almaty",
        "-330": "Asia/Colombo",
        "-345": "Asia/Kathmandu",
        "-300": "Asia/Ashkhabad",
        "-240": "Asia/Dubai",
        "-210": "Asia/Tehran",
        "-180": "Asia/Bahrain",
        "-120": "Africa/Cairo",
        "-60": "Africa/Casablanca",
        0: "Atlantic/Reykjavik",
        180: "America/Sao_Paulo",
        240: "America/Santiago",
        300: "America/Bogota",
        360: "America/Chicago",
        420: "US/Mountain",
        480: "America/Los_Angeles",
        540: "America/Anchorage",
        600: "Pacific/Honolulu",
      }[new Date().getTimezoneOffset().toString()] ?? "Etc/UTC"; // TODO doesn't work

    const latestBars: any = {};
    const subscribers: any = {};
    const datafeed = {
      onReady: (callback: any) => {
        console.log("Loading TradingView");
        setTimeout(() =>
          callback({
            supports_search: true,
            supports_group_request: false,
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true,
            supported_resolutions: ["1", "5", "15", "60", "4h", "D", "W"],
          }),
        );
      },
      searchSymbols: async (
        userInput: any,
        exchange: any,
        symbolType: any,
        onResultReadyCallback: any,
      ) => {
        console.log(`Searching ${userInput}`);
        const results = await fetch(
          `https://prices.intear.tech/token-search?q=${encodeURIComponent(
            userInput,
          )}&n=20`,
        ).then((res) => res.json());
        const symbols = results.map(async (result: any) => {
          const metadata = await getMetadata(result.account_id);
          const icon = metadata.icon;
          return {
            description: metadata.name,
            exchange,
            symbol: metadata.symbol,
            ticker: result.account_id,
            timezone,
            logo_urls: icon ? [icon] : [],
          };
        });
        const readySymbols = await Promise.all(symbols);
        onResultReadyCallback(readySymbols);
      },
      resolveSymbol: async (
        symbolName: any,
        onSymbolResolvedCallback: any,
        // onResolveErrorCallback: any,
        // extension: any,
      ) => {
        console.log(`Loading ${symbolName}`);
        const metadata = await getMetadata(symbolName);
        const price = await fetch(
          `https://prices.intear.tech/price?token_id=${symbolName}`,
        ).then((data) => data.json());
        const digits = Math.ceil(Math.max(0, -Math.log10(price))) + 3;
        onSymbolResolvedCallback({
          ticker: symbolName,
          name: metadata.name,
          description: `${metadata.symbol}/USD`,
          type: "crypto",
          session: "24x7",
          timezone,
          exchange: "Intear",
          minmov: 1,
          pricescale: 10 ** digits,
          has_intraday: true,
          intraday_multipliers: ["1", "60"],
          has_daily: true,
          daily_multipliers: ["1"],
          has_empty_bars: true,
          has_weekly_and_monthly: false,
          visible_plots_set: "ohlc",
          volume_precision: 2,
          data_status: "streaming",
          logo_urls: metadata.icon ? [metadata.icon] : [],
        });
      },
      getBars: async (
        symbolInfo: any,
        resolution: any,
        periodParams: any,
        onHistoryCallback: any,
        // onErrorCallback: any,
      ) => {
        console.log(
          `Getting bars for ${symbolInfo.name} ${resolution} ${
            periodParams.countBack
          } ${periodParams.to * 1000}`,
        );
        const url = `https://events-v3.intear.tech/v3/price_token/ohlc?token=${
          symbolInfo.full_name
        }&resolution=${resolution}&count_back=${periodParams.countBack}&to=${
          periodParams.to * 1000
        }`;
        const response = await fetch(url).then((data) => data.json());
        const noData = response.length < periodParams.countBack;
        const decimals = (await getMetadata(symbolInfo.full_name)).decimals;
        const USDT_DECIMALS = 6;
        const bars = response.map((bar: any) => {
          bar.open = parseFloat(bar.open) * 10 ** (decimals - USDT_DECIMALS);
          bar.close = parseFloat(bar.close) * 10 ** (decimals - USDT_DECIMALS);
          bar.high = parseFloat(bar.high) * 10 ** (decimals - USDT_DECIMALS);
          bar.low = parseFloat(bar.low) * 10 ** (decimals - USDT_DECIMALS);
          bar.time = bar.timestamp_millis;
          return bar;
        });
        if (!latestBars[symbolInfo.full_name + "/" + resolution]) {
          latestBars[symbolInfo.full_name + "/" + resolution] =
            bars[bars.length - 1];
        }
        onHistoryCallback(bars, { noData });
      },
      subscribeBars: async (
        symbolInfo: any,
        resolution: any,
        onTick: any,
        listenerGuid: any,
        // onResetCacheNeededCallback: any,
      ) => {
        console.log(`Subscribing to bars of ${symbolInfo.full_name}`);
        const decimals = (await getMetadata(symbolInfo.full_name)).decimals;
        const USDT_DECIMALS = 6;
        const ws = new WebSocket(
          "wss://ws-events-v3.intear.tech/events/price_token",
        );
        subscribers[listenerGuid] = { ws };
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              And: [
                { path: "token", operator: { Equals: symbolInfo.full_name } },
              ],
            }),
          );
        };
        ws.onmessage = (e) => {
          const events = JSON.parse(e.data);
          for (const data of events) {
            if (data.token !== symbolInfo.full_name) {
              return;
            }
            const time = parseInt(data.timestamp_nanosec) / 1_000_000;
            let barTime;
            switch (resolution) {
              case "1":
                barTime = 1 * 60 * 1000;
                break;
              case "5":
                barTime = 5 * 60 * 1000;
                break;
              case "15":
                barTime = 15 * 60 * 1000;
                break;
              case "60":
                barTime = 60 * 60 * 1000;
                break;
              case "240":
                barTime = 240 * 60 * 1000;
                break;
              case "1D":
                barTime = 24 * 60 * 60 * 1000;
                break;
              case "1W":
                barTime = 7 * 24 * 60 * 1000;
                break;
              default:
                throw new Error(`Unexpected resolution ${resolution}`);
            }
            const nextBarTime =
              latestBars[symbolInfo.full_name + "/" + resolution]
                .timestamp_millis + barTime;
            const tradePrice =
              parseFloat(data.price_usd) * 10 ** (decimals - USDT_DECIMALS);
            if (time > nextBarTime) {
              latestBars[symbolInfo.full_name + "/" + resolution] = {
                high: tradePrice,
                low: tradePrice,
                open: latestBars[symbolInfo.full_name + "/" + resolution].close,
                close: tradePrice,
                time: nextBarTime,
              };
            } else {
              latestBars[symbolInfo.full_name + "/" + resolution] = {
                high: Math.max(
                  latestBars[symbolInfo.full_name + "/" + resolution].high,
                  tradePrice,
                ),
                low: Math.min(
                  latestBars[symbolInfo.full_name + "/" + resolution].low,
                  tradePrice,
                ),
                close: tradePrice,
                ...latestBars[symbolInfo.full_name + "/" + resolution],
              };
            }
          }
          onTick(latestBars[symbolInfo.full_name + "/" + resolution]);
        };
      },
      unsubscribeBars: async (listenerGuid: any) => {
        console.log(`Unsubscribing from bars: ${listenerGuid}`);
        subscribers[listenerGuid].ws.close();
      },
    };

    const widget = new (window as any).TradingView.widget({
      container: "tv_chart_container",
      datafeed,
      ...config,
    });

    return widget;
  }

  async function getMetadata(account_id: string) {
    console.log(`Getting ${account_id}`);
    if (account_id === "wrap.near") {
      return {
        name: "NEAR",
        symbol: "NEAR",
        decimals: 24,
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTA4MCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMDBFQzk3Ii8+CjxwYXRoIGQ9Ik03NzMuNDI1IDI0My4zOEM3NTEuNDUzIDI0My4zOCA3MzEuMDU0IDI1NC43NzIgNzE5LjU0NCAyNzMuNDk5TDU5NS41MzggNDU3LjYwNkM1OTEuNDk5IDQ2My42NzMgNTkzLjEzOCA0NzEuODU0IDU5OS4yMDYgNDc1Ljg5M0M2MDQuMTI0IDQ3OS4xNzIgNjEwLjYzMSA0NzguNzY2IDYxNS4xMSA0NzQuOTEzTDczNy4xNzIgMzY5LjA0MkM3MzkuMiAzNjcuMjE3IDc0Mi4zMjcgMzY3LjQwMyA3NDQuMTUyIDM2OS40MzFDNzQ0Ljk4IDM3MC4zNjEgNzQ1LjQyIDM3MS41NjEgNzQ1LjQyIDM3Mi43OTRWNzA0LjI2NUM3NDUuNDIgNzA3LjAwMyA3NDMuMjA2IDcwOS4yIDc0MC40NjggNzA5LjJDNzM4Ljk5NyA3MDkuMiA3MzcuNjExIDcwOC41NTggNzM2LjY4MiA3MDcuNDI1TDM2Ny43MDcgMjY1Ljc1OEMzNTUuNjkgMjUxLjU3NyAzMzguMDQ1IDI0My4zOTcgMzE5LjQ3IDI0My4zOEgzMDYuNTc1QzI3MS42NzMgMjQzLjM4IDI0My4zOCAyNzEuNjczIDI0My4zOCAzMDYuNTc1Vjc3My40MjVDMjQzLjM4IDgwOC4zMjcgMjcxLjY3MyA4MzYuNjIgMzA2LjU3NSA4MzYuNjJDMzI4LjU0NiA4MzYuNjIgMzQ4Ljk0NiA4MjUuMjI4IDM2MC40NTYgODA2LjUwMUw0ODQuNDYyIDYyMi4zOTRDNDg4LjUwMSA2MTYuMzI3IDQ4Ni44NjIgNjA4LjE0NiA0ODAuNzk0IDYwNC4xMDdDNDc1Ljg3NiA2MDAuODI4IDQ2OS4zNjkgNjAxLjIzNCA0NjQuODkgNjA1LjA4N0wzNDIuODI4IDcxMC45NThDMzQwLjggNzEyLjc4MyAzMzcuNjczIDcxMi41OTcgMzM1Ljg0OCA3MTAuNTY5QzMzNS4wMiA3MDkuNjM5IDMzNC41OCA3MDguNDM5IDMzNC41OTcgNzA3LjIwNlYzNzUuNjUxQzMzNC41OTcgMzcyLjkxMyAzMzYuODExIDM3MC43MTUgMzM5LjU0OSAzNzAuNzE1QzM0MS4wMDMgMzcwLjcxNSAzNDIuNDA2IDM3MS4zNTggMzQzLjMzNSAzNzIuNDlMNzEyLjI1OSA4MTQuMjQyQzcyNC4yNzYgODI4LjQyMyA3NDEuOTIxIDgzNi42MDMgNzYwLjQ5NiA4MzYuNjJINzczLjM5MkM4MDguMjkzIDgzNi42MzcgODM2LjYwMyA4MDguMzYxIDgzNi42MzcgNzczLjQ1OVYzMDYuNTc1QzgzNi42MzcgMjcxLjY3MyA4MDguMzQ0IDI0My4zOCA3NzMuNDQyIDI0My4zOEg3NzMuNDI1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==",
        spec: "ft-1.0.0",
        reference: null,
        reference_hash: null,
      };
    }
    const tokens = JSON.parse(localStorage.getItem("tokenMeta") ?? "{}");
    if (tokens[account_id]) {
      return tokens[account_id];
    }
    tokens[account_id] = await fetch("https://beta.rpc.mainnet.near.org/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "dontcare",
        jsonrpc: "2.0",
        method: "query",
        params: {
          request_type: "call_function",
          account_id: account_id,
          method_name: "ft_metadata",
          args_base64: btoa(JSON.stringify({})),
          finality: "final",
        },
      }),
    })
      .then((data) => data.json())
      .then((data) =>
        new TextDecoder().decode(Uint8Array.from(data.result.result)),
      )
      .then((data) => JSON.parse(data));
    localStorage.setItem("tokenMeta", JSON.stringify(tokens));
    return tokens[account_id];
  }

  return (
    <>
      <Script
        src="https://dynamic-moxie-09a484.netlify.app/charting_library.standalone.js"
        onReady={() => {
          initOnReady();
        }}
      />
      <div
        id="tv_chart_container"
        ref={chartContainerRef}
        className="h-full w-full"
      />
    </>
  );
}
