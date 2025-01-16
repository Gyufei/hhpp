import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketplaces(chain?: string) {
  const { apiEndPoint, cdnEndPoint } = useEndPoint();

  async function marketFetch() {
    const res = await dataApiFetcher(`${apiEndPoint}${ApiPaths.markets}`);

    const allMarket = res.flat().map((m: any) => {
      const chain = m.chain_name;
      return {
        ...m,
        projectLogo: `${cdnEndPoint}/images/project/${m.market_symbol}.png`,
        pointLogo: `${cdnEndPoint}/images/point/${m.market_symbol}.png`,
        chain,
      };
    });

    return allMarket as Array<IMarketplace>;
  }

  const res = useSWR(`marketplaces-${chain || "all"}`, marketFetch);

  return res;
}
