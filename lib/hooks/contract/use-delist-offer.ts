import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { getUserNonce } from "./help/user-nonce";
import { ApiPaths } from "@/lib/PathMap";
import { useSendTx } from "./help/use-send-tx";

export function useDelistOffer() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();
  const { send } = useSendTx();

  const txAction = async (args: { offerId: string; marketId: string }) => {
    const nonce = await getUserNonce(accountInfo?.dest_account || "");

    const { offerId, marketId } = args;

    const params = {
      offer_id: offerId,
      market_place_id: marketId,
      taker: accountInfo?.dest_account || "",
      nonce: nonce,
    };

    const reqData = await signDataAction(params);

    try {
      const res = await apiFetcher(`${apiEndPoint}${ApiPaths.offerDelist}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      const hash = await send(res);

      return hash;
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
