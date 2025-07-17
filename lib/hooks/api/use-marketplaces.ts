import useSWR from "swr";
import { apiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTokens } from "./token/use-tokens";
import { IToken } from "@/lib/types/token";

export function useMarketplaces() {
  const { apiEndPoint } = useEndPoint();
  const { data: tokens } = useTokens();

  async function marketFetch() {
    const res = await apiFetcher(
      `${apiEndPoint}${ApiPaths.markets}?market_place_status=online`,
    );

    const allMarket = res.map((m: any) => {
      const token = tokens?.find((t: IToken) => t.address === m.token_address);

      return {
        ...m,
        token,
        projectLogo: token?.logoURI,
        pointLogo: token?.logoURI,
      };
    });

    return allMarket as Array<IMarketplace>;
  }

  const res = useSWR(
    tokens?.length ? `marketplaces-${"all"}-${Date.now()}` : null,
    marketFetch,
  );

  return res;
}
