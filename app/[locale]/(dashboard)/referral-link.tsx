import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function ReferralLink() {
  const T = useTranslations("page-Referral");

  const { data: referralData } = useReferralData();

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const refLink = useMemo(() => {
    if (!referralData) return "";
    const defaultRef = referralData.find((ref) => ref.flag === "1");

    if (!defaultRef) return "";
    return `${window.location.origin}/s/${defaultRef?.referral_code || ""}`;
  }, [referralData]);

  function handleCopy() {
    if (!refLink) return;
    navigator.clipboard.writeText(refLink);

    setGlobalMessage({
      type: "success",
      message: "Copied to clipboard",
    });
  }

  return (
    <div className="p-[10px]">
      <div className="text-xs leading-[18px] text-txt-white">
        {T("cap-YourReferralLink")}
      </div>
      <div className="relative mt-[10px]">
        <div className="flex h-8 items-center justify-between space-x-2 rounded border border-txt-white px-4 text-sm">
          <div className="flex-1 truncate text-txt-white">{refLink}</div>

          <div className="flex items-center ">
            <button
              className="flex items-center space-x-1 rounded-lg px-2 py-1 text-xs text-gray text-title-white hover:text-[#50D2C1]"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
