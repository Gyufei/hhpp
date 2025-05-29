import { useMarketplaces } from "./use-marketplaces";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import NP from "number-precision";
import useSWR from "swr";
import { useUserData } from "@/lib/hooks/api/use-user-data";

export function useUserProfit() {
  const { apiEndPoint } = useEndPoint();
  const { data: marketplaces = [], isLoading: isMarketLoading } =
    useMarketplaces();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";
  const { data: userData } = useUserData(address);

  async function userProfitFetch() {
    async function pointAmountFetch(wallet: string, marketAccount: string) {
      const offers = await apiFetcher(
        `${apiEndPoint}${ApiPaths.marketPointAmount}?wallet=${wallet}&market_place_account=${marketAccount}`,
      );

      return offers;
    }

    const pnls = await Promise.all(
      marketplaces.map(async (marketplace) => {
        const pointAmount = await pointAmountFetch(
          address,
          marketplace.market_place_id,
        );
        const total = NP.plus(
          pointAmount?.locked_amount || "0",
          pointAmount?.free_amount || "0",
        );
        const buyingRate =
          userData?.take_point_price.find(
            (i: any) => i.market_place_id === marketplace.market_place_id,
          )?.point_token_price || marketplace.token.price;
        return NP.minus(
          NP.times(marketplace.token.price, total || "0"),
          NP.times(buyingRate, total || "0"),
        );
      }),
    );

    const profit = pnls.reduce((total, amount) => total + amount, 0);

    return profit;
  }

  const res = useSWR(
    `user_profit:${address}${isMarketLoading}`,
    userProfitFetch,
  );

  return res;
}
