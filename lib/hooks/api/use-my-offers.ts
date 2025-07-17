import { uniqBy } from "lodash";
import { useAccountInfo } from "./use-account-info";
import { useOffers } from "./use-offers";
import { IOffer } from "@/lib/types/offer";

export function useMyOffers() {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

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
  }));

  const asTaker = res2.data
    ?.filter((o) => o.creator !== o.taker)
    .map((o) => ({
      ...o,
      role: "taker",
    }));

  const allData = uniqBy(
    [...(asMaker || []), ...(asTaker || [])],
    "order_id",
  ) as IOffer[];

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
