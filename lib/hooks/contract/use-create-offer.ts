import { ISettleMode } from "@/lib/types/offer";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";

export function useCreateOffer({ marketSymbol }: { marketSymbol: string }) {
  const { dataApiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: {
    direction: "buy" | "sell";
    price: string;
    total_item_amount: number;
    payment_token: string;
    collateral_ratio: number;
    settle_mode: ISettleMode;
    trade_tax_pct: number;
  }) => {
    const reqData = await signDataAction(args);

    const res = await dataApiFetcher(
      `${dataApiEndPoint}/market/${marketSymbol}/create_offer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!res) {
      throw new Error("Invalid transaction data");
      return null;
    }

    return res;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
