import { useEffect, useState } from "react";
import Image from "next/image";
import AskDetail from "./ask-detail";
import OfferFillDialog from "./offer-fill-dialog";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { reportEvent } from "@/lib/utils/analytics";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function OfferDetailDialog({
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
      <Dialog open={drawerOpen} onOpenChange={(v) => handleDrawerToggle(v)}>
        <VisuallyHidden asChild>
          <DialogTitle>Offer Detail</DialogTitle>
        </VisuallyHidden>
        <DialogContent
          showClose={false}
          className="w-[740px] gap-0 overflow-y-auto rounded-none border border-border-black !bg-bg-black p-4 sm:p-0"
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

          <AskDetail onSuccess={(ord) => handleSuccess(ord)} offer={offer} />
        </DialogContent>
      </Dialog>

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
