import { useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCheckSwitchChain() {
  const { switchChainAsync } = useSwitchChain();

  function checkAndSwitchChain() {
    const shouldChainId = Number(ChainConfigs[ChainType.HYPER].network);
      return switchChainAsync({ chainId: shouldChainId });
  }
  return { checkAndSwitchChain };
}
