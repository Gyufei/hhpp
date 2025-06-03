import { apiFetcher } from "@/lib/fetcher";
import { useAccountInfo } from "../api/use-account-info";
import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import useSWR from "swr";
import { useSendTx } from "./help/use-send-tx";
import { useState } from "react";

export function useCheckAllowance(address: string) {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();

  const token_address = address;
  const wallet = accountInfo?.dest_account;

  const { send } = useSendTx();

  async function checkAllowance() {
    if (!accountInfo?.dest_account) return 0;

    const checkAllowanceRes = await apiFetcher(
      `${apiEndPoint}${ApiPaths.tokenAllowance}?token_address=${token_address}&wallet=${wallet}`,
    );

    return checkAllowanceRes;
  }

  const res = useSWR(
    token_address && wallet ? "check allowance" : null,
    checkAllowance,
  );

  const { data: allowanceRes, isLoading, mutate } = res;

  const allowance = Number(allowanceRes?.allowance || 0);
  const txParams = allowanceRes?.txParams;

  const [isApproving, setIsApproving] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);

  async function handleApprove() {
    setIsApproving(true);
    try {
      const res = await send(txParams);
      mutate();
      setIsApproving(false);
      return res;
    } catch (error) {
      setApproveError("Approve failed");
      return null;
    }
  }

  return {
    allowance,
    isLoading: isLoading,
    isApproving,
    approveError,
    handleApprove,
  };
}
