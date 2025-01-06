import { useEffect, useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import AskDetail from "../offer-detail/ask-detail";
import OfferFillDialog from "./offer-fill-dialog";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import { reportEvent } from "@/lib/utils/analytics";

export default function OfferDetailDrawer({
  offers,
  onSuccess,
}: {
  offers: Array<IOffer>;
  onSuccess: () => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");
  const { isMobileSize } = useDeviceSize();
  const { anchor: offerId, setAnchorValue } = useAnchor();

  const offer = useMemo(() => {
    return offers?.find((o) => String(o.entry.id) === offerId);
  }, [offers, offerId]);

  const { connected } = useChainWallet();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<any | null>(null);

  useEffect(() => {
    if (offer && connected) {
      setDrawerOpen(true);
    }

    if (!offerId) {
      setDrawerOpen(false);
    }
  }, [offer, offerId, connected]);

  function handleSuccess(ord: Record<string, any>) {
    reportEvent("askOffer" + "Success", {
      value: offer?.entry?.id,
    });
    setResultOrder(ord);
    setOrderFillDialog(true);
    onSuccess();
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
    setAnchorValue("");
  }

  if (!offer) {
    return null;
  }

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        direction={isMobileSize ? "bottom" : "right"}
        size={isMobileSize ? "calc(100vh - 44px)" : 952}
        className="overflow-y-auto rounded-none !bg-bg-black p-4 sm:rounded-l-2xl sm:p-6"
      >
        {isMobileSize ? (
          <MobileDrawerTitle
            title={ot("cap-AskOfferDetail")}
            onClose={handleDrawerClose}
          />
        ) : (
          <DrawerTitle
            title={ot("cap-AskOfferDetail")}
            onClose={handleDrawerClose}
          />
        )}
        <AskDetail onSuccess={(ord) => handleSuccess(ord)} offer={offer} />
      </Drawer>
      {resultOrder && (
        <OfferFillDialog
          open={orderFillDialog}
          onOpenChange={(val) => {
            setOrderFillDialog(val);
            if (!val) {
              handleDrawerClose();
            }
          }}
          res={resultOrder}
          chain={offer?.marketplace.chain}
        />
      )}
    </>
  );
}
