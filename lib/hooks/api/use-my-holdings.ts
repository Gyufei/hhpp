import useSWR from "swr";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IHolding } from "@/lib/types/holding";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useMarketplaces } from "./use-marketplaces";
import NP from "number-precision";
import { ChainType } from "@/lib/types/chain";
import { IMarketplace } from "@/lib/types/marketplace";
import { uniqBy } from "lodash";

export function useMyHoldings({ chain }: { chain?: ChainType }) {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  async function marketOfferFetch(marketSymbol: string, chain: ChainType) {
    const offers = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.offers}?market_symbol=${marketSymbol}&chain=${chain}`,
    );

    return offers;
  }

  async function getAllMarketOffers(markets: Array<IMarketplace>) {
    const uniqueMarkets = uniqBy(markets, "market_symbol");

    const allMarketOffMapArr = await Promise.all(
      uniqueMarkets.map(async (market) => {
        const offers = await marketOfferFetch(
          market.market_symbol,
          market.chain,
        );
        return {
          [market.market_symbol]: offers,
        };
      }),
    );

    const allMarketOffObj = allMarketOffMapArr.reduce(
      (acc, cur) => ({
        ...acc,
        ...cur,
      }),
      {},
    );

    return allMarketOffObj as Record<string, Array<any>>;
  }

  const holdingFetch = async () => {
    if (!address || isMarketLoading) return [];

    const holdingRes = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.holding}?wallet=${address}&chain=${chain}`,
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

    const allMarketOfferMap = await getAllMarketOffers(
      holdings.map((h: any) => h.marketplace),
    );

    const cateHoldings = holdings.map(
      (h: any, _idx: number, arr: Array<any>) => {
        if (h.marketplace?.market_catagory === "point_token") {
          const getHoldingEntriesAmount = (holding: IHolding) => {
            return holding.entries.reduce(
              (ac: number, cu) => NP.plus(ac, cu.item_amount),
              0,
            );
          };

          return {
            ...h,
            allItemAmount: arr.reduce(
              (acc: number, cur: IHolding) =>
                NP.plus(acc, getHoldingEntriesAmount(cur)),
              0,
            ),
          };
        }

        if (h.marketplace?.market_catagory === "offchain_fungible_point") {
          return {
            ...h,
          };
        }

        if (
          !["point_token", "offchain_fungible_point"].includes(
            h.marketplace?.market_catagory,
          )
        ) {
          const offers = allMarketOfferMap[h.marketplace?.market_symbol];
          const matchingOffer = offers?.find(
            (offer: any) => offer.entry.id === h.entries[0].id,
          );

          return {
            ...h,
            offer: {
              ...matchingOffer,
              marketplace: h.marketplace,
            },
          };
        }
      },
    );

    const filteredCateHoldings = [
      ...Array.from(
        new Map(
          cateHoldings
            .filter((h: IHolding) =>
              ["point_token", "offchain_fungible_point"].includes(
                h.marketplace?.market_catagory,
              ),
            )
            .map((item: IHolding) => [item.marketplace?.market_catagory, item]),
        ).values(),
      ),
    ];

    const finalHoldings = [
      ...filteredCateHoldings,
      ...cateHoldings.filter(
        (h: IHolding) =>
          !["point_token", "offchain_fungible_point"].includes(
            h.marketplace?.market_catagory,
          ),
      ),
    ];

    return finalHoldings as Array<IHolding>;
  };

  const res = useSWR(
    `my_stock:${chain}${address}${isMarketLoading}`,
    holdingFetch,
  );

  return res;
}
