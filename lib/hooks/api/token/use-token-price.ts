import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useEndPoint } from "../use-endpoint";
import { useMemo } from "react";
import { ChainType } from "@/lib/types/chain";

export function useTokenPrice(chain: ChainType, address: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<any>(
    `${apiEndPoint}/${chain}${ApiPaths.tokenPrice}`,
    apiFetcher,
  );

  const tokenPrice = useMemo(() => {
    if (!res) return "1";
    const data = res.data?.find((t: any) => t.token_mint === address);
    return data?.token_price || "1";
  }, [res, address]);

  return {
    ...res,
    data: tokenPrice,
  };
}
