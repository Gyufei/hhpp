import { useTranslations } from "next-intl";
import Drawer from "react-modern-drawer";
import { IOffer } from "@/lib/types/offer";
import DrawerTitle from "@/components/share/drawer-title";

import MyAskDetail from "./my-ask-detail";

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
  const T = useTranslations("Offer");

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
      size={740}
      className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-4 sm:p-0"
    >
      <DrawerTitle
        title={T("OfferDetail")}
        onClose={() => setDrawerOpen(false)}
      />

      <MyAskDetail
        holdingId={holdingId}
        offer={offer}
        onSuccess={handleSuccess}
      />
    </Drawer>
  );
}
