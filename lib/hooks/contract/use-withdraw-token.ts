import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken() {
  const { dataApiEndPoint } = useEndPoint();

  const { realAddress, address } = useChainWallet();

  const { signDataAction } = useSignData();

  const txAction = async ({
    token_balance_type,
  }: {
    token_balance_type: IBalanceType;
  }) => {
    const reqData = await signDataAction({
      token_balance_type,
      source_account: realAddress,
      dest_account: address,
    });

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

    return res;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
