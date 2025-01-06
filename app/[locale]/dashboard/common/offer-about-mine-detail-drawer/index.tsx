import Drawer from "react-modern-drawer";
import DrawerTitle from "@/components/share/drawer-title";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";

import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import { useTranslations } from "next-intl";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function OfferAboutMineDetailDrawer({
  holdingId,
  offer,
  onSuccess,
  drawerOpen,
  setDrawerOpen,
}: {
  holdingId: string;
  offer: IOffer | undefined;
  onSuccess: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");
  const { isMobileSize } = useDeviceSize();

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function handleSuccess() {
    if (!drawerOpen) return;
    setDrawerOpen(false);
    onSuccess();
  }

  if (!offer) return null;

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleDrawerClose}
      direction={isMobileSize ? "bottom" : "right"}
      size={isMobileSize ? "calc(100vh - 44px)" : 952}
      className="overflow-y-auto rounded-none !bg-bg-black p-4 sm:rounded-l-2xl sm:p-6"
      customIdSuffix="detail-drawer"
    >
      {isMobileSize ? (
        <MobileDrawerTitle
          title={ot("cap-MyAskOfferDetail")}
          onClose={handleDrawerClose}
        />
      ) : (
        <DrawerTitle
          title={ot("cap-MyAskOfferDetail")}
          onClose={handleDrawerClose}
        />
      )}
      {offer && (
        <MyAskDetail
          holdingId={holdingId}
          offer={offer}
          onSuccess={handleSuccess}
        />
      )}
    </Drawer>
  );
}
