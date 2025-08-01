import { useTranslations } from "next-intl";
import Drawer from "react-modern-drawer";
import { IOffer } from "@/lib/types/offer";
import DrawerTitle from "@/components/share/drawer-title";

import MyAskDetail from "./my-ask-detail";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function OfferAboutMineDetailDrawer({
  offer,
  onSuccess,
  drawerOpen,
  setDrawerOpen,
}: {
  offer: IOffer | undefined;
  onSuccess: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}) {
  const T = useTranslations("Offer");

  const { isMobileSize } = useDeviceSize();

  function handleSuccess() {
    if (!drawerOpen) return;
    setDrawerOpen(false);
    onSuccess();
  }

  function handleDrawerToggle(v: boolean) {
    setDrawerOpen(v);
  }

  if (!offer) return null;

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => handleDrawerToggle(false)}
      direction="right"
      size={isMobileSize ? "100%" : 740}
      className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-0"
    >
      <DrawerTitle
        title={T("OfferDetail")}
        onClose={() => setDrawerOpen(false)}
      />

      <MyAskDetail offer={offer} onSuccess={handleSuccess} />
    </Drawer>
  );
}
