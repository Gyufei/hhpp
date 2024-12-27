import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";

export function useCloseOffer() {
  const { dataApiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;

    const signedData = await signDataAction(args);
    console.log("signedData", signedData);

    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      },
    );

    return res;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
