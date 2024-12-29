import { useEndPoint } from "../api/use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "../web3/use-chain-wallet";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";

export function useUserWithdraw() {
  const { dataApiEndPoint } = useEndPoint();

  const { realAddress, address } = useChainWallet();
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
      source_account: realAddress,
      dest_account: address,
    };

    const reqData = signDataAction(params);

    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.userWithdraw}`,
      {
        method: "POST",
        body: JSON.stringify(reqData),
      },
    );

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}
