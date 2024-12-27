import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";

export function useList() {
  const { dataApiEndPoint } = useEndPoint();

  const txAction = async (args: {
    price: string;
    totalItemAmount: string;
    entryIds: Array<string>;
  }) => {
    const { price, totalItemAmount, entryIds } = args;

    const reqData = {
      price,
      total_item_amount: totalItemAmount,
      entry_ids: entryIds,
    };

    const res = await dataApiFetcher(`${dataApiEndPoint}/holding/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
    };

    const txHash = {
      ...callParams,
    };

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
