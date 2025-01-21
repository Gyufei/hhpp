import { useAccount, useDisconnect } from "wagmi";
import { useAccountInfo } from "../api/use-account-info";

export function useChainWallet() {
  const {
    address: walletAddress,
    isConnected,
    isConnecting,
    connector,
  } = useAccount();

  const { data: accountInfo } = useAccountInfo(walletAddress || "");
  const { disconnect: evmDisconnect } = useDisconnect();

  return {
    // source wallet for data fetch, sign, arb
    walletAddress: walletAddress || "",
    // dest wallet for HL
    address: accountInfo?.dest_account || "",
    accountInfo: accountInfo || {
      dest_account: "",
      wallet: "",
    },
    connected: isConnected,
    connecting: isConnecting,
    disconnect: evmDisconnect,
    connector: connector,
  };
}
