import { defineChain } from "viem";

export const hypeEVM = defineChain({
  id: 999,
  name: "HYPE EVM",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hyperliquid.xyz/evm"] },
  },
  blockExplorers: {
    default: {
      name: "HYPE Explorer",
      url: "https://app.hyperliquid.xyz/explorer",
    },
  },
  testnet: false,
});

export const hypeEVMTestnet = defineChain({
  id: 998,
  name: "HYPE EVM Testnet",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hyperliquid-testnet.xyz/evm"] },
  },
  blockExplorers: {
    default: {
      name: "HYPE Explorer",
      url: "https://app.hyperliquid-testnet.xyz/explorer",
    },
  },
  testnet: true,
});
