import { useCallback } from "react";
import { useAtom } from "jotai";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { isProduction } from "@/lib/PathMap";
import { ChainType } from "@/lib/types/chain";
import { isValidRpcUrl } from "@/lib/utils/common";

export function useRpc() {
  const [globalRpcs, setGlobalRpc] = useAtom(GlobalRpcsAtom);
  const [customRpcs, setCustomRpc] = useAtom(CustomRpcsAtom);

  const setGlobalRpcAction = useCallback(
    (chain: ChainType, rpcStr: string) => {
      return setGlobalRpc((prev) => {
        return {
          ...prev,
          [chain]: rpcStr,
        };
      });
    },
    [setGlobalRpc],
  );

  const setCustomRpcAction = useCallback(
    (chain: ChainType, rpcStr: string | null) => {
      return setCustomRpc((prev) => {
        return {
          ...prev,
          [chain]: rpcStr,
        };
      });
    },
    [setCustomRpc],
  );

  async function testRpcLatency(chain: ChainType, testRpc: string) {
    if (!isValidRpcUrl(testRpc)) {
      throw new Error("Invalid RPC URL");
    }

    const publicClient = createPublicClient({
      chain: isProduction ? mainnet : sepolia,
      transport: http(testRpc),
    });

    const startTimestamp = Date.now();
    await publicClient.getChainId();
    const endTimestamp = Date.now();

    const latency = endTimestamp - startTimestamp;

    return latency;
  }

  return {
    globalRpcs,
    customRpcs,
    setGlobalRpcAction,
    setCustomRpcAction,
    testRpcLatency,
  };
}
