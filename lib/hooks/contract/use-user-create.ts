import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
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
      };
    },
  ) {
    const { signature } = await signDataAction("Welcome to hypeTrade");
    const { username } = arg;

    const params = {
      wallet: address,
      user_name: username,
      signature,
    };

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userCreate}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    return res;
  }

  const res = useSWRMutation("user create", postApi);

  return res;
}
