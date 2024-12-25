import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";

export function useMarketOffers({
  marketSymbol,
  marketChain,
}: {
  marketSymbol: string | null;
  marketChain: string;
}) {
  const { dataApiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const marketOffersFetcher = async () => {
    if (isMarketLoading) return [];
    const fetchParams = Object.entries({
      market_symbol: marketSymbol,
      chain: marketChain,
    })
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const offerRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.offers}?${fetchParams}`,
    );

    const parsedRes = await Promise.all(
      offerRes.map((o: Record<string, any>) => {
        const marketplace = marketplaceData?.find(
          (m) => m.market_symbol === o.entry.market_symbol,
        );

        return {
          ...o,
          marketplace,
        };
      }),
    );

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-offer:${dataApiEndPoint}-${marketSymbol}-${isMarketLoading}`,
    marketOffersFetcher,
  );

  return {
    ...res,
  };
}
