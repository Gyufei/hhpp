import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";
import { getUserNonce } from "./help/user-nonce";
import { ApiPaths } from "@/lib/PathMap";

export function useCreateTakerOrder() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();
  const { checkAndSwitchChain } = useCheckSwitchChain();

  const txAction = async (args: {
    offerId: string;
    maxPremiumAmount: string;
  }) => {
    const { offerId, maxPremiumAmount } = args;

    const nonce = await getUserNonce(accountInfo?.dest_account || "");

    const argsData = {
      order_id: offerId,
      taker: accountInfo?.dest_account,
      nonce: nonce,
      maximum_premium_amount: maxPremiumAmount,
    };

    await checkAndSwitchChain();

    const reqData = await signDataAction(argsData);

    try {
      const res = await apiFetcher(`${apiEndPoint}${ApiPaths.offerTake}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      return res;
    } catch (e: any) {
      toast.error(e?.message || "The service is abnormal. Please try again");
      throw new Error(
        e?.message || "The service is abnormal. Please try again",
      );
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
