import { uniqBy } from "lodash";
import { useAccountInfo } from "./use-account-info";
import { useOffers } from "./use-offers";

export function useMyOffers() {
  const { data: accountInfo } = useAccountInfo();
  // const address = accountInfo?.dest_account || "";

  // #A
  // const address = "0xb6FA7f135038600E7071378Ac57cdb1e35e4936b";
  // console.log("address", accountInfo);
  //
  // #B
  const address = '0xaE71F62Bfd81058a7c9024d729D79B9C20524Ec4'
  console.log("address", accountInfo);

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
