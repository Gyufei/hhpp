import { useEndPoint } from "./use-endpoint";
import useSWR from "swr";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useAccountInfo } from "./use-account-info";

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

export function useReferralData() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const referralDataFetcher = async () => {
    if (!address) return null;

    const res = await apiFetcher(
      `${apiEndPoint}${ApiPaths.referral.data}?dest_account=${address}`,
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
    `${address}-referral-data`,
    referralDataFetcher,
  );

  return res;
}

export function useReferralReferer() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const res = useSWR<string | any | null>(
    address
      ? `${apiEndPoint}${ApiPaths.referral.referer}?dest_account=${address}`
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

export function useReferralCodeData({ code }: { code: string }) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<{
    authority: string;
    authority_rate: string;
    referral_rate: string;
  } | null>(
    code
      ? `${apiEndPoint}${ApiPaths.referral.codeData}?referral_code=${code}`
      : null,
    apiFetcher,
  );

  return res;
}

export function useReferralExtraRate() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const res = useSWR(
    address
      ? `${apiEndPoint}${ApiPaths.referral.extraRate}?dest_account=${address}`
      : null,
    apiFetcher,
  );

  return res;
}
