import { useSettleAskMaker } from "@/lib/hooks/contract/use-settle-ask-maker";
import ConfirmSettleBtn from "../settle/confirm-settle-btn";
import { useEffect } from "react";
import { ChainType } from "@/lib/types/chain";

export default function ConfirmAskMakerSettleBtn({
  isHoldingsLoading,
  marketplaceStr,
  orderStr,
  makerStr,
  chain,
  isNativeToken,
  settleAmount,
  onSuccess,
}: {
  chain: ChainType;
  isHoldingsLoading: boolean;
  marketplaceStr: string;
  orderStr: string;
  makerStr: string;
  settleAmount: number;
  isNativeToken: boolean;
  onSuccess: () => void;
}) {
  const {
    isLoading,
    write: writeAction,
    isSuccess,
  } = useSettleAskMaker({
    chain,
    marketplaceStr,
    makerStr,
    offerStr: orderStr,
    isNativeToken,
  });

  function handleConfirm() {
    if (isHoldingsLoading) return;

    writeAction({
      settleAmount,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ConfirmSettleBtn
      chain={chain}
      disabled={isLoading}
      onClick={handleConfirm}
    />
  );
}
