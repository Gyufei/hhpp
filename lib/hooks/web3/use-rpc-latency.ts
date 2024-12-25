import useSWR from "swr";
import { useRpc } from "./use-rpc";
import { ChainType } from "@/lib/types/chain";

export function useRpcLatency(chain: ChainType, rpc: string) {
  const { testRpcLatency } = useRpc();

  const res = useSWR(rpc, () => testRpcLatency(chain, rpc));

  return res;
}
