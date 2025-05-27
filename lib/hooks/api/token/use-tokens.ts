import useSWRImmutable from "swr/immutable";
import type { IToken } from "../../../types/token";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "../use-endpoint";

export function useTokens() {
  const { apiEndPoint } = useEndPoint();

  async function tFetcher() {
    const tokens = await apiFetcher(`${apiEndPoint}/token/info`);

    const newTokens = tokens.map((t: Record<string, any>) => {
      const newT = {
        ...t,
        address: t.token_address,
        name: t.token_name,
        symbol: t.token_name,
        decimals: t.token_decimals,
        logoURI: t.logo_url,
        price: t.token_price,
      } as any;

      delete newT.url;

      if (newT.symbol === "WSOL") {
        newT.symbol = "SOL";
      }

      if (newT.symbol === "WETH") {
        newT.symbol = "ETH";
      }

      if (newT.symbol === "WBNB") {
        newT.symbol = "BNB";
      }

      return newT;
    });

    return newTokens;
  }

  const { data, isLoading, error } = useSWRImmutable<Array<IToken>>(
    "getTokens",
    tFetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
}
