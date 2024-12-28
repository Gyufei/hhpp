import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { useChainWallet } from "../web3/use-chain-wallet";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCreateOffer({ marketSymbol }: { marketSymbol: string }) {
  const { dataApiEndPoint } = useEndPoint();
  const { address } = useChainWallet();
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
      source_account: address,
      dest_account: ChainConfigs[ChainType.HYPER].contracts.bridge,
    };

    const reqData = await signDataAction(params);

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
