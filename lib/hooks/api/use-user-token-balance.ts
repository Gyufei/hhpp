import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useAccountInfo } from "./use-account-info";

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
    total_sales_revenue: string;
    total_referral_bonus: string;
  };
}

export function useUserTokenBalance() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const res = useSWR<Array<ITokenBalance>>(
    address ? `${apiEndPoint}${ApiPaths.userTokenBalance}/${address}` : null,
    dataApiFetcher,
  );

  return res;
}
