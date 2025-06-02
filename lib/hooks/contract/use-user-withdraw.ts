import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";
import { useUserBalance } from "../api/use-user-balance";
import { useSendTx } from "./help/use-send-tx";

export function useUserWithdraw() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();
  const { checkAndSwitchChain } = useCheckSwitchChain();

  const { mutate } = useUserBalance();

  const { send } = useSendTx();

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

    const hash = await send(res);

    mutate();

    return hash;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
