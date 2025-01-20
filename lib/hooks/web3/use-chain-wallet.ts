import { useAccount, useDisconnect } from "wagmi";

export function useChainWallet() {
  const { address, isConnected, isConnecting, connector } = useAccount();

  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    isConnecting,
    disconnect,
    connector: connector,
  };
}
