import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
    <Dialog open={drawerOpen} onOpenChange={(v) => handleDrawerToggle(v)}>
      <DialogContent className="w-[740px] gap-0 overflow-y-auto rounded border border-border-black !bg-bg-black p-4 sm:p-0">
        <DialogTitle>{ot("cap-OfferDetail")}</DialogTitle>

        <MyAskDetail
          holdingId={holdingId}
          offer={offer}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
