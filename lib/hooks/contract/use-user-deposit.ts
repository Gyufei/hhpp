import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";
import { useSendTx } from "./help/use-send-tx";
import { useUserBalance } from "../api/use-user-balance";

export function useUserDeposit() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
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

    const reqData = {
      ...argsData,
    };

    const checkAllowanceRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.tokenAllowance}?token_address=${token_address}&wallet=${accountInfo.dest_account}`,
    );

    const allowance = checkAllowanceRes.allowance;

    if (Number(allowance) === 0 || Number(allowance) < Number(amount)) {
      await send(checkAllowanceRes.txParams);
    }

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userDeposit}`, {
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

  const res = useSWRMutation("user deposit", postApi);

  return res;
}
