import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useTokens } from "./token/use-tokens";
import { IToken } from "@/lib/types/token";
import NP from "number-precision";

export interface IUserBalance {
  wallet: string;
  token_address: string;
  token_available_balance: string;
  token_locked_balance: string;
  available_balance_num: string;
  locked_balance_num: string;
  token: IToken;
}

export function useUserBalance(address: string) {
  const { apiEndPoint } = useEndPoint();
  const { data: tokens } = useTokens();

  async function getTokenBalance() {
    const bas = await apiFetcher(
      `${apiEndPoint}${ApiPaths.userBalance}/${address}`,
    );

    const tokenBalances = tokens?.map((t: IToken) => {
      const baData = bas.find(
        (b: IUserBalance) => b.token_address === t.address,
      );

      if (!baData)
        return {
          token: t,
          wallet: address,
          token_address: t.address,
          token_available_balance: "0",
          token_locked_balance: "0",
          available_balance_num: "0",
          locked_balance_num: "0",
        } as IUserBalance;

      return {
        token: t,
        ...baData,
        available_balance_num: NP.divide(
          Number(baData.token_available_balance),
          10 ** t.decimals,
        ),

        locked_balance_num: NP.divide(
          Number(baData.token_locked_balance),
          10 ** t.decimals,
        ),
      } as IUserBalance;
    });

    return tokenBalances as IUserBalance[];
  }

  const res = useSWR<IUserBalance[]>(
    address && tokens ? `getTokenBalance ${address} ${tokens.length}` : null,
    getTokenBalance,
  );

  return res;
}
