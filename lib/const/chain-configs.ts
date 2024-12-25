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
  [ChainType.ARB]: {
    name: "Arbitrum",
    chainType: ChainType.ARB,
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
          // prod
          preMarkets: "0xa853BE4931401059Dce7146b28aC4A190f108354",
          tokenManager: "0xa921e0BA08ceA8850D82D5e8240f626777FC1dB9",
          systemConfig: "0xa026b4E35AAE30f7CC5F0a205D49b8A38d1B65Aa",
          deliveryPlace: "0x384124A2588a8a446873a34c0FdFfE7f30FfE70F",

          deposit: "",
        }
      : {
          // test
          preMarkets: "0x5b61d7E49B77fA2F62F553C47e9e88223147DD30",
          tokenManager: "0x87f25fe11280c82aEf7247157A06525Cff7A13e5",
          systemConfig: "0xf29140CEE701A202215CC59800Ddd9a4382eD20f",
          deliveryPlace: "0x30681E123b2eC25157f52f3d52baB1EBD8fb5450",

          deposit: "0x68b1E0fD8A1045137934b5a8816d58315C747B99",
        },
    isEvm: true,
  },
};
