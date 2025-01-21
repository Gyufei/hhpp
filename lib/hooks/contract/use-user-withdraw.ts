import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";

export function useUserWithdraw() {
  const { apiEndPoint } = useEndPoint();

  const { data: accountInfo } = useAccountInfo();
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
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    };

    const reqData = await signDataAction(params);

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userWithdraw}`, {
      method: "POST",
      body: JSON.stringify(reqData),
    });

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
