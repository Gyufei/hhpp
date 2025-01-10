import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import { useTranslations } from "next-intl";

export default function FeeDisplay() {
  const cot = useTranslations("drawer-CreateOffer");
  const { minAmount } = useGlobalConfig();

  return (
    <div className="mt-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs leading-[18px] text-gray">
          {cot("lb-MinimumOrderAmount")}
        </div>
        <div className="text-xs leading-[18px] text-title-white">
          ${minAmount}
        </div>
      </div>
    </div>
  );
}
