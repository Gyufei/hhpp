"use client";

import EthWalletsProvider from "@/components/provider/eth-wallets";
import { ChainType } from "@/lib/types/chain";
import { createContext, useContext, useState } from "react";

interface IWalletModalContext {
  isWalletModalOpen: boolean;
  isWalletDisconnectModalOpen: boolean;
  openWalletModal: (isOpen: boolean, chain?: ChainType) => void;
  openDisconnectModal: (isOpen: boolean) => void;
}

const WalletModalContext = createContext<IWalletModalContext | null>(null);

function WalletModalProviderPrimitive({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWalletDisconnectModalOpen, setIsWalletDisconnectModalOpen] =
    useState(false);

  function openWalletModal(isOpen: boolean) {
    setIsWalletModalOpen(isOpen);
  }

  function openDisconnectModal(isOpen: boolean) {
    setIsWalletDisconnectModalOpen(isOpen);
  }

  return (
    <WalletModalContext.Provider
      value={{
        isWalletModalOpen,
        isWalletDisconnectModalOpen,
        openWalletModal,
        openDisconnectModal,
      }}
    >
      {children}
    </WalletModalContext.Provider>
  );
}

export default function WalletModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EthWalletsProvider>
      <WalletModalProviderPrimitive>{children}</WalletModalProviderPrimitive>
    </EthWalletsProvider>
  );
}

export function useWalletModalContext() {
  const context = useContext(WalletModalContext);

  if (!context) {
    throw new Error(
      "useWalletModalContext must be used within a WalletModalProvider",
    );
  }

  return context;
}
