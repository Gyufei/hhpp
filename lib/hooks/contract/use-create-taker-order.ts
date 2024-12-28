import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useSignData } from "./help/use-sign-data";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCreateTakerOrder() {
  const { address } = useChainWallet();
  const { dataApiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;

    const reqData = await signDataAction({
      item_amount: itemAmount,
      source_account: address,
      dest_account: ChainConfigs[ChainType.HYPER].contracts.bridge,
    });

    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/take`,
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
