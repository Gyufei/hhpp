import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export interface IItemBalance {
  available: number;
  locked: number;
}

export function useUserItemBalance(
  wallet: string,
  marketSymbol: string,
  chain: ChainType,
) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IItemBalance>(
    wallet
      ? `${dataApiEndPoint}${DataApiPaths.userItemBalance}/${wallet}?market_symbol=${marketSymbol}&chain=${chain}`
      : null,
    dataApiFetcher,
  );

  return res;
}
