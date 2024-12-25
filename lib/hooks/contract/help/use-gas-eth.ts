import NP from "number-precision";
import { parseGwei } from "viem";
import { useGasPrice, usePublicClient } from "wagmi";

export function useGasEth() {
  const isBSC = true;
  const { data: gasPrice } = useGasPrice();

  const publicClient = usePublicClient();

  const getGasParams = async (
    callParams: Record<string, any>,
  ): Promise<any> => {
    try {
      if (isBSC) return ApiCallGas;

      const estGas = await publicClient!.estimateContractGas(callParams as any);

      const gasLimit = NP.times(Number(estGas), 130 / 100).toFixed();
      const maxPriorityFeePerGas = Math.ceil(NP.times(Number(gasPrice), 0.05));

      const gasParams: {
        gasPrice?: bigint;
        maxFeePerGas?: bigint;
        gas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {
        maxFeePerGas: gasPrice,
        gas: BigInt(gasLimit),
        maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas),
      };

      return gasParams;
    } catch (e) {
      console.error("calc gas error: =>", e);
      return {};
    }
  };

  const ApiCallGas = isBSC
    ? {
        gasPrice: parseGwei("1"),
      }
    : {};

  return {
    ApiCallGas,
    getGasParams,
  };
}
