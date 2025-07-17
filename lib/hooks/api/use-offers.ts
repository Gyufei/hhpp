import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";

export function useOffers(
  queryArgs: {
    market_place_id?: string | null;
    creator?: string | null;
    taker?: string | null;
  },
  key: string,
) {
  const { apiEndPoint } = useEndPoint();
  const {
    data: marketplaceData,
    isLoading: isMarketLoading,
    mutate: mutateMarketplaces,
  } = useMarketplaces();

  const marketOffersFetcher = async () => {
    mutateMarketplaces();
    if (isMarketLoading) return [];

    if (Object.values(queryArgs).some((v) => v == null)) return [];

    const fetchParams = Object.entries(queryArgs)
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const offerRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.offers}?${fetchParams}`,
    );

    const parsedRes = offerRes.map((o: Record<string, any>) => {
      const marketplace = marketplaceData?.find(
        (m) => m.market_place_id === o.market_place_id,
      );

      return {
        ...o,
        marketplace,
      };
    });

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    key && !isMarketLoading && marketplaceData?.length
      ? `${Object.keys(queryArgs).join("-")}-${Object.values(queryArgs).join(
          "-",
        )}`
      : null,
    marketOffersFetcher,
  );

  return res;
}
