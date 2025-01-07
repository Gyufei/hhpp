"use client";
import React, { ReactNode } from "react";
import { State } from "wagmi";

import { WagmiProvider } from "wagmi";
import { useAtomValue } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomRpcsAtom, GlobalRpcsAtom } from "@/lib/states/rpc";
import { ChainType } from "@/lib/types/chain";
import { getWagmiConfig } from "./wagmi-config";
import { memoize } from "lodash";

// Setup queryClient
const queryClient = new QueryClient();
const getConfig = memoize(getWagmiConfig);

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
  const wagmiConfig = getConfig(arbRpc);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
