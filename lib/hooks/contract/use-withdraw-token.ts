import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken() {
  const { apiEndPoint } = useEndPoint();

  const { accountInfo } = useChainWallet();
  const { signDataAction } = useSignData();

  const txAction = async ({
    token_balance_type,
  }: {
    token_balance_type: IBalanceType;
  }) => {
    const reqData = await signDataAction({
      token_balance_type,
      source_account: accountInfo?.wallet || "",
      dest_account: accountInfo?.dest_wallet || "",
    });
    try {
      const res = await dataApiFetcher(
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
