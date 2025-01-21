import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "../web3/use-chain-wallet";

export type TradingMode = "Private" | "Public";

interface IAccountInfo {
  source_account: string;
  dest_account: string;
  user_name: string;
  trading_mode: TradingMode;
}

export function useAccountInfo() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IAccountInfo>(
    address ? `${apiEndPoint}${ApiPaths.accountInfo}?wallet=${address}` : null,
    apiFetcher,
  );

  return res;
}
