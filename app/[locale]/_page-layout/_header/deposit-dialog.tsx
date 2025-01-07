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
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-bg-black p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <div className="relative flex w-full items-center justify-center">
          <div className="text-xl leading-[30px] text-txt-white">
            {T("btn-Deposit")}
          </div>
          <Image
            onClick={() => onOpenChange(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="absolute right-0 top-1 cursor-pointer rounded-full hover:bg-main"
          />
        </div>

        <div className="mt-4 break-all text-center text-sm leading-5 text-gray">
          {chainConfig.contracts.deposit}
        </div>

        <QrCode src={`/img/qrcode/${chainConfig.contracts.deposit}.png`} />
      </DialogContent>
    </Dialog>
  );
}

function QrCode({ src }: { src: string }) {
  return (
    <div className="h-[280px] w-[280px] p-5">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt="qrcode"
          fill
          className="scale-[1.05] object-cover"
        />
        <Image
          src="/img/qrcode/corner-border.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute left-0 top-0 -rotate-90"
        />
        <Image
          src="/img/qrcode/corner-border.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute right-0 top-0"
        />
        <Image
          src="/img/qrcode/corner-border.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute bottom-0 left-0 rotate-180"
        />
        <Image
          src="/img/qrcode/corner-border.png"
          alt="copy"
          width={60}
          height={60}
          className="absolute bottom-0 right-0 rotate-90"
        />
      </div>
    </div>
  );
}
