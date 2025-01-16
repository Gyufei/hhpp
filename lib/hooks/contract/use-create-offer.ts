import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { useChainWallet } from "../web3/use-chain-wallet";
import { toast } from "react-hot-toast";

export function useCreateOffer({ marketSymbol }: { marketSymbol: string }) {
  const { apiEndPoint } = useEndPoint();
  const { realAddress, address } = useChainWallet();
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
      source_account: realAddress,
      dest_account: address,
    };

    const reqData = await signDataAction(params);

    try {
      const res = await dataApiFetcher(
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
