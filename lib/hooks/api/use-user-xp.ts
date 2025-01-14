import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useUserXp() {
  const { dataApiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<any>(
    wallet ? `${dataApiEndPoint}${DataApiPaths.userXP}/${wallet}` : null,
    dataApiFetcher,
  );

  return res;
}
