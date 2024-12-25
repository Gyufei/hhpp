import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";
import { useWalletModalContext } from "../provider/wallet-modal-provider";

export default function WithWalletConnectBtn({
  chain,
  onClick,
  children,
  className = "",
}: {
  chain?: ChainType;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { openWalletModal } = useWalletModalContext();
  const { connected } = useChainWallet();

  function handleClick() {
    if (!connected) {
      openWalletModal(true, chain);
    } else {
      onClick();
    }
  }

  return (
    <div className={cn("", className)} onClick={handleClick}>
      {children}
    </div>
  );
}
