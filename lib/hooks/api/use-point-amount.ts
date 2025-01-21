import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  free_amount: number;
  locked_amount: number;
}

export function usePointAmount(wallet: string, marketAccount: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    wallet && marketAccount
      ? `${apiEndPoint}${ApiPaths.marketPointAmount}?wallet=${wallet}&market_place_account=${marketAccount}`
      : null,
    apiFetcher,
  );

  return res;
}
