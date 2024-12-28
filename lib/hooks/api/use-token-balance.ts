import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import NP from "number-precision";
import { useChainWallet } from "../web3/use-chain-wallet";

export function useTokenBalance({
  abiAddress,
  decimals,
}: {
  abiAddress: string;
  decimals: number;
}) {
  const { address } = useChainWallet();
  const result = useReadContract({
    abi: erc20Abi,
    address: abiAddress as any,
    functionName: "balanceOf",
    args: [address as any],
  });

  return result ? NP.divide(String(result.data), String(10 ** decimals)) : 0;
}
