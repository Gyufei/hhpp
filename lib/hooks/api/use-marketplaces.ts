import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import {
  DataApiPaths,
  WithPointImgCDN,
  WithProjectImgCDN,
} from "@/lib/PathMap";

import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketplaces(chain?: string) {
  const { dataApiEndPoint } = useEndPoint();

  async function marketFetch() {
    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.markets}`,
    );

    const allMarket = res.flat().map((m: any) => {
      const chain = m.chain_name;
      return {
        ...m,
        projectLogo: WithProjectImgCDN(m.market_symbol),
        pointLogo: WithPointImgCDN(m.market_symbol),
        chain,
      };
    });

    return allMarket as Array<IMarketplace>;
  }

  const res = useSWR(`marketplaces-${chain || "all"}`, marketFetch);

  return res;
}
