import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint } from "../../types/token";
import { formatTimeDuration } from "../../utils/time";
import { useTokenPrice } from "@/lib/hooks/api/token/use-token-price";
import { useTokens } from "../api/token/use-tokens";
import { ProjectDecimalsMap } from "@/lib/const/constant";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: tokens } = useTokens(offer?.marketplace?.chain);

  const offerTokenInfo = useMemo(() => {
    return tokens?.find((t) => t.symbol === offer.payment_token);
  }, [offer, tokens]);

  const offerChainInfo = useMemo(() => {
    return tokens?.find(
      (t) => t.symbol === offer?.marketplace?.chain?.toUpperCase(),
    );
  }, [offer, tokens]);

  const pointDecimalNum = useMemo(() => {
    if (
      offer?.marketplace &&
      ProjectDecimalsMap[offer.marketplace.market_symbol]
    ) {
      const decimal = ProjectDecimalsMap[offer.marketplace.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [offer]);

  const { data: tokenPrice } = useTokenPrice(
    offer.marketplace.chain,
    offerTokenInfo?.address || "",
  );

  const offerPointInfo: IPoint = {
    symbol: offer.marketplace.item_name,
    logoURI: offer.marketplace.pointLogo,
    marketplace: offer.marketplace,
  };

  const tokenLogo = offerTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = offerPointInfo?.logoURI || "/icons/empty.svg";

  const offerItemAmount = NP.divide(offer.item_amount, pointDecimalNum);

  const amount = NP.times(offer.item_amount, offer.price);

  const progress = Number(
    (Number(offer.taken_item_amount) / Number(offer.item_amount)).toFixed(2),
  );

  const offerType = offer.entry.direction;
  const offerValue = offerType === "sell" ? offerItemAmount : amount;
  const forValue = offerType === "sell" ? amount : offerItemAmount;
  const offerLogo = offerType === "sell" ? pointLogo : tokenLogo;
  const forLogo = offerType === "sell" ? tokenLogo : pointLogo;

  const tokenTotalPrice = NP.times(amount, tokenPrice);
  const pointPerPrice = NP.divide(tokenTotalPrice, offerItemAmount);

  const orderDuration = formatTimeDuration(
    Math.floor(NP.minus(Date.now() / 1000, offer.create_at)),
  );

  const isFilled = offer.taken_item_amount === offer.item_amount;

  const isCanceled = offer.status === "canceled";

  const isClosed = useMemo(() => {
    return ["filled", "canceled", "settled"].includes(offer.status);
  }, [offer.status]);

  return {
    orderDuration,

    amount,
    progress,
    offerValue,
    forValue,
    offerLogo,
    forLogo,

    tokenPrice,
    tokenTotalPrice,
    pointPerPrice,
    offerPointInfo,
    offerTokenInfo,
    offerChainInfo,
    pointDecimalNum,

    isFilled,
    isCanceled,
    isClosed,
  };
}
