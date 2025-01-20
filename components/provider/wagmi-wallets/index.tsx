"use client";
import React, { ReactNode } from "react";
import { State } from "wagmi";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChainType } from "@/lib/types/chain";
import { getWagmiConfig } from "./wagmi-config";
import { memoize } from "lodash";
import { ChainConfigs } from "@/lib/const/chain-configs";

// Setup queryClient
const queryClient = new QueryClient();
const getConfig = memoize(getWagmiConfig);

export default function WagmiWalletsProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const arbRpc = ChainConfigs[ChainType.HYPER].rpcs.TadleDefaultRP;
  const wagmiConfig = getConfig(arbRpc);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
