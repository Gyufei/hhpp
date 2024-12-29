import { useEndPoint } from "./use-endpoint";
import useSWR from "swr";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";
import { useChainWallet } from "../web3/use-chain-wallet";

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
  const { address } = useChainWallet();

  const referralDataFetcher = async () => {
    if (!address) return null;

    const res = await apiFetcher(
      `${apiEndPoint}/${chain}${ApiPaths.referral.data}?dest_account=${address}`,
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

export function useReferralReferer(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const res = useSWR<string | any | null>(
    address
      ? `${apiEndPoint}/${chain}${ApiPaths.referral.referer}?dest_account=${address}`
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
  const { address } = useChainWallet();

  const res = useSWR(
    address
      ? `${apiEndPoint}/${chain}${ApiPaths.referral.extraRate}?dest_account=${address}`
      : null,
    apiFetcher,
  );

  return res;
}
