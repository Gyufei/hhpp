import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useCloseOffer() {
  const { realAddress, address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;

    const reqData = await signDataAction({
      source_account: address,
      dest_account: realAddress,
    });

    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/cancel`,
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
