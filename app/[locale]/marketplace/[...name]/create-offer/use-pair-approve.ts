import { useApprove } from "@/lib/hooks/web3/evm/use-approve";
import { ChainType } from "@/lib/types/chain";
import { IPoint, IToken } from "@/lib/types/token";
import { useMemo } from "react";

export function usePairApprove(
  chain: ChainType,
  token: IToken | undefined,
  point: IPoint | undefined,
  type?: "sell" | "buy" | "sellToBid" | "buyFromAsk",
  allowAmount: string | number = 0,
) {
  const isMarketPointToken =
    point?.marketplace?.market_catagory === "point_token";

  const skipToken = useMemo(() => {
    if (!token) return true;

    if (token?.symbol === "ETH" || token?.symbol === "BNB") return true;

    if (isMarketPointToken && ["sell", "sellToBid"].includes(type || ""))
      return true;

    return false;
  }, [token, isMarketPointToken, type]);

  const skipPoint = useMemo(() => {
    if (isMarketPointToken && ["sell", "sellToBid"].includes(type || "")) {
      return false;
    }

    return true;
  }, [isMarketPointToken, type]);

  const {
    isShouldApprove: isShouldApproveToken,
    approveAction: approveActionToken,
    isApproving: isApprovingToken,
    approveBtnText: approveBtnTextToken,
  } = useApprove(
    chain || "",
    token?.address || "",
    token?.symbol || "",
    skipToken,
    allowAmount,
  );

  const {
    isShouldApprove: isShouldApprovePoint,
    approveAction: approveActionPoint,
    isApproving: isApprovingPoint,
    approveBtnText: approveBtnTextPoint,
  } = useApprove(
    chain || "",
    point?.marketplace.project_token_addr || "",
    point?.marketplace.item_name || "",
    skipPoint,
    allowAmount,
  );

  const isShouldApprove = isShouldApprovePoint || isShouldApproveToken;
  const isApproving = isApprovingPoint || isApprovingToken;
  const approveBtnText = approveBtnTextPoint || approveBtnTextToken;
  const approveAction = async () => {
    if (isShouldApprovePoint) {
      await approveActionPoint();
    } else if (isShouldApproveToken) {
      await approveActionToken();
    }

    return () => {};
  };

  return {
    isShouldApprove,
    isApproving,
    approveBtnText,
    approveAction,
  };
}
