import { useMemo } from "react";
import { useTokens } from "./use-tokens";
import { ChainType } from "@/lib/types/chain";
import { getOrderArr } from "@/lib/utils/common";

export function useStableToken(chain: ChainType) {
  const { data: tokens, isLoading } = useTokens(chain);

  const stableTokens = useMemo(() => {
    const stableTokenList = ["USDC"];

    if (!tokens) return [];

    return getOrderArr(
      tokens.filter((t) => stableTokenList.includes(t.symbol)),
      stableTokenList,
    );
  }, [tokens]);

  return {
    data: stableTokens,
    isLoading,
  };
}
