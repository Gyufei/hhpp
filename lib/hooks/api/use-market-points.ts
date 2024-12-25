import { useMemo } from "react";
import { useMarketplaces } from "./use-marketplaces";
import { IPoint } from "@/lib/types/token";

export function useMarketPoints() {
  const marketRes = useMarketplaces();

  const points = useMemo(() => {
    if (!marketRes.data) {
      return undefined;
    }

    const pts: Array<IPoint> = marketRes.data
      .filter((m) => m.status !== "offline")
      .map((market) => ({
        logoURI: market.pointLogo,
        symbol: market.item_name,
        marketplace: market,
      }));

    return pts;
  }, [marketRes.data]);

  return {
    ...marketRes,
    data: points,
  };
}
