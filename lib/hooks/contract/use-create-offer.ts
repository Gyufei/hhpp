import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { getUserNonce } from "./help/user-nonce";
import { ApiPaths } from "@/lib/PathMap";
import { useSendTx } from "./help/use-send-tx";
import { useCheckSwitchChain } from "../web3/use-check-switch-chain";

export function useCreateOffer({ marketId }: { marketId: string }) {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const { signDataAction } = useSignData();
  const { send } = useSendTx();

  const { checkAndSwitchChain } = useCheckSwitchChain();

  const txAction = async (args: { shares: number; note: string }) => {
    const nonce = await getUserNonce(accountInfo?.dest_account || "");

    const params = {
      market_place_id: marketId,
      shares: args.shares,
      creator: accountInfo?.dest_account || "",
      nonce: nonce,
      order_note: args.note,
    };

    await checkAndSwitchChain();

    const reqData = await signDataAction(params);

    try {
      const res = await apiFetcher(`${apiEndPoint}${ApiPaths.createOffer}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      const hash = await send(res);

      return hash;
    } catch (error: any) {
      toast.error(error?.message || "Invalid transaction data");
      throw new Error(error?.message || "Invalid transaction data");
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
