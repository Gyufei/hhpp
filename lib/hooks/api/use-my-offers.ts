import { uniqBy } from "lodash";
import { useAccountInfo } from "./use-account-info";
import { useOffers } from "./use-offers";

export function useMyOffers() {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";
  // const address = "0x8C3A4f7D55fcbff9be9d53529D0f9184B3718c28";

  const res1 = useOffers(
    {
      creator: address,
    },
    address,
  );

  const res2 = useOffers(
    {
      taker: address,
    },
    address,
  );

  const asMaker = res1.data?.map((o) => ({
    ...o,
    role: "maker",
    order_status: "created",
  }));

  const asTaker = res2.data
    ?.filter((o) => o.creator !== o.taker)
    .map((o) => ({
      ...o,
      role: "taker",
      order_status: "created",
    }));

  const allData = uniqBy([...(asMaker || []), ...(asTaker || [])], "order_id");

  return {
    data: allData,
    isLoading: res1.isLoading || res2.isLoading,
    mutate: () => {
      res1.mutate();
      res2.mutate();
    },
    error: res1.error || res2.error,
  };
}
