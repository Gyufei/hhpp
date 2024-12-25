import { useMemo } from "react";
import { useCheckSwitchChain } from "../../web3/use-check-switch-chain";

interface BaseHookResult {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  write: (...args: any) => any;
  [key: string]: any;
}

export function useChainTx<T = any, K extends BaseHookResult = BaseHookResult>(
  hookEth: (args: T) => K,
  args: T,
): BaseHookResult {
  const { checkAndSwitchChain } = useCheckSwitchChain();
  const actionResEvm = hookEth(args);

  const chainActionRes = useMemo(() => {
    return actionResEvm;
  }, [actionResEvm]);

  const write = async (args: any) => {
    try {
      const res = await checkAndSwitchChain();
      if (res) {
        return chainActionRes.write(args);
      }

      return;
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return {
    ...chainActionRes,
    write,
  };
}
