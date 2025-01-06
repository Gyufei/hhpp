import { EVM_WALLETS } from "@/lib/const/evm-wallets";
import { openWalletUrl } from "@/lib/const/evm-wallets";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function EvmWallets({ onSelected }: { onSelected: () => void }) {
  const { connectors, connect } = useConnect();

  const showWallets = useMemo(() => {
    const wagmiWallets = connectors
      .filter((conn: Connector) => {
        return (
          conn.name !== "Phantom" &&
          conn.id !== "io.metamask" &&
          conn.id !== "injected"
        );
      })
      .reverse()
      .map((conn: Connector) => {
        const wallet = EVM_WALLETS.find((w) => w.name === conn.name);
        return {
          ...conn,
          icon: conn?.icon || wallet?.icon,
          installed: () => true,
        };
      });

    for (const wallet of EVM_WALLETS) {
      const w = wagmiWallets.some((wl) => wl.name === wallet.name);
      if (!w) {
        wagmiWallets.push(wallet as any);
      }
    }

    return wagmiWallets;
  }, [connectors]);

  const [hoverWallet, setHoverWallet] = useState<string | null>(null);

  const handleMouseEnter = (conn: Connector) => {
    setHoverWallet(conn.name);
  };

  const handleMouseLeave = () => {
    setHoverWallet(null);
  };

  function goToWallet(conn: Connector) {
    if (!conn?.downloadUrls) return;
    openWalletUrl((conn as any)?.downloadUrls);
  }

  function handleConnect(conn: Connector) {
    console.log("🚀 ~ handleConnect ~ conn:", conn);
    if (conn) {
      connect({ connector: conn });
      onSelected();
    }
  }

  return (
    <div className="mt-4 w-full">
      <div className="mx-4 mb-1 text-sm text-txt-white">Choose Wallet</div>
      {showWallets.map((conn) => (
        <div
          onClick={() => handleConnect(conn)}
          onMouseEnter={() => handleMouseEnter(conn)}
          onMouseLeave={handleMouseLeave}
          className="flex cursor-pointer items-center justify-between rounded-2xl p-4 hover:bg-[#D1D4DC]"
          key={conn.name}
        >
          <div className="flex items-center space-x-3">
            <Image
              src={conn?.icon || ""}
              alt="wallet"
              width={24}
              height={24}
              className="c-image-shadow"
            />
            <span className="text-sm font-semibold leading-[17px] text-txt-white">
              {conn.name}
            </span>
          </div>

          {!conn?.installed() && (
            <div
              data-state={hoverWallet === conn.name}
              className="flex cursor-pointer items-center justify-center rounded-full border border-black px-[12px] py-[2px] text-txt-white data-[state=true]:border-yellow data-[state=true]:bg-yellow"
              onClick={() => goToWallet(conn)}
            >
              <div className="text-sm leading-5 text-txt-white">Install</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
