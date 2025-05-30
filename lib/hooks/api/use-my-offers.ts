import { useAccountInfo } from "./use-account-info";
import { useOffers } from "./use-offers";

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
    order_status: "created",
  }));

  const asTaker = res2.data?.map((o) => ({
    ...o,
    role: "taker",
    order_status: "created",
  }));

  return {
    data: [...(asMaker || []), ...(asTaker || [])],
    isLoading: res1.isLoading || res2.isLoading,
    mutate: () => {
      res1.mutate();
      res2.mutate();
    },
    error: res1.error || res2.error,
  };
}
