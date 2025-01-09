import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
        className="z-[110] flex w-[400px] flex-col gap-0 rounded-3xl border-none bg-bg-black p-6"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/img/taker_order_filled.png"
            width={120}
            height={120}
            alt="placeholder"
          />
          <div className="mt-4 text-xl leading-[30px] text-txt-white">
            Taker Order filled
          </div>
        </div>

        <div className="mt-4 text-sm leading-5">
          <div className="flex justify-between">
            <div className="text-gray">Sub No.</div>
            <div className="text-txt-white">#{res.no}</div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="text-gray">Deposited</div>
            <div className="flex items-center space-x-1 text-txt-white">
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
            <div className="text-txt-white">
              {truncateAddr(res.tx, {
                nPrefix: 4,
                nSuffix: 4,
              })}
            </div>
          </div>
        </div>

        <Link href={`/portfolio`}>
          <button className="mt-7 flex h-12 w-full items-center justify-center rounded-2xl bg-main leading-6 text-txt-white">
            <span className="mr-1 inline-block">Go To My Holdings</span>
            <Image
              src="/icons/right-45.svg"
              className="rotate-45"
              width={20}
              height={20}
              alt="token"
            />
          </button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
