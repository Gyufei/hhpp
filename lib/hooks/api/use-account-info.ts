import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

type TradingMode = "Private" | "Public";

interface IAccountInfo {
  wallet: string;
  dest_account: string;
  user_name: string;
  trading_mode: TradingMode;
}

export function useAccountInfo(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IAccountInfo>(
    wallet ? `${apiEndPoint}${ApiPaths.accountInfo}?wallet=${wallet}` : null,
    dataApiFetcher,
  );

  return res;
}
