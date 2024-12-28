import { isProduction } from "../PathMap";
import { ChainType } from "../types/chain";

export interface IChainConfig {
  name: string;
  network: string | number;
  logo: string;
  rpcs: Record<string, string>;
  zeroAddr: string;
  contracts: Record<string, string>;
  isEvm: boolean;
  chainType: ChainType;
}

export const ChainConfigs: Record<string, IChainConfig> = {
  [ChainType.HYPER]: {
    name: "Arbitrum",
    chainType: ChainType.HYPER,
    logo: "/icons/arb.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 42161 : 421614,
    rpcs: {
      TadleDefaultRPC: isProduction
        ? process.env.NEXT_PUBLIC_DEFAULT_RPC_ETH ||
          "https://rpc.ankr.com/arbitrum"
        : "https://rpc.ankr.com/arbitrum_sepolia",
    },
    contracts: isProduction
      ? {
          deposit: "",
          bridge: "",
        }
      : {
          deposit: "0x9EBeD0B93d2dc9C332640608Bcd551885ADd857D",
          bridge: "0x3924cb7faaf689977d54e492077b22066f57f2dc",
        },
    isEvm: true,
  },
};
