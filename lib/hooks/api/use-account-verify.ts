import useSWR from "swr";
import { useChainWallet } from "../web3/use-chain-wallet";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";
import { IMarketplace } from "@/lib/types/marketplace";

export function useAccountVerify({
  marketCategory,
  marketSymbol,
  chain,
}: {
  marketCategory: IMarketplace["market_catagory"];
  marketSymbol: string;
  chain: ChainType;
}) {
  const { dataApiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  async function checkIsVerifiedFetch() {
    if (marketCategory !== "offchain_fungible_point" || !wallet) {
      return true;
    }

    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.accountVerify}/${wallet}?market_symbol=${marketSymbol}&chain=${chain}`,
    );

    return res?.code === 200;
  }

  const res = useSWR(
    wallet ? `get-account-verify:${wallet}${marketSymbol}${chain}` : null,
    checkIsVerifiedFetch,
  );

  return res;
}
