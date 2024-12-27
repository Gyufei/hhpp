import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

export function useCreateTakerOrder() {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;

    const reqData = {
      taker: address,
      item_amount: itemAmount,
    };
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/take`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
      from: address,
    };

    const txHash = {
      ...callParams,
    };

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
