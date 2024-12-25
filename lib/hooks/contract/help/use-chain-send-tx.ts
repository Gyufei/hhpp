import { useMemo } from "react";
import { useSendTransaction } from "wagmi";

export function useChainSendTx() {
  const { sendTransactionAsync } = useSendTransaction();

  const sendTx: any = useMemo(() => {
    return sendTransactionAsync;
  }, [sendTransactionAsync]);

  return {
    sendTx,
  };
}
