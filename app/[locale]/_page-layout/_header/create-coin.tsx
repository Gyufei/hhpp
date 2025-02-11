import { cn } from "@/lib/utils/common";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { NumericalInput } from "@/components/share/numerical-input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCoin({ className }: { className?: string }) {
  const CT = useTranslations("Common");
  const T = useTranslations("CreateCoin");

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [ticker, setTicker] = useState("");
  const [tickerError, setTickerError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [initialTotalSupply, setInitialTotalSupply] = useState("");
  const [initialTotalSupplyError, setInitialTotalSupplyError] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");

  const canCreate =
    !nameError &&
    !tickerError &&
    !descriptionError &&
    !initialTotalSupplyError &&
    !imageError;

  function onOpenChange(isOpen: boolean) {
    setOpen(isOpen);
  }

  function handleNameInput(v: string) {
    setName(v);
    checkNameInput(v);
  }

  function handleTickerInput(v: string) {
    setTicker(v);
    checkTickerInput(v);
  }

  function handleDescriptionInput(v: string) {
    setDescription(v);
    checkDescriptionInput(v);
  }

  function handleInitTotalSupplyInput(v: string) {
    setInitialTotalSupply(v);
    checkInitTotalSupply(v);
  }

  function handleImageInput(v: string) {
    setImage(v);
    checkImageInput(v);
  }

  function checkNameInput(v: string) {
    if (!v.length) {
      setNameError(CT("StrLengthError", { name: T("Name"), length: 1 }));
      return false;
    }

    setNameError("");
    return true;
  }

  function checkTickerInput(v: string) {
    if (!v.length) {
      setTickerError(CT("StrLengthError", { name: T("Ticker"), length: 1 }));
      return false;
    }

    setTickerError("");
    return true;
  }

  function checkDescriptionInput(v: string) {
    if (!v.length) {
      setDescriptionError(
        CT("StrLengthError", { name: T("Description"), length: 1 }),
      );
      return false;
    }

    setDescriptionError("");
    return true;
  }

  function checkInitTotalSupply(v: string) {
    const limit = 1000;
    if (Number(v) < limit) {
      setInitialTotalSupplyError(
        T("InitialTotalSupplyError", { total: limit }),
      );
      return false;
    }

    setInitialTotalSupplyError("");
    return true;
  }

  function checkImageInput(v: string) {
    if (!v.length) {
      setImageError(T("ImageError"));
      return false;
    }

    const imageUrlRegex =
      /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{2,5})?(?:\/[^?\s]*)?\.(jpg|jpeg|png|gif|bmp|tiff)(?:\?[^#\s]*)?(?:#[^\s]*)?$/;

    if (!imageUrlRegex.test(v)) {
      setImageError(T("ImageError"));
      return false;
    }

    setImageError("");
    return true;
  }

  function handleSave() {
    if (!canCreate) return;

    const isNameValid = checkNameInput(name);
    const isTickerValid = checkTickerInput(ticker);
    const isDescriptionValid = checkDescriptionInput(description);
    const isInitTotalSupplyValid = checkInitTotalSupply(initialTotalSupply);
    const isImageValid = checkImageInput(image);

    if (
      !(
        isNameValid &&
        isTickerValid &&
        isDescriptionValid &&
        isInitTotalSupplyValid &&
        isImageValid
      )
    ) {
      return;
    }

    console.log("create");
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogTrigger className={cn(className)}>{T("CreateCoin")}</DialogTrigger>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle>{T("CreateCoin")}</DialogTitle>
        <div className="flex w-full flex-col p-5">
          <div>
            <LabelText>{T("Name")}</LabelText>
            <Input
              placeholder={T("Name")}
              value={name}
              onChange={(e) => handleNameInput(e.target.value)}
              type="text"
              className="mt-[10px] h-8 w-full rounded border border-border-black bg-transparent px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
            />
            <ErrorText>{nameError}</ErrorText>
          </div>

          <div>
            <LabelText>{T("Ticker")}</LabelText>
            <div className="relative mt-[10px]">
              <NumericalInput
                placeholder={T("Ticker")}
                value={ticker}
                onUserInput={handleTickerInput}
                className="h-8 w-full rounded border border-border-black bg-transparent px-[10px] pl-10 text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
              />
              <span className="absolute left-[10px] top-[8px] flex items-center gap-[10px] text-xs">
                <span className="text-title-white">$</span>
                <span className="text-gray">|</span>
              </span>
            </div>
            <ErrorText>{tickerError}</ErrorText>
          </div>

          <div>
            <LabelText>{T("Description")}</LabelText>
            <Textarea
              value={description}
              onChange={(e) => handleDescriptionInput(e.target.value)}
              placeholder={T("DescriptionContent")}
              className="mt-[10px] h-[66px] rounded border border-border-black text-xs leading-[18px] text-title-white placeholder:text-gray"
            />
            <ErrorText>{descriptionError}</ErrorText>
          </div>

          <div>
            <LabelText>{T("InitialTotalSupply")}</LabelText>
            <NumericalInput
              placeholder={T("InitialTotalSupply")}
              value={initialTotalSupply}
              onUserInput={handleInitTotalSupplyInput}
              className="mt-[10px] h-8 w-full rounded border border-border-black bg-transparent px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
            />
            <ErrorText>{initialTotalSupplyError}</ErrorText>
          </div>

          <div>
            <LabelText>{T("Image")}</LabelText>
            <Input
              placeholder="https://"
              value={image}
              onChange={(e) => handleImageInput(e.target.value)}
              type="text"
              className="mt-[10px] h-8 w-full rounded border border-border-black bg-transparent px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white"
            />
            <ErrorText>{imageError}</ErrorText>
          </div>

          <div className="mt-[5px] flex w-full items-center justify-center">
            <button
              disabled={!canCreate}
              onClick={handleSave}
              className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive"
            >
              {T("CreateCoin")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs leading-[18px] text-title-white">{children}</div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[15px] text-xs leading-[18px] text-red">{children}</div>
  );
}
