import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useMyOffers(params: any) {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

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

    const offerRes = await dataApiFetcher(
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
