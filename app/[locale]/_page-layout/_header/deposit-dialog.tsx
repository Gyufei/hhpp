import Image from "next/image";
import { useTranslations } from "next-intl";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { WithTip } from "@/components/share/with-tip";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export function DepositDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const T = useTranslations("Common");
  const CT = useTranslations("Common");
  const chainConfig = ChainConfigs[ChainType.HYPER];

  const { data: accountInfo } = useAccountInfo();
  const isPublic = accountInfo?.trading_mode === "Public";
  const depositContract = isPublic
    ? chainConfig.contracts.publicDeposit
    : chainConfig.contracts.privateDeposit;

  function handleCopy() {
    navigator.clipboard.writeText(depositContract);
    toast.success("Copied to clipboard");
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle>{T("Deposit")}</DialogTitle>

        <div className="flex flex-col items-center p-5">
          <WithTip content={CT("Copy")}>
            <div
              onClick={handleCopy}
              className="break-all text-center text-xs leading-[18px] text-gray hover:text-main"
            >
              {depositContract}
            </div>
          </WithTip>

          <QrCode
            src={
              `/img/qrcode/${depositContract}.png` +
              `?v=${new Date().getDate()}`
            }
          />

          <div className="mt-5 flex w-full items-center justify-between px-[10px]">
            <div className="text-xs leading-[18px] text-gray">
              {CT("Network")}
            </div>
            <div className="text-xs leading-[18px] text-title-white">
              {chainConfig.name}
            </div>
          </div>

          <div className="mt-[10px] flex w-full items-center justify-between px-[10px]">
            <div className="text-xs leading-[18px] text-gray">USDC</div>
            <div className="text-xs leading-[18px] text-title-white">
              {T("ContractEndWith")}
              {` ***${chainConfig.contracts.USDC.slice(-5)}`}
            </div>
          </div>

          <div className="mt-[10px] w-full rounded bg-[#50D2C110] p-[10px] text-xs leading-[18px] text-main">
            {T("DepositTip")}
          </div>
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
