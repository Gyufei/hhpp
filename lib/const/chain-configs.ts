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
    name: "Hype EVM",
    chainType: ChainType.HYPER,
    logo: "/icons/hype.svg",
    zeroAddr: "0x0000000000000000000000000000000000000000",
    network: isProduction ? 999 : 998,
    rpcs: {
      TadleDefaultRPC: isProduction
        ? "https://rpc.hyperliquid.xyz/evm"
        : "https://rpc.hyperliquid-testnet.xyz/evm",
      // "https://rpc.ankr.com/arbitrum/c6535b21817e457f928c2b7722b4c5e33037ca2ca6b984cfef45cf164bd4313d"
      // : "https://rpc.ankr.com/arbitrum_sepolia/c6535b21817e457f928c2b7722b4c5e33037ca2ca6b984cfef45cf164bd4313d",
    },
    contracts: isProduction ? {} : {},
    isEvm: true,
  },
};
