import { IRangeType } from "@/app/[locale]/marketplace/[...name]/leader-board/leader-range-select";
import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export function useTradingVol(chain: ChainType, period: IRangeType) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    `${apiEndPoint}/${chain}${ApiPaths.tradingVol}?period=${period}`,
    apiFetcher,
  );

  return res;
}
