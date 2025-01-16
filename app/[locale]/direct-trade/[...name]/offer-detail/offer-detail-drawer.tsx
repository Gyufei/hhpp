import { useEffect, useState } from "react";
import AskDetail from "./ask-detail";
import OfferFillDialog from "./offer-fill-dialog";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { reportEvent } from "@/lib/utils/analytics";
import DrawerTitle from "@/components/share/drawer-title";
import Drawer from "react-modern-drawer";

export default function OfferDetailDrawer({
  offer,
  onSuccess,
  onClose,
}: {
  offer: IOffer | null;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");

  const { connected } = useChainWallet();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<any | null>(null);

  useEffect(() => {
    if (offer && connected) {
      setDrawerOpen(true);
    }

    if (!offer) {
      setDrawerOpen(false);
    }
  }, [offer, connected]);

  function handleSuccess(ord: Record<string, any>) {
    reportEvent("askOffer" + "Success", {
      value: offer?.entry?.id,
    });
    setResultOrder(ord);
    setOrderFillDialog(true);
    onSuccess();
  }

  function handleDrawerToggle(v: boolean) {
    setDrawerOpen(v);
    if (!v) {
      onClose();
    }
  }

  if (!offer) {
    return null;
  }

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={() => handleDrawerToggle(false)}
        direction="right"
        size={740}
        className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-4 sm:p-0"
      >
        <DrawerTitle
          title={ot("cap-OfferDetail")}
          onClose={() => setDrawerOpen(false)}
        />

        <AskDetail onSuccess={(ord) => handleSuccess(ord)} offer={offer} />
      </Drawer>

      {resultOrder && (
        <OfferFillDialog
          open={orderFillDialog}
          onOpenChange={(val) => {
            setOrderFillDialog(val);
            if (!val) {
              handleDrawerToggle(false);
            }
          }}
          res={resultOrder}
        />
      )}
    </>
  );
}
