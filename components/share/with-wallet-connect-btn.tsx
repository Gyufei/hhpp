import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useWalletModalContext } from "../provider/wallet-modal-provider";

export default function WithWalletConnectBtn({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const { openWalletModal } = useWalletModalContext();
  const { isConnected } = useChainWallet();

  function handleClick() {
    if (!isConnected) {
      openWalletModal(true);
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
