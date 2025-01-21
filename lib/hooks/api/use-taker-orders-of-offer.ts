import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export interface ITakerOrder {
  order_id: string;
  taker: string;
  create_at: number;
  item_amount: string;
  price: string;
  notional_value: string;
  tx_hash: string;
}

export function useTakerOrderOfOffers({
  offerId,
  chain,
}: {
  offerId: string;
  chain: ChainType;
}) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<Array<ITakerOrder>>(
    `${apiEndPoint}${ApiPaths.offer}/${offerId}/taker_orders?chain=${chain}`,
    apiFetcher,
  );

  return res;
}
