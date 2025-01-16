import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  usdc_balance: string;
}

export function useUsdcTokenBalance(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    wallet
      ? `${apiEndPoint}${ApiPaths.usdcBalance}?wallet=${wallet}`
      : null,
    dataApiFetcher,
  );

  return res;
}
