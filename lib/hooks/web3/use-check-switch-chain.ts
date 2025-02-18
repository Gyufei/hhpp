import { useChainId, useSwitchChain } from "wagmi";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCheckSwitchChain() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  function checkAndSwitchChain() {
    const shouldChainId = Number(ChainConfigs[ChainType.HYPER].network);
      return switchChain({ chainId: shouldChainId });
  }
  return { checkAndSwitchChain };
}
