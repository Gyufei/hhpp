import useSWR from "swr";
// import { useEndPoint } from "./use-endpoint";
// import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export function useMarketHolder(chain: ChainType, marketplaceId: string) {
  // const { apiEndPoint } = useEndPoint();

  const res = useSWR(marketplaceId && chain ? "" : "", apiFetcher);

  return res;
}
