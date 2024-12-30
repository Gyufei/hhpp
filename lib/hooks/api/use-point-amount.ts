import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  free_amount: number;
  locked_amount: number;
}

export function usePointAmount(wallet: string, marketAccount: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    wallet && marketAccount
      ? `${dataApiEndPoint}${DataApiPaths.marketPointAmount}?wallet=${wallet}&market_place_account=${marketAccount}`
      : null,
    dataApiFetcher,
  );

  return res;
}
