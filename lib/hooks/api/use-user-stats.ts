import useSWR from "swr";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { useAccountInfo } from "./use-account-info";

interface IAccountInfo {
  uid: number;
  user_name: string;
  maker_orders: number;
  taker_orders: number;
  trade_vol: string;
}

export function useUserStats() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const res = useSWR<IAccountInfo>(
    address ? `${apiEndPoint}${ApiPaths.userStats}/${address}` : null,
    apiFetcher,
  );

  return res;
}
