import { useChainWallet } from "../web3/use-chain-wallet";

export function useAccountInfo() {
  const { address } = useChainWallet();

  return {
    data: {
      dest_account: address,
    },
  };
}
