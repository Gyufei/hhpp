import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { IOrder } from "@/lib/types/order";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useMyOrders(params: any) {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const myOrdersFetcher = async () => {
    if (isMarketLoading) return [];

    const fetchParams = Object.entries({
      ...params,
      wallet: address,
    })
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const orderRes = await dataApiFetcher(
      `${apiEndPoint}${ApiPaths.orders}?${fetchParams}`,
    );

    const parsedRes = orderRes.map((o: Record<string, any>) => {
      const marketplace = marketplaceData?.find(
        (m) => m.market_symbol === o.entry.market_symbol,
      );

      return {
        ...o,
        marketplace,
      };
    });

    return parsedRes as Array<IOrder>;
  };

  const res = useSWR(`my_orders:${address}${isMarketLoading}`, myOrdersFetcher);

  return {
    ...res,
  };
}
