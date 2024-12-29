import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import useSWRMutation from "swr/mutation";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useReferralCreate() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const CreateApiPost = async () => {
    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.referral.create}`, {
      method: "POST",
      body: JSON.stringify({
        dest_account: address,
      }),
    });

    return res;
  };

  const res = useSWRMutation("create referral", CreateApiPost);

  return res;
}

export function useReferralRateChange() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        referral_code: string;
        referrer_rate: string;
        authority_rate: string;
      };
    },
  ) => {
    if (!address || !arg.referral_code) return null;

    const res = await apiFetcher(
      `${apiEndPoint}${ApiPaths.referral.updateCommission}`,
      {
        method: "POST",
        body: JSON.stringify({
          dest_account: address,
          ...arg,
        }),
      },
    );

    return res;
  };

  const res = useSWRMutation("update referral rate", postApi);

  return res;
}

export function useReferralNoteChange() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        referral_code: string;
        notes: string;
      };
    },
  ) => {
    if (!address || !arg.referral_code) return null;

    const res = await apiFetcher(
      `${apiEndPoint}${ApiPaths.referral.updateNote}`,
      {
        method: "POST",
        body: JSON.stringify({
          dest_account: address,
          ...arg,
        }),
      },
    );

    return res;
  };

  const res = useSWRMutation("update referral notes", postApi);

  return res;
}

export function useReferralDefault() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        referral_code: string;
      };
    },
  ) => {
    if (!address || !arg.referral_code) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.referral.default}`, {
      method: "POST",
      body: JSON.stringify({
        dest_account: address,
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update referral default", postApi);

  return res;
}

export function useReferralDelete() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        referral_code: string;
      };
    },
  ) => {
    if (!address || !arg.referral_code) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.referral.delete}`, {
      method: "POST",
      body: JSON.stringify({
        dest_account: address,
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("delete referral", postApi);

  return res;
}

export function useReferralView() {
  const { apiEndPoint } = useEndPoint();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        authority: string;
        referral_code: string;
      };
    },
  ) => {
    if (!arg.authority || !arg.referral_code) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.referral.views}`, {
      method: "POST",
      body: JSON.stringify({
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update referral default", postApi);

  return res;
}

export function useReferralBind() {
  const { apiEndPoint } = useEndPoint();
  const { address } = useChainWallet();

  const CreateApiPost = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        referral_code: string;
      };
    },
  ) => {
    if (!address || !arg.referral_code) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.referral.bind}`, {
      method: "POST",
      body: JSON.stringify({
        dest_account: address,
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("create referral", CreateApiPost);

  return res;
}
