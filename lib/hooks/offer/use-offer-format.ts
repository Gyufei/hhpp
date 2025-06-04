import NP from "number-precision";
import { IOffer } from "../../types/offer";
import { useMemo } from "react";
import { IPoint } from "../../types/token";
import { useStableToken } from "../api/token/use-tokens";
import { coverExpiryDate } from "@/lib/utils/time";

export function useOfferFormat({ offer }: { offer: IOffer }) {
  const { data: usdtToken } = useStableToken();

  const offerTokenInfo = usdtToken;

  const offerPointInfo: IPoint = useMemo(() => {
    return {
      ...offer.marketplace.token,
      marketplace: offer.marketplace,
    };
  }, [offer]);

  const pointDecimalNum = useMemo(() => {
    const decimals = offer.marketplace.token.decimals;

    return 10 ** decimals;
  }, [offer]);

  const tokenLogo = offerTokenInfo?.logoURI || "/icons/empty.svg";
  const pointLogo = offerPointInfo?.logoURI || "/icons/empty.svg";

  const pointPerPrice = offer.marketplace.token.price;
  const pointPrice = offer.marketplace.strike_price;

  const pointAmount = NP.divide(offer.shares, pointDecimalNum);
  const amount = NP.times(pointAmount, pointPrice);

  const tokenPrice = offerTokenInfo?.price;
  const tokenTotalPrice = amount;

  const offerType = "sell";
  const offerValue = offerType === "sell" ? pointAmount : amount;
  const forValue = offerType === "sell" ? amount : pointAmount;
  const offerLogo = offerType === "sell" ? pointLogo : tokenLogo;
  const forLogo = offerType === "sell" ? tokenLogo : pointLogo;

  const isCreated = offer.order_status === "created";
  const isFilled = offer.order_status === "purchased";
  const isCanceled = offer.order_status === "cancelled";
  const isSettled = offer.order_status === "settled";

  const progress = isFilled || isSettled ? 100 : 0;

  const isNotCanBuy = useMemo(() => {
    return ["purchased", "cancelled", "settled"].includes(offer.order_status);
  }, [offer.order_status]);

  const expiry = offer.marketplace.expiry_date;

  const isAfterExpiry = checkIsAfterExpiry(expiry);

  const strike = offer.marketplace.strike_price;

  return {
    amount,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    progress,
    pointPrice,

    tokenPrice,
    tokenTotalPrice,
    pointPerPrice,
    offerPointInfo,
    offerTokenInfo,
    pointDecimalNum,

    isCreated,
    isFilled,
    isCanceled,
    isSettled,
    isNotCanBuy,

    expiry,
    isAfterExpiry,
    strike,
  };
}

export function checkIsAfterExpiry(expiry: string) {
  return coverExpiryDate(expiry).timestamp < new Date().getTime();
}
