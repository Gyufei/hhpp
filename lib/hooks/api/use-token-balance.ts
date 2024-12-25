import { useReadContract, useAccount } from "wagmi";
import { erc20Abi } from "viem";
import NP from "number-precision";

export function useTokenBalance({
  abiAddress,
  decimals,
}: {
  abiAddress: string;
  decimals: number;
}) {
  const { address } = useAccount();
  const result = useReadContract({
    abi: erc20Abi,
    address: abiAddress as any,
    functionName: "balanceOf",
    args: [address as any],
  });

  return result ? NP.divide(String(result.data), String(10 ** decimals)) : 0;
}
