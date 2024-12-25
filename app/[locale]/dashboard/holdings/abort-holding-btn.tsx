import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useAbortAskOffer } from "@/lib/hooks/contract/use-abort-ask-offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { IHolding } from "@/lib/types/holding";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AbortHoldingBtn({
  holding,
  onSuccess,
}: {
  holding: IHolding;
  onSuccess: () => void;
}) {
  const mst = useTranslations("page-MyStocks");

  const { isNativeToken } = useOfferFormat({
    offer: holding?.offer || ({} as IOffer),
  });

  const {
    isLoading,
    write: abortOrderAsTakerAction,
    isSuccess,
  } = useAbortAskOffer({
    chain: holding.marketplace.chain,
    marketplaceStr: holding.marketplace.market_place_account,
    makerStr: holding?.offer?.offer_maker || "",
    offerStr: holding?.offer?.offer_id || "",
    holdingStr: holding.holding_id,
    isNativeToken: isNativeToken,
  });

  function handleConfirm() {
    abortOrderAsTakerAction({
      offerId: holding?.offer?.offer_id,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <WithWalletConnectBtn
      chain={holding.marketplace.chain}
      onClick={() => handleConfirm()}
    >
      <button
        disabled={isLoading}
        className="data-[disabled=true]:bg-gra flex h-7 cursor-pointer items-center space-x-1 rounded-full border border-[#eee] px-5 text-sm leading-5 text-black"
      >
        <span>{mst("btn-Abort")}</span>
      </button>
    </WithWalletConnectBtn>
  );
}
