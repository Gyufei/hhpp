import useSWR from "swr";
// import { useEndPoint } from "./use-endpoint";
import { IOffer } from "@/lib/types/offer";
// import { ApiPaths } from "@/lib/PathMap";
// import { apiFetcher } from "@/lib/fetcher";
import { useMarketplaces } from "./use-marketplaces";

export function useMarketOffers({ marketId }: { marketId: string | null }) {
  // const { apiEndPoint } = useEndPoint();
  const { data: marketplaceData, isLoading: isMarketLoading } =
    useMarketplaces();

  const marketOffersFetcher = async () => {
    if (isMarketLoading) return [];
    // const fetchParams = Object.entries({
    //   market_place_id: marketId,
    // })
    //   .filter(([_, v]) => v !== null)
    //   .map(([k, v]) => `${k}=${v}`)
    //   .join("&");
    // const offerRes = await apiFetcher(`${apiEndPoint}${ApiPaths.offers}?${fetchParams}`);

    const offerRes = [
      {
        id: 1,
        order_id: "0x404d7eadd19d58912d0c20bde3770a54680799ff",
        market_place_id: "0x75573d14433111d76d9ce045047690793dcaa6e7",
        shares: "2000000",
        creator: "0x9C5265d6768a937AaF2C1951F42DAE4569c7AEC5",
        taker: "0x8C3A4f7D55fcbff9be9d53529D0f9184B3718c28",
        order_note: "test offer",
        order_status: "settled",
        update_at: "2025-05-21T08:44:36.225Z",
        create_at: "2025-05-20 14:01:29",
      },
      {
        id: 2,
        order_id: "0x4584dda0401adc1ce00f65d274200654a0c3ac15",
        market_place_id: "0x75573d14433111d76d9ce045047690793dcaa6e7",
        shares: "2000000",
        creator: "0x9C5265d6768a937AaF2C1951F42DAE4569c7AEC5",
        taker: "0x9C5265d6768a937AaF2C1951F42DAE4569c7AEC5",
        order_note: "test offer",
        order_status: "cancelled",
        update_at: "2025-05-21T08:35:36.430Z",
        create_at: "2025-05-20 14:04:25",
      },
      {
        id: 3,
        order_id: "0x137b4a1f70fc01e67432e9c8ad14f404de41a1f6",
        market_place_id: "0x75573d14433111d76d9ce045047690793dcaa6e7",
        shares: "2000000",
        creator: "0x9C5265d6768a937AaF2C1951F42DAE4569c7AEC5",
        taker: "0x9C5265d6768a937AaF2C1951F42DAE4569c7AEC5",
        order_note: "test offer",
        order_status: "settled",
        update_at: "2025-05-21T08:40:07.756Z",
        create_at: "2025-05-20 14:06:03",
      },
    ];

    const parsedRes = await Promise.all(
      offerRes.map((o: Record<string, any>) => {
        const marketplace = marketplaceData?.find(
          (m) => m.market_place_id === o.market_place_id,
        );

        return {
          ...o,
          marketplace,
        };
      }),
    );

    return parsedRes as Array<IOffer>;
  };

  const res = useSWR(
    `market-offer: ${marketId}-${isMarketLoading}`,
    marketOffersFetcher,
  );

  return res;
}
