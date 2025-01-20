import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useMarketplaces } from "./use-marketplaces";
import { ChainType } from "@/lib/types/chain";
import { useAccountInfo } from "./use-account-info";

export function useMyHoldings() {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const holdingFetch = async () => {
    if (!address || isMarketLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${apiEndPoint}${ApiPaths.holding}?wallet=${address}&chain=${ChainType.HYPER}`,
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
