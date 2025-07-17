import useSWR from "swr";
import { apiFetcher } from "@/lib/fetcher";
import { ApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTokens } from "./token/use-tokens";
import { IToken } from "@/lib/types/token";

interface UseMarketInfoParams {
  token_name: string;
  strike_price: string;
  expiry_date: string;
}

export function useMarketInfo({
  token_name,
  strike_price,
  expiry_date,
}: UseMarketInfoParams) {
  const { apiEndPoint } = useEndPoint();
  const { data: tokens } = useTokens();

  const fetchMarketInfo = async () => {
    if (!token_name || !strike_price || !expiry_date) return null;
    const url = `${apiEndPoint}${ApiPaths.marketDetail}?token_name=${token_name}&strike_price=${strike_price}&expiry_date=${expiry_date}`;
    const res = await apiFetcher(url);

    const token = tokens?.find((t: IToken) => t.address === res.token_address);

    return {
      ...res,
      token,
      projectLogo: token?.logoURI,
      pointLogo: token?.logoURI,
    } as IMarketplace;
  };

  const swrKey =
    tokens && token_name && strike_price && expiry_date
      ? `market-info-${token_name}-${strike_price}-${expiry_date}`
      : null;

  const res = useSWR(swrKey, fetchMarketInfo);

  return res;
}
