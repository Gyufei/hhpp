import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

export interface ITakerOrder {
  id: number;
  signature: string;
  order_id: string;
  creator: string;
  taker: string;
  wallet: string;
  token_name: string;
  expiry_date: string;
  strike_price: string;
  shares: string;
  premium_amount: string;
  premium_price: string;
  update_at: string;
  create_at: string;
}

export function useTakerOrderOfOffers({ offerId }: { offerId: string }) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<Array<ITakerOrder>>(
    `${apiEndPoint}${ApiPaths.offer}/${offerId}/taker_orders`,
    apiFetcher,
  );

  return res;
}
