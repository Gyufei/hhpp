import useSWR from "swr";
import { apiFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { ChainType } from "@/lib/types/chain";
import { useAccountInfo } from "./use-account-info";

interface IAccountInfo {
  uid: number;
  user_name: string;
  maker_orders: number;
  taker_orders: number;
  settled_value: string;
  tax_income: string;
  trade_vol: string;
}

export function useAccountStats() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const res = useSWR<IAccountInfo>(
    address
      ? `${apiEndPoint}${ApiPaths.accountStats}/${address}?chain=${ChainType.HYPER}`
      : null,
    apiFetcher,
  );

  return res;
}
