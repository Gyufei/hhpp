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
    <div className="mt-4 flex flex-col">
      <div className="mb-2 flex items-center space-x-1">
        <div className="mr-[6px]  text-sm leading-6 text-txt-white">
          {cot("cap-OrderNote")}
        </div>
        <Checkbox
          checked={showInput}
          onCheckedChange={(v) => handleShowInput(!!v)}
          className="rounded-full"
        />
      </div>
      {showInput && (
        <>
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => handleInputNote(e.target.value)}
              placeholder={
                type === "buy"
                  ? cot("pl-AnythingYouWantToInformTheSeller")
                  : cot("pl-AnythingYouWantToInformTheBuyer")
              }
              className="h-[66px] rounded-xl border border-[#303030] focus:border-focus"
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
