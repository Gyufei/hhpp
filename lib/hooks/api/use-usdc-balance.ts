import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  usdc_balance: string;
}

export function useUsdcTokenBalance(address: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    address ? `${apiEndPoint}${ApiPaths.usdcBalance}?wallet=${address}` : null,
    apiFetcher,
  );

  return res;
}
