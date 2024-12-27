import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken() {
  const { dataApiEndPoint } = useEndPoint();

  const { address } = useChainWallet();

  const txAction = async (args: {
    token_symbol: string;
    token_balance_type: IBalanceType;
  }) => {
    const reqData = {
      wallet: address,
      ...args,
    };

    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.accountWithdraw}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
    };

    const txHash = {
      ...callParams,
    };

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
