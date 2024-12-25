import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";

export default function AccountVerifyDialog({
  marketName,
  targetUrl,
  open,
  setOpen,
}: {
  marketName: string;
  targetUrl: string;
  open: boolean;
  setOpen: (_o: boolean) => void;
}) {
  const t = useTranslations("drawer-CreateOffer");
  function handleGo() {
    window.open(targetUrl);
  }

  return (
    <Dialog aria-describedby={undefined} open={open} onOpenChange={setOpen}>
      <VisuallyHidden asChild>
        <DialogTitle>Go Register Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="z-[101] flex w-[360px] flex-col items-center gap-0 rounded-3xl border-none bg-white p-4"
        showClose={false}
      >
        <div className="mb-3 text-xl leading-[30px] text-black">
          {t("cap-RegisterAccount")}
        </div>
        <div className="min-h-10 px-5 text-center text-sm leading-5 text-black">
          {t.rich("text-RegisterAccount", {
            symbol: () => (
              <span className="mx-2 inline-block text-red">{marketName}</span>
            ),
          })}
        </div>
        <div className="mt-10 w-full">
          <button
            onClick={handleGo}
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-yellow bg-yellow text-black"
          >
            {t("text-Go")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
