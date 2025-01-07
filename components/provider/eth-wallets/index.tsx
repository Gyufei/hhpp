"use client";
import React, { ReactNode } from "react";
import { State } from "wagmi";

import { WagmiProvider, http } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { useAtomValue } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { isProduction } from "@/lib/PathMap";
import { ChainType } from "@/lib/types/chain";
import { createConfig, cookieStorage, createStorage } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { supportedChains } from "./config";

// Setup queryClient
const queryClient = new QueryClient();

export default function EthWalletsProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const globalRpcs = useAtomValue(GlobalRpcsAtom);
  const customRpcs = useAtomValue(CustomRpcsAtom);

  const arbRpc = customRpcs[ChainType.HYPER] || globalRpcs[ChainType.HYPER];

  const transports = isProduction
    ? {
        [arbitrum.id]: http(arbRpc),
      }
    : {
        [arbitrum.id]: http(arbRpc),
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

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
