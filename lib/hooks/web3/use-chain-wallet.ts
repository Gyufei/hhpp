import { truncateAddr } from "@/lib/utils/web3";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ChainType } from "@/lib/types/chain";

export function useChainWallet() {
  const {
    address: evmAddress,
    isConnected: evmConnected,
    isConnecting: evmConnecting,
    connector: evmConnector,
  } = useAccount();

  const { disconnect: evmDisconnect } = useDisconnect();

  const currentWalletChain = useMemo(() => {
    return ChainType.ARB;
  }, []);

  const evmWallet = useMemo(
    () => ({
      address: evmAddress || "",
      shortAddr: evmAddress
        ? truncateAddr(evmAddress, { nPrefix: 4, nSuffix: 4 })
        : "",
      connected: evmConnected,
      connecting: evmConnecting,
      disconnect: evmDisconnect,
      currentChain: currentWalletChain,
      connector: evmConnector,
    }),
    [
      evmAddress,
      evmConnected,
      evmConnecting,
      evmDisconnect,
      currentWalletChain,
      evmConnector,
    ],
  );

  return evmWallet;
}
