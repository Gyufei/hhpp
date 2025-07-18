import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { IMarketplace } from "@/lib/types/marketplace";

export function useMarketOffers(marketplace: IMarketplace) {
  const { apiEndPoint } = useEndPoint();

  const marketOffersFetcher = async () => {
    const offerRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.offers}?market_place_id=${marketplace.market_place_id}`,
    );

    const parsedRes = offerRes.map((o: Record<string, any>) => {
      return {
        ...o,
        marketplace,
      };
    });

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `${marketplace.market_place_id}-market-offers`,
    marketOffersFetcher,
  );

  return res;
}
