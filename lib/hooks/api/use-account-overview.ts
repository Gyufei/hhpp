import useSWR from "swr";
import { apiFetcher, dataApiFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";

interface IAccountInfo {
  uid: number;
  user_name: string;
  maker_orders: number;
  taker_orders: number;
  settled_value: string;
  tax_income: string;
  trade_vol: string;
}

export function useAccountStats(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();
  const { address: wallet } = useChainWallet();

  const res = useSWR<IAccountInfo>(
    wallet
      ? `${apiEndPoint}${ApiPaths.accountStats}/${wallet}?chain=${chain}`
      : null,
    dataApiFetcher,
  );

  return res;
}

export function useUserNameChange() {
  const { apiEndPoint } = useEndPoint();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        uuid: string;
        user_name: string;
      };
    },
  ) => {
    if (!arg.uuid || !arg.user_name) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userName}`, {
      method: "POST",
      body: JSON.stringify({
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update referral notes", postApi);

  return res;
}
