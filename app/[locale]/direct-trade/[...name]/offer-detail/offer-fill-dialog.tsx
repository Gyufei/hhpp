import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import { Link } from "@/i18n/routing";

export default function OfferFillDialog({
  open,
  onOpenChange,
  res,
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  res: Record<string, any>;
}) {
  return (
    <Dialog
      aria-describedby={undefined}
      open={open}
      onOpenChange={(isOpen) => onOpenChange(isOpen)}
    >
      <DialogContent
        overlayClassName="z-[110]"
        className="z-[110] w-[360px] gap-0 overflow-y-auto rounded border border-border-black !bg-bg-black p-4 sm:p-0"
      >
        <DialogTitle>Taker Order filled</DialogTitle>

        <div className="flex flex-col items-center">
          <Image
            src="/icons/taker-order-filled.svg"
            width={200}
            height={200}
            alt="placeholder"
          />
        </div>

        <div className="flex flex-col space-y-[10px] px-5 pb-5 pt-[10px] text-xs leading-[18px]">
          <div className="flex justify-between">
            <div className="text-gray">Sub No.</div>
            <div className="text-title-white">#{res.no}</div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Deposited</div>
            <div className="flex items-center space-x-1 text-title-white">
              <span>${res.pay}</span>
              <Image
                src={res?.token?.logoURI}
                width={16}
                height={16}
                alt="token"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Tx</div>
            <div className="text-title-white">
              {truncateAddr(res.tx, {
                nPrefix: 4,
                nSuffix: 4,
              })}
            </div>
          </div>
        </div>

        <div className="relative border-t border-border-black px-5 py-4">
          <Link href={`/portfolio`}>
            <button className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive">
              Go To My Holdings
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
