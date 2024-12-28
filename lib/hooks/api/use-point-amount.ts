import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  free_amount: number;
  locked_amount: number;
}

export function usePointAmount(wallet: string, market: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    wallet && market
      ? `${dataApiEndPoint}${DataApiPaths.marketPointAmount}?wallet=${wallet}&market_place_account=${market}`
      : null,
    dataApiFetcher,
  );

  return res;
}
