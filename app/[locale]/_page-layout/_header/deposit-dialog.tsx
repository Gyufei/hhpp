import Image from "next/image";
import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function DepositDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const T = useTranslations("Header");
  const chainConfig = ChainConfigs[ChainType.HYPER];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle>{T("Deposit")}</DialogTitle>

        <div className="flex flex-col items-center p-5">
          <div className="break-all text-center text-xs leading-[18px] text-gray">
            {chainConfig.contracts.deposit}
          </div>

          <QrCode src={`/img/qrcode/${chainConfig.contracts.deposit}.png`} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function QrCode({ src }: { src: string }) {
  return (
    <div className="mt-[15px] h-[280px] w-[280px] bg-bg-black">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <Image
          src={src}
          alt="qrcode"
          width={250}
          height={250}
          className="rounded"
        />
        <Image
          src="/img/qrcode/corner-border-1.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute left-0 top-0 -rotate-90"
        />
        <Image
          src="/img/qrcode/corner-border-1.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute right-0 top-0"
        />
        <Image
          src="/img/qrcode/corner-border-1.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute bottom-0 left-0 rotate-180"
        />
        <Image
          src="/img/qrcode/corner-border-1.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute bottom-0 right-0 rotate-90"
        />
      </div>
    </div>
  );
}
