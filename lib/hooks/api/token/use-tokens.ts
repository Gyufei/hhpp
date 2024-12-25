import useSWRImmutable from "swr/immutable";
import type { IToken } from "../../../types/token";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "../use-endpoint";
import { ChainType } from "@/lib/types/chain";

export function useTokens(chain?: ChainType) {
  const { cdnEndPoint } = useEndPoint();

  async function tFetcher() {
    if (!chain)
      return {
        tokens: [],
      };

    const tokens = await apiFetcher(
      `${cdnEndPoint}/${chain}/tokenlist/${chain}.json`,
    );

    const newTokens = tokens.map((t: Record<string, any>) => {
      const newT = {
        ...t,
        logoURI: t.url,
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

    return {
      tokens: newTokens,
    };
  }

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(chain ? chain : null, tFetcher);

  return {
    data: data?.tokens,
    isLoading,
    error,
  };
}
