import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { TradingMode } from "../api/use-account-info";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useUserCreate() {
  const { address } = useChainWallet();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  async function postApi(
    _: string,
    {
      arg,
    }: {
      arg: {
        username: string;
        tradingMode: TradingMode;
      };
    },
  ) {
    const { signature } = await signDataAction("Welcome to hypeTrade");
    const { username, tradingMode } = arg;

    const params = {
      wallet: address,
      user_name: username,
      trading_mode: tradingMode,
      signature,
    };

    const res = await apiFetcher(
      `${apiEndPoint}${ApiPaths.accountCreate}`,
      {
        method: "POST",
        body: JSON.stringify(params),
      },
    );

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
