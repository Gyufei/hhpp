import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken() {
  const { apiEndPoint } = useEndPoint();

  const { data: accountInfo } = useAccountInfo();
  const { signDataAction } = useSignData();

  const txAction = async ({
    token_balance_type,
  }: {
    token_balance_type: IBalanceType;
  }) => {
    const reqData = await signDataAction({
      token_balance_type,
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    });
    try {
      const res = await apiFetcher(
        `${apiEndPoint}${ApiPaths.accountWithdraw}`,
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
