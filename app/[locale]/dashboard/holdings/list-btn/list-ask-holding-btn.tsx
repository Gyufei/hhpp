import { useEffect, useState } from "react";
import NP from "number-precision";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import { useTranslations } from "next-intl";

import { InputPanel } from "../../../marketplace/[...name]/create-offer/input-panel";
import { IToken } from "@/lib/types/token";
import { WithTip } from "../../../../../components/share/with-tip";
import ArrowBetween from "../../../marketplace/[...name]/create-offer/arrow-between";
import { StableTokenSelectDisplay } from "../../../marketplace/[...name]/create-offer/stable-token-display";
import OrderNoteAndFee from "../../../marketplace/[...name]/create-offer/order-note-and-fee";
import ListBtn from "./list-btn";
import ListInfo from "./list-info";
import { formatNum } from "@/lib/utils/number";
import { IHolding } from "@/lib/types/holding";
import { useList } from "@/lib/hooks/contract/use-list";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { PointTokenDisplay } from "@/app/[locale]/marketplace/[...name]/create-offer/point-token-display";

export default function ListAskHoldingBtn({
  holding,
  onSuccess,
}: {
  holding: IHolding;
  onSuccess: () => void;
}) {
  const cot = useTranslations("drawer-CreateOffer");
  const T = useTranslations("page-MyStocks");
  const { isMobileSize } = useDeviceSize();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { offerPointInfo, offerTokenInfo, tokenPrice } = useOfferFormat({
    offer: holding?.offer || ({} as any),
  });

  const { data: entryInfo } = useEntryById(holding?.offer?.entry?.id);

  const [sellPointAmount] = useState(String(holding?.offer?.item_amount));
  const [receiveTokenAmount, setReceiveTokenAmount] = useState("");

  const [note, setNote] = useState("");

  const sellPrice = NP.times(receiveTokenAmount, tokenPrice);
  const pointPrice = NP.divide(sellPrice, sellPointAmount);

  const {
    isLoading: isDepositLoading,
    write: writeAction,
    isSuccess,
  } = useList();

  function handleDeposit() {
    if (!sellPointAmount || !receiveTokenAmount) {
      return;
    }

    writeAction({
      price: sellPrice,
      total_item_amount: sellPointAmount,
      entryIds: holding.entries.map((e) => e.id),
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setDrawerOpen(false);
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  return (
    <div>
      <WithWalletConnectBtn
        chain={holding.marketplace.chain}
        onClick={() => setDrawerOpen(true)}
      >
        <ListBtn />
      </WithWalletConnectBtn>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction={isMobileSize ? "bottom" : "right"}
        size={isMobileSize ? "calc(100vh - 44px)" : 952}
        className="overflow-y-auto rounded-none p-4 sm:flex sm:flex-col sm:rounded-l-2xl sm:p-6 "
      >
        {isMobileSize ? (
          <MobileDrawerTitle
            title={T("cap-ListStockAsAskOffer")}
            onClose={() => setDrawerOpen(false)}
          />
        ) : (
          <DrawerTitle
            title={T("cap-ListStockAsAskOffer")}
            onClose={() => setDrawerOpen(false)}
          />
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <ListInfo
              id={holding.holding_id}
              inherit={
                holding?.offer?.entry.id ? String(holding?.offer?.entry.id) : ""
              }
              origin={
                entryInfo?.root_entry_id ? String(entryInfo?.root_entry_id) : ""
              }
            />

            <InputPanel
              value={sellPointAmount}
              onValueChange={() => {}}
              topText={<>{cot("txt-YouWillSell")}</>}
              bottomText={
                <>
                  1 {holding.marketplace.item_name} = ${formatNum(pointPrice)}
                </>
              }
              isCanInput={false}
              tokenSelect={<PointTokenDisplay point={offerPointInfo} />}
            />

            <ArrowBetween className="-my-4 self-center" />

            <InputPanel
              value={receiveTokenAmount}
              onValueChange={setReceiveTokenAmount}
              topText={
                <div className="flex items-center">
                  {cot("txt-YouDLikeToReceive")}
                  <WithTip align="start">
                    {cot("tip-YouDLikeToReceive", {
                      pointName: holding.marketplace.item_name,
                    })}
                  </WithTip>
                </div>
              }
              bottomText={
                <>
                  {cot("txt-RequiredCollateral")} ${formatNum(sellPrice)}
                </>
              }
              tokenSelect={
                <StableTokenSelectDisplay
                  chain={holding.marketplace.chain}
                  token={offerTokenInfo as IToken}
                  setToken={() => {}}
                />
              }
            />

            <OrderNoteAndFee value={note} onValueChange={setNote} type="sell" />
          </div>

          <WithWalletConnectBtn
            chain={holding.marketplace.chain}
            onClick={handleDeposit}
          >
            <button
              disabled={isDepositLoading}
              className="mt-[140px] flex h-12 w-full items-center justify-center rounded-2xl bg-red leading-6 text-white"
            >
              {cot("btn-ConfirmMakerOrder")}
            </button>
          </WithWalletConnectBtn>
        </div>
      </Drawer>
    </div>
  );
}
