import { useAtomValue } from "jotai";
import { useEndPoint } from "./use-endpoint";
import { AccessTokenAtom } from "@/lib/states/user";
import useSWR from "swr";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export interface IReferralItem {
  id: string;
  authority_rate: string;
  commission: string;
  flag: string;
  last_commission: string;
  last_referral_users: string;
  notes: string;
  referral_code: string;
  referral_users: string;
  referrer_rate: string;
  trading_fee: string;
  trading_users: string;
  unique_views: string;
}

export function useReferralData(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const referralDataFetcher = async () => {
    if (!token) return null;

    const res = await apiFetcher(
      `${apiEndPoint}/${chain}${ApiPaths.referral.data}?access_token=${token}`,
    );

    const parsedRes = res.map((item: any) => {
      return {
        ...item,
        id: item.referral_code,
      };
    });

    return parsedRes as Array<IReferralItem>;
  };

  const res = useSWR<IReferralItem[] | null>(
    `${token}-referral-data`,
    referralDataFetcher,
  );

  return res;
}

export function useReferralReferer(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const res = useSWR<string | any | null>(
    token
      ? `${apiEndPoint}/${chain}${ApiPaths.referral.referer}?access_token=${token}`
      : null,
    apiFetcher,
  );

  if (res.data && res.data?.code === 500) {
    return {
      ...res,
      data: undefined,
    };
  }

  return res;
}

export function useReferralCodeData({
  chain,
  code,
}: {
  chain: ChainType;
  code: string;
}) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<{
    authority: string;
    authority_rate: string;
    referral_rate: string;
  } | null>(
    code
      ? `${apiEndPoint}/${chain}${ApiPaths.referral.codeData}?referral_code=${code}`
      : null,
    apiFetcher,
  );

  return res;
}

export function useReferralExtraRate(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();
  const token = useAtomValue(AccessTokenAtom);

  const res = useSWR(
    token
      ? `${apiEndPoint}/${chain}${ApiPaths.referral.extraRate}?access_token=${token}`
      : null,
    apiFetcher,
  );

  return res;
}
