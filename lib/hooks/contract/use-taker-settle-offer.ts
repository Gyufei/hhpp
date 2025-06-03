import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { getUserNonce } from "./help/user-nonce";
import { ApiPaths } from "@/lib/PathMap";

export function useTakerSettleOffer() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string }) => {
    const nonce = await getUserNonce(accountInfo?.dest_account || "");

    const { offerId } = args;

    const params = {
      offer_id: offerId,
      taker: accountInfo?.dest_account || "",
      nonce: nonce,
    };

    const reqData = await signDataAction(params);

    try {
      const res = await apiFetcher(
        `${apiEndPoint}${ApiPaths.offerTakerSettle}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        },
      );

      return res;
    } catch (error: any) {
      toast.error(
        error?.message || "The service is abnormal. Please try again",
      );
      throw new Error(
        error?.message || "The service is abnormal. Please try again",
      );
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
