import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useSignData } from "./help/use-sign-data";

export function useCreateTakerOrder() {
  const { realAddress, address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;

    const reqData = await signDataAction({
      item_amount: itemAmount,
      source_account: realAddress,
      dest_account: address,
    });

    const res = await dataApiFetcher(
      `${apiEndPoint}/offer/${offerId}/take`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    return res;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
