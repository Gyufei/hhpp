import { useChainId, useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCheckSwitchChain() {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  function checkAndSwitchChain() {
    const shouldChainId = Number(ChainConfigs[ChainType.ARB].network);
    if (chainId !== shouldChainId) {
      return switchChainAsync({ chainId: shouldChainId });
    }

    return true;
  }
  return { checkAndSwitchChain };
}
