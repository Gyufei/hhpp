import { truncateAddr } from "@/lib/utils/web3";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ChainType } from "@/lib/types/chain";
import { useAccountInfo } from "../api/use-account-info";

export function useChainWallet() {
  const {
    address: realAddress,
    isConnected,
    isConnecting,
    connector,
  } = useAccount();

  const { data: destInfo } = useAccountInfo(realAddress || "");

  const destAddress = destInfo?.dest_wallet;

  const { disconnect: evmDisconnect } = useDisconnect();

  const currentWalletChain = useMemo(() => {
    return ChainType.HYPER;
  }, []);

  return {
    // source wallet for data fetch, sign, arb
    realAddress: realAddress || "",
    shortAddr: realAddress
      ? truncateAddr(realAddress, { nPrefix: 4, nSuffix: 4 })
      : "",
    // dest wallet for HL
    address: destAddress || "",
    connected: isConnected,
    connecting: isConnecting,
    disconnect: evmDisconnect,
    currentChain: currentWalletChain,
    connector: connector,
  };
}
