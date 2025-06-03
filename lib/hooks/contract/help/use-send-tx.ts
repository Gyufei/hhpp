import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";

export function useSendTx() {
  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = async (txRes: any) => {
    if (!txRes) {
      throw new Error("Invalid tx data");
    }

    const { from, to, data, gas, value } = txRes.tx_data || txRes;

    try {
      setIsPending(true);

      const txParams = {
        account: address,
        from: from as `0x${string}`,
        to: to as `0x${string}`,
        data: data as `0x${string}`,
        gas: gas ? BigInt(gas) : undefined,
        ...(value ? { value: BigInt(value) } : {}),
      };

      const hash = await sendTransactionAsync(txParams);
      setIsSuccess(true);
      return hash;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return {
    send,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
