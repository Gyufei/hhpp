import { type Chain } from "viem";

export const testnet = {
  id: 1337,
  name: "TestEth",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet-rpc.aggregation.top/"] },
  },
  blockExplorers: {
    default: {
      name: "Testnet Explorer",
      url: "https://devnet-explorer.aggregation.top/",
    },
  },
  contracts: {},
} as const satisfies Chain;
