import { cookieStorage, createConfig, createStorage } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { http } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { isProduction } from "@/lib/PathMap";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export const supportedChains = isProduction
  ? ([arbitrum] as const)
  : ([arbitrumSepolia] as const);

export function getWagmiConfig(arbRpc?: string) {
  const defaultRpc =
    arbRpc || ChainConfigs[ChainType.HYPER].rpcs.TadleDefaultRP;

  const trans = isProduction
    ? {
        [arbitrum.id]: http(defaultRpc),
      }
    : {
        [arbitrumSepolia.id]: http(defaultRpc),
      };

  const config = createConfig({
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
    transports: trans as any,
  });

  return config;
}
