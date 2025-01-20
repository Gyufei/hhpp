import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";

export function useCreateTakerOrder() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;

    const reqData = await signDataAction({
      item_amount: itemAmount,
      source_account: accountInfo?.wallet || "",
      dest_account: accountInfo?.dest_wallet || "",
    });
    try {
      const res = await dataApiFetcher(`${apiEndPoint}/offer/${offerId}/take`, {
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
