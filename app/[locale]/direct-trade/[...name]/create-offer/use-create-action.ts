import { useEffect, useMemo, useState } from "react";
import NP from "number-precision";
import { IMarketplace } from "@/lib/types/marketplace";
import { IPoint, IToken } from "@/lib/types/token";
import { useCreateOffer } from "@/lib/hooks/contract/use-create-offer";
import { useStableToken, useTokens } from "@/lib/hooks/api/token/use-tokens";

export function useCreateAction(marketplace: IMarketplace) {
  const { data: tokens } = useTokens();
  const { data: stableToken } = useStableToken();

  const [token, setToken] = useState<IToken>({
    symbol: "",
    logoURI: "/icons/empty.svg",
    decimals: 9,
  } as IToken);

  const [tokenAmount, setTokenAmount] = useState("");

  const point = useMemo<IPoint | null>(() => {
    const token = tokens?.find((t) => t.symbol === marketplace.token_name);
    if (!token)
      return {
        symbol: "",
        logoURI: "/icons/empty.svg",
        decimals: 9,
      } as IPoint;

    return {
      ...token,
      marketplace,
    };
  }, [tokens, marketplace]);

  const [pointAmount, setPointAmount] = useState("");

  const [note, setNote] = useState("");

  const currentMarket = useMemo(() => {
    if (point?.marketplace) {
      return point.marketplace;
    } else {
      return marketplace;
    }
  }, [marketplace, point]);

  const pointDecimalNum = useMemo(() => {
    const decimal = currentMarket.token.decimals;
    return 10 ** decimal;
  }, [currentMarket]);

  useEffect(() => {
    if (stableToken) {
      setToken(stableToken);
    }
  }, [stableToken]);

  const tokenPrice = marketplace.strike_price;
  const pointPrice = marketplace.strike_price;

  const tokenAmountValue = useMemo(() => {
    if (!tokenAmount) return 0;

    return NP.times(tokenAmount, tokenPrice);
  }, [tokenAmount, tokenPrice]);

  const {
    isLoading: isCreating,
    write: writeAction,
    isSuccess: isCreateSuccess,
  } = useCreateOffer({
    marketId: currentMarket.market_place_id,
  });

  async function handleCreate() {
    try {
      if (!pointAmount || !tokenAmount) {
        return;
      }

      writeAction({
        shares: Math.floor(NP.times(pointAmount, pointDecimalNum)),
        note,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    token,
    setToken,
    point,
    note,
    setNote,

    currentMarket,
    tokenAmount,
    setTokenAmount,
    pointAmount,
    pointDecimalNum,
    setPointAmount,
    tokenAmountValue,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
  };
}
