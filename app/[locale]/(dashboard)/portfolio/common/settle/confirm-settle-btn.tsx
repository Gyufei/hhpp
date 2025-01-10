import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { ChainType } from "@/lib/types/chain";
import { useTranslations } from "next-intl";

export default function ConfirmSettleBtn({
  chain,
  onClick,
  disabled,
}: {
  chain?: ChainType;
  onClick: () => void;
  disabled: boolean;
}) {
  const T = useTranslations("dialog-Settle");
  return (
    <WithWalletConnectBtn className="w-full" chain={chain} onClick={onClick}>
      <button
        disabled={disabled}
        className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-yellow leading-6 text-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {T("btn-ConfirmThisSettlement")}
      </button>
    </WithWalletConnectBtn>
  );
}
