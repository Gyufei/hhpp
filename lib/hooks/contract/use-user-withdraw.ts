import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

export function useUserWithdraw() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();
  const { checkAndSwitchChain } = useCheckSwitchChain();

  async function postApi(
    _: string,
    {
      arg,
    }: {
      arg: {
        token_address: string;
        amount: string;
      };
    },
  ) {
    if (!accountInfo) return;

    await checkAndSwitchChain();

    const { amount, token_address } = arg;

    const argsData = {
      wallet: accountInfo.dest_account,
      token_address,
      amount,
    };

    const signData = await signDataAction(argsData);

    const reqData = {
      ...argsData,
      ...signData,
    };

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userWithdraw}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
