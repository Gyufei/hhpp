import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

export interface IPremiumPrice {
  current_premium_price: number;
}

export function usePremiumPrice(
  tokenName: string,
  strikePrice: string,
  expiryDate: string,
) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    tokenName && strikePrice && expiryDate
      ? `${apiEndPoint}${ApiPaths.offerPremiumPrice}?token_name=${tokenName}&strike_price=${strikePrice}&expiry_date=${expiryDate}`
      : "",
    apiFetcher,
  );

  return res;
}
