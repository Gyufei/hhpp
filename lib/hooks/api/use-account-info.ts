import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "../web3/use-chain-wallet";

export type TradingMode = "Private" | "Public";

interface IAccountInfo {
  wallet: string;
  dest_wallet: string;
  user_name: string;
  trading_mode: TradingMode;
}

export function useAccountInfo() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IAccountInfo>(
    address ? `${apiEndPoint}${ApiPaths.accountInfo}?wallet=${address}` : null,
    dataApiFetcher,
  );

  return res;
}
