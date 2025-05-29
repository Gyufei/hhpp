import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

export function useMarketHolder(marketplaceId: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    marketplaceId
      ? `${apiEndPoint}${ApiPaths.offerDistribution}?market_place_id=${marketplaceId}`
      : "",
    apiFetcher,
  );

  return res;
}
