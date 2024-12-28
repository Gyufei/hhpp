import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { useSignData } from "./help/use-sign-data";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken() {
  const { dataApiEndPoint } = useEndPoint();

  const { address } = useChainWallet();

  const { signDataAction } = useSignData();

  const txAction = async () => {
    const reqData = await signDataAction({
      source_account: address,
      dest_account: ChainConfigs[ChainType.HYPER].contracts.bridge,
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
