import { ChainConfigs } from "@/lib/const/chain-configs";
import { isProduction } from "@/lib/PathMap";
import { ChainType } from "@/lib/types/chain";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { createConfig, http, cookieStorage, createStorage } from "wagmi";

export const supportedChains = isProduction
  ? ([arbitrum] as const)
  : ([arbitrum, arbitrumSepolia] as const);

export function getWagmiConfig() {
  const transports = isProduction
    ? {
        [arbitrum.id]: http(ChainConfigs[ChainType.HYPER].rpcs.TadleDefaultRPC),
      }
    : {
        [arbitrum.id]: http(ChainConfigs[ChainType.HYPER].rpcs.TadleDefaultRPC),
        [arbitrumSepolia.id]: http(),
      };

  const wagmiConfig = createConfig({
    connectors: [
      metaMask(),
      injected(),
      walletConnect({
        projectId: "8e507d09486ed2283f0d0922c0a02261",
      }),
    ],
    chains: supportedChains,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: transports as any,
  });

  return wagmiConfig;
}
