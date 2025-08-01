import { useEffect, useState } from "react";
import AskDetail from "./ask-detail";
import OfferFillDialog from "./offer-fill-dialog";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import DrawerTitle from "@/components/share/drawer-title";
import Drawer from "react-modern-drawer";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function OfferDetailDrawer({
  offer,
  onSuccess,
  onClose,
}: {
  offer: IOffer | null;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const OT = useTranslations("Offer");
  const { data: accountInfo } = useAccountInfo();

  const { isMobileSize } = useDeviceSize();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderFillDialog, setOrderFillDialog] = useState(false);
  const [resultOrder, setResultOrder] = useState<any | null>(null);

  useEffect(() => {
    if (offer && accountInfo?.dest_account) {
      setDrawerOpen(true);
    }

    if (!offer) {
      setDrawerOpen(false);
    }
  }, [offer, accountInfo?.dest_account]);

  function handleSuccess(ord: Record<string, any>) {
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
        size={isMobileSize ? "100%" : 740}
        className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-0"
      >
        <DrawerTitle
          title={OT("OfferDetail")}
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
