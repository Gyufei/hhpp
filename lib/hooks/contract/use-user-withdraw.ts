import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "../web3/use-chain-wallet";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";

export function useUserWithdraw() {
  const { apiEndPoint } = useEndPoint();

  const { accountInfo } = useChainWallet();
  const { signDataAction } = useSignData();

  async function postApi(
    _: string,
    {
      arg,
    }: {
      arg: {
        amount: string;
      };
    },
  ) {
    const { amount } = arg;

    const params = {
      amount,
      source_account: accountInfo?.wallet || "",
      dest_account: accountInfo?.dest_wallet || "",
    };

    const reqData = await signDataAction(params);

    const res = await dataApiFetcher(`${apiEndPoint}${ApiPaths.userWithdraw}`, {
      method: "POST",
      body: JSON.stringify(reqData),
    });

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
