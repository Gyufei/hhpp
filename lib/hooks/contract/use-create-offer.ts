import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";

export function useCreateOffer({ marketSymbol }: { marketSymbol: string }) {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const { signDataAction } = useSignData();

  const txAction = async (args: {
    total_item_amount: number;
    usdc_amount: string;
  }) => {
    const params = {
      direction: "sell",
      price: "",
      payment_token: "USDC",
      collateral_ratio: 10000,
      settle_mode: "",
      trade_tax_pct: 0,
      ...args,
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    };

    const reqData = await signDataAction(params);

    try {
      const res = await apiFetcher(
        `${apiEndPoint}/market/${marketSymbol}/create_offer`,
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
      toast.error(error?.message || "Invalid transaction data");
      throw new Error(error?.message || "Invalid transaction data");
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
