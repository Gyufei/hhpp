import { useChainWallet } from "../web3/use-chain-wallet";

export function useAccountInfo() {
  const { address } = useChainWallet();

  return {
    data: address
      ? {
          dest_account: address,
          // TODO: remove
          // #a
          // dest_account: "0xb6FA7f135038600E7071378Ac57cdb1e35e4936b",
          // #b
          // dest_account: "0xaE71F62Bfd81058a7c9024d729D79B9C20524Ec4",
          // #c
          // dest_account: "0x70Fa72840BabA86bc0296a74ce328b3Ac0646aeE",
        }
      : undefined,
  };
}
