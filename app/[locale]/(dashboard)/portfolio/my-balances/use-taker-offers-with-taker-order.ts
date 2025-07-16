import { apiFetcher } from "@/lib/fetcher";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { IOffer } from "@/lib/types/offer";
import { useMemo } from "react";
import useSWR from "swr";

export function useTakerOffersWithTakerOrder(offers: IOffer[]) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { apiEndPoint } = useEndPoint();

  async function fetchTakerOrder(offerId: string) {
    const takerOrderRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.offer}/${offerId}/taker_orders`,
    );

    return {
      [offerId]: takerOrderRes,
    };
  }

  async function fetchAllOfferTakerOrder() {
    if (!offers) return [];
    return Promise.all(offers?.map((o) => fetchTakerOrder(o.order_id)));
  }

  const res = useSWR(
    offers?.length ? `all-offer-taker-order-${address}` : null,
    fetchAllOfferTakerOrder,
  );

  const offersWithTakerOrder = useMemo(() => {
    let offerTakerOrderMap: Record<string, any> = {};

    res?.data?.forEach((o: Record<string, any>) => {
      offerTakerOrderMap = {
        ...offerTakerOrderMap,
        ...o,
      };
    });

    return offerTakerOrderMap;
  }, [res]);

  return {
    ...res,
    data: offersWithTakerOrder,
  };
}
