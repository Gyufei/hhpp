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
        logoURI: t.logo_url || `/icons/${t.token_name}.svg`,
        price: t.token_price,
      } as any;

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

export function useStableToken() {
  const { data, isLoading, error } = useTokens();

  return {
    data: data?.find((t) => t.symbol === "USDT"),
    isLoading,
    error,
  };
}
