import useSWRImmutable from "swr/immutable";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";

interface IData {
  deposit: number;
  trading_volume: number;
  transactions: number;
  active_users: number;
  tokens: number;
}

export function useTradingData() {
  const { apiEndPoint } = useEndPoint();

  const res = useSWRImmutable<Record<string, IData>>(
    `${apiEndPoint}/trading_data.json`,
    apiFetcher,
  );

  return res;
}
