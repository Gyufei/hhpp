// import { useEthConfig } from "../../web3/use-eth-config";
// import { useWriteContract } from "wagmi";
// import { useCallback } from "react";
import useTxStatus from "../help/use-tx-status";
// import { useGasEth } from "../help/use-gas-eth";

export function useRollinEth() {
  const getRollingData = async () => {
    return {
      rollinAt: new Date().getTime(),
    };
  };

  const txAction = async () => {};

  const wrapRes = useTxStatus(txAction);

  return {
    ...wrapRes,
    getRollingData,
  };
}
