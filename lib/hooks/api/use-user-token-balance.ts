import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

export interface ITokenBalance {
  token_addr: string;
  token_address: string;
  withdrawable: string;

  ledgers: {
    maker_refund: string;
    referral_bonus: string;
    remaining_cash: string;
    sales_revenue: string;
    tax_income: string;
    settlement: number;
  };
}

export function useUserTokenBalance(wallet: string) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<Array<ITokenBalance>>(
    wallet
      ? `${dataApiEndPoint}${DataApiPaths.userTokenBalance}/${wallet}`
      : null,
    dataApiFetcher,
  );

  return res;
}
