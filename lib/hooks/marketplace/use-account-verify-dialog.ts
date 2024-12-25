import { IMarketplace } from "@/lib/types/marketplace";
import { useMemo, useState } from "react";
import { useAccountVerify } from "../api/use-account-verify";
import { useMarketInfo } from "../api/use-market-info";
import { ChainType } from "@/lib/types/chain";

export function useAccountVerifyDialog(market: IMarketplace) {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  const { data: marketInfos } = useMarketInfo(market?.chain || ChainType.ARB);

  const targetUrl = useMemo(() => {
    if (!market || !marketInfos) return;
    const projectInfo = marketInfos[market.market_symbol];

    return projectInfo["register_url"];
  }, [market, marketInfos]);

  const { data: isAccountVerify } = useAccountVerify({
    marketCategory: market.market_catagory,
    marketSymbol: market.market_symbol,
    chain: market.chain,
  });

  return {
    verifyDialogOpen,
    setVerifyDialogOpen,
    isAccountVerify,
    targetUrl,
  };
}
