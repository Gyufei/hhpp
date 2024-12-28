import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

interface IUsdcBalance {
  usdc_balance: string;
}

export function useUsdcTokenBalance(wallet: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IUsdcBalance>(
    wallet
      ? `${dataApiEndPoint}${DataApiPaths.usdcBalance}?wallet=${wallet}`
      : null,
    dataApiFetcher,
  );

  return res;
}
