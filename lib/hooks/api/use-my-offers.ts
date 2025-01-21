import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";
import { useAccountInfo } from "./use-account-info";

export function useMyOffers(params: any) {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const myOffersFetcher = async () => {
    if (isMarketLoading) return [];

    const fetchParams = Object.entries({
      ...params,
      wallet: address,
    })
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const offerRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.offers}?${fetchParams}`,
    );

    const parsedRes = offerRes.map((o: Record<string, any>) => {
      const marketplace = marketplaceData?.find(
        (m) => m.market_symbol === o.entry.market_symbol,
      );

      return {
        ...o,
        marketplace,
      };
    });

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(`my_offers:${address}${isMarketLoading}`, myOffersFetcher);

  return {
    ...res,
  };
}
