import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { getUserNonce } from "./help/user-nonce";
import { ApiPaths } from "@/lib/PathMap";
import { useCheckSwitchChain } from "../web3/use-check-switch-chain";

export function useCreateOffer({
  marketId,
  tokenName,
  tokenAddress,
  expiryDate,
  strikePrice,
}: {
  marketId: string;
  tokenName: string;
  tokenAddress: string;
  expiryDate: string;
  strikePrice: string;
}) {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const { signDataAction } = useSignData();

  const { checkAndSwitchChain } = useCheckSwitchChain();

  const txAction = async (args: { shares: number; note: string }) => {
    const nonce = await getUserNonce(accountInfo?.dest_account || "");

    const params = {
      token_name: tokenName,
      token_address: tokenAddress,
      expiry_date: expiryDate,
      strike_price: strikePrice,
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

      return res;
    } catch (error: any) {
      toast.error(error?.message || "Invalid transaction data");
      throw new Error(error?.message || "Invalid transaction data");
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
