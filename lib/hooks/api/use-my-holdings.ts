import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketplaces } from "./use-marketplaces";
import { ChainType } from "@/lib/types/chain";

export function useMyHoldings() {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const holdingFetch = async () => {
    if (!address || isMarketLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${ChainType.HYPER}`,
    );

    if (holdingRes?.length <= 0) return [];

    const holdings = holdingRes.map((h: any) => {
      const curMarketplace = marketplaceData?.find(
        (m: any) => h.market_symbol === m.market_symbol,
      );

      return {
        ...h,
        marketplace: curMarketplace,
      };
    });

    const filteredCateHoldings = [
      ...Array.from(
        new Map(
          holdings.map((item: IHolding) => [
            item.marketplace?.market_catagory,
            item,
          ]),
        ).values(),
      ),
    ];

    return filteredCateHoldings as Array<IHolding>;
  };

  const res = useSWR(`my_stock:${address}${isMarketLoading}`, holdingFetch);

  return res;
}
