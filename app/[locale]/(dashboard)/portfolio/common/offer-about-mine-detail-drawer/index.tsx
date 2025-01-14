import Image from "next/image";

import { IOffer } from "@/lib/types/offer";
import MyAskDetail from "./my-ask-detail";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
      <VisuallyHidden asChild>
        <DialogTitle>Offer Detail</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="w-[740px] gap-0 overflow-y-auto rounded border border-border-black !bg-bg-black p-4 sm:p-0"
      >
        <div className="flex w-full items-center justify-between border-b border-border-black px-5 py-4">
          <div className="flex items-center space-x-[10px]">
            <div className="text-[18px] leading-[28px] text-title-white">
              {ot("cap-OfferDetail")}
            </div>
          </div>
          <Image
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="cursor-pointer"
            onClick={() => handleDrawerToggle(false)}
          />
        </div>

        <MyAskDetail
          holdingId={holdingId}
          offer={offer}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
