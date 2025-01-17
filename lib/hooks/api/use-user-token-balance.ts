import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

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
  const { address: wallet } = useChainWallet();

  const res = useSWR<Array<ITokenBalance>>(
    wallet ? `${apiEndPoint}${ApiPaths.userTokenBalance}/${wallet}` : null,
    dataApiFetcher,
  );

  return res;
}
