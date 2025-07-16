import { useChainWallet } from "../web3/use-chain-wallet";

export function useAccountInfo() {
  const { address } = useChainWallet();

  return {
    data: address
      ? {
          dest_account: address,
          // TODO: remove
          // #c
          //dest_account: "0x70Fa72840BabA86bc0296a74ce328b3Ac0646aeE",
          // #B
          // dest_account: "0x70Fa72840BabA86bc0296a74ce328b3Ac0646aeE",
        }
      : undefined,
  };
}
