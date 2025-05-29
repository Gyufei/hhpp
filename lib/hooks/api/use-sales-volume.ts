import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useMemo } from "react";

interface ISalesVolume {
  create_at: number;
  sales_price: string;
  sales_volume: string;
}

export function useSalesVolume(marketplaceId: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    marketplaceId
      ? `${apiEndPoint}${ApiPaths.salesVolumeHistory}?market_place_id=${marketplaceId}`
      : null,
    apiFetcher,
  );

  const data = useMemo<Array<ISalesVolume> | undefined>(() => {
    if (!res.data) return res.data;

    return res.data.map((item: Record<string, any>) => {
      return {
        ...item,
        create_at: item.create_at * 1000,
      } as ISalesVolume;
    });
  }, [res.data]);

  return {
    ...res,
    data,
  };
}
