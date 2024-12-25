import { useEffect, useMemo, useState } from "react";
import NP from "number-precision";
import { useStableToken } from "@/lib/hooks/api/token/use-stable-token";
import { IMarketplace } from "@/lib/types/marketplace";
import { IPoint, IToken } from "@/lib/types/token";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useCreateOffer } from "@/lib/hooks/contract/use-create-offer";
import { ISettleMode } from "@/lib/types/offer";
import { useCreateOfferMinPrice } from "@/lib/hooks/offer/use-create-offer-min-price";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { toNonExponential } from "@/lib/utils/number";

export function useCreateAction(
  marketplace: IMarketplace,
  direction: "buy" | "sell",
) {
  const { data: stableTokens } = useStableToken(marketplace.chain);
  const { checkMinPrice } = useCreateOfferMinPrice();

  const [token, setToken] = useState<IToken>({
    symbol: "",
    logoURI: "/icons/empty.svg",
    decimals: 9,
  } as IToken);
  const [tokenAmount, setTokenAmount] = useState("0");
  const point = useMemo<IPoint | null>(
    () => ({
      logoURI: marketplace.pointLogo,
      symbol: marketplace.item_name,
      marketplace,
    }),
    [marketplace],
  );
  const [pointAmount, setPointAmount] = useState("");

  const currentMarket = useMemo(() => {
    if (point?.marketplace) {
      return point.marketplace;
    } else {
      return marketplace;
    }
  }, [marketplace, point]);

  const pointDecimalNum = useMemo(() => {
    if (ProjectDecimalsMap[currentMarket.market_symbol]) {
      const decimal = ProjectDecimalsMap[currentMarket.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [currentMarket]);

  useEffect(() => {
    if (stableTokens && stableTokens.length > 0) {
      setToken(stableTokens[0]);
    }
  }, [stableTokens]);

  const { data: tokenPrice } = useTokenPrice(
    marketplace.chain,
    token?.address || "",
  );

  const tokenAmountValue = useMemo(() => {
    if (!tokenAmount) return 0;

    return NP.times(tokenAmount, tokenPrice);
  }, [tokenAmount, tokenPrice]);

  const pointPrice = useMemo(() => {
    if (!pointAmount) {
      return 0;
    }

    return NP.divide(tokenAmountValue, pointAmount);
  }, [tokenAmountValue, pointAmount]);

  const {
    isLoading: isCreating,
    write: writeAction,
    isSuccess: isCreateSuccess,
  } = useCreateOffer({
    marketSymbol: currentMarket.market_symbol,
    chain: currentMarket.chain,
    marketplaceStr: currentMarket.market_place_account,
    offerType: direction === "sell" ? "ask" : "bid",
  });

  async function handleCreate({
    collateralRate,
    settleMode,
    taxForSub,
  }: {
    collateralRate: string;
    settleMode: ISettleMode;
    taxForSub: string;
  }) {
    try {
      const isPriceValid = checkMinPrice(
        pointPrice,
        Number(currentMarket.minimum_price),
      );

      if (!pointAmount || !tokenAmount || !isPriceValid) {
        return;
      }

      writeAction({
        direction: direction,
        price: toNonExponential(
          NP.divide(NP.divide(tokenAmount, pointAmount), pointDecimalNum),
        ),
        total_item_amount: toNonExponential(
          NP.times(pointAmount, pointDecimalNum),
        ),
        payment_token: token.symbol,
        collateral_ratio: collateralRate,
        settle_mode: settleMode,
        trade_tax_pct: taxForSub,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    token,
    setToken,
    point,

    currentMarket,
    tokenAmount,
    setTokenAmount,
    pointAmount,
    setPointAmount,
    tokenAmountValue,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
  };
}
