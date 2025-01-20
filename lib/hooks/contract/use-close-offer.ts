import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";

export function useCloseOffer() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;

    const reqData = await signDataAction({
      source_account: accountInfo?.wallet || "",
      dest_account: accountInfo?.dest_wallet || "",
    });

    try {
      const res = await dataApiFetcher(
        `${apiEndPoint}/offer/${offerId}/cancel`,
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
