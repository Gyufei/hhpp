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
    name: "Arbitrum One",
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
          deposit: "0x4bBb7cE5074cf2546e332353c0968Aaa0e82Ce23",
          USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
          destination: "0x051db6D7b2aAE3685C09D4cC57753f9f34eE4621",
        }
      : {
          deposit: "0x9EBeD0B93d2dc9C332640608Bcd551885ADd857D",
          USDC: "0x1870Dc7A474e045026F9ef053d5bB20a250Cc084",
          destination: "0xa53902eda4816e7b5c63DA1C8a6f76640F4AD883",
        },
    isEvm: true,
  },
};
