import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useRollin } from "@/lib/hooks/contract/use-rollin";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";

export default function RollInBtn() {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const T = useTranslations("cd-AccountOverview");
  const { connected } = useChainWallet();

  const { isLoading, isSuccess, write: rollinAction } = useRollin();

  const [isSign, setIsSign] = useState(false);

  function handleSign() {
    if (isSign) {
      setGlobalMessage({
        type: "warning",
        message: "Already rollin",
      });
    }
    if (isLoading || isSign) return;

    rollinAction();
  }

  async function getRollinState() {
    // const res = await getRollingData();
    // const rollinAt = res.rollinAt * 1000;

    // const pastTime = differenceInMinutes(new Date(), new Date(rollinAt));
    // const hasSign = pastTime < 60;
    // setIsSign(hasSign);
    setIsSign(false);
  }

  useEffect(() => {
    if (!connected) return;

    getRollinState();
  }, [connected]);

  useEffect(() => {
    if (isSuccess) {
      setIsSign(true);
      getRollinState();
    }
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn
      onClick={handleSign}
      className="pointer-events-none cursor-not-allowed"
    >
      <div className="flex h-7 w-[74px] cursor-pointer items-center justify-center rounded-[52px] border border-[#303030] text-sm leading-5 text-[#d3d4d6] hover:border-[#FFA95B] hover:text-[#FFA95B]">
        {T("btn-Rollin")}
      </div>
    </WithWalletConnectBtn>
  );
}
