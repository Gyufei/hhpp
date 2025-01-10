import Image from "next/image";
import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
      <VisuallyHidden asChild>
        <DialogTitle>Deposit Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <div className="relative flex w-full items-center justify-between border-b border-border-black px-5 py-[10px]">
          <div className="text-[18px] leading-[28px] text-title-white">
            {T("btn-Deposit")}
          </div>
          <Image
            onClick={() => onOpenChange(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="cursor-pointer rounded-full"
          />
        </div>

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
