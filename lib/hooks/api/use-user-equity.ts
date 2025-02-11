import { useMarketplaces } from "./use-marketplaces";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { formatNum } from "@/lib/utils/number";
import NP from "number-precision";
import useSWR from "swr";

export function useUserEquity() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaces = [], isLoading: isMarketLoading } =
    useMarketplaces();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  async function userEquityFetch() {
    async function pointAmountFetch(wallet: string, marketAccount: string) {
      const offers = await apiFetcher(
        `${apiEndPoint}${ApiPaths.marketPointAmount}?wallet=${wallet}&market_place_account=${marketAccount}`,
      );

      return offers;
    }

    const pointAmounts = await Promise.all(
      marketplaces.map(async (marketplace) => {
        const pointAmount = await pointAmountFetch(
          address,
          marketplace.market_place_account,
        );
        const pointAmountsValue = formatNum(
          NP.times(
            marketplace.last_price,
            pointAmount?.locked_amount + pointAmount?.free_amount || "0",
          ),
        );
        return +pointAmountsValue || 0;
      }),
    );

    const equity = pointAmounts.reduce((total, amount) => total + amount, 0);

    return equity;
  }

  const res = useSWR(
    `user_equity:${address}${isMarketLoading}`,
    userEquityFetch,
  );

  return res;
}
