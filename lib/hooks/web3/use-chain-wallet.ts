import { truncateAddr } from "@/lib/utils/web3";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ChainType } from "@/lib/types/chain";
import { useAccountInfo } from "../api/use-account-info";

export function useChainWallet() {
  const {
    address: evmAddress,
    isConnected: evmConnected,
    isConnecting: evmConnecting,
    connector: evmConnector,
  } = useAccount();

  const { data: destInfo } = useAccountInfo(evmAddress || "");

  const destAddress = destInfo?.dest_wallet;

  const { disconnect: evmDisconnect } = useDisconnect();

  const currentWalletChain = useMemo(() => {
    return ChainType.HYPER;
  }, []);

  const evmWallet = useMemo(
    () => ({
      realAddress: evmAddress || "",
      shortAddr: evmAddress
        ? truncateAddr(evmAddress, { nPrefix: 4, nSuffix: 4 })
        : "",
      address: destAddress || "",
      connected: evmConnected,
      connecting: evmConnecting,
      disconnect: evmDisconnect,
      currentChain: currentWalletChain,
      connector: evmConnector,
    }),
    [
      destAddress,
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
