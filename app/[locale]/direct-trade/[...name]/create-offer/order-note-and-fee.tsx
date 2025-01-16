import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import FeeDisplay from "./fee-display";
import { useTranslations } from "next-intl";

export default function OrderNoteAndFee({
  value,
  onValueChange,
  type,
}: {
  value: string;
  onValueChange: (_v: string) => void;
  type: "buy" | "sell";
}) {
  const cot = useTranslations("drawer-CreateOffer");
  const [showInput, setShowInput] = useState(false);

  function handleInputNote(v: string) {
    if (v.length > 50) {
      return;
    }

    onValueChange(v);
  }

  function handleShowInput(val: boolean) {
    setShowInput(val);
    if (!val) {
      onValueChange("");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1">
        <div className="mr-[6px] text-xs leading-[18px] text-title-white">
          {cot("cap-OrderNote")}
        </div>
        <Checkbox
          checked={showInput}
          onCheckedChange={(v) => handleShowInput(!!v)}
        />
      </div>
      {showInput && (
        <>
          <div className="relative mt-2">
            <Textarea
              value={value}
              onChange={(e) => handleInputNote(e.target.value)}
              placeholder={
                type === "buy"
                  ? cot("pl-AnythingYouWantToInformTheSeller")
                  : cot("pl-AnythingYouWantToInformTheBuyer")
              }
              className="h-[66px] rounded border border-border-black text-xs leading-[18px] text-title-white placeholder:text-gray"
            />
            <div className="absolute bottom-2 right-4 text-xs leading-[18px] text-gray">
              {value.length} / 50
            </div>
          </div>
          <FeeDisplay />
        </>
      )}
    </div>
  );
}
