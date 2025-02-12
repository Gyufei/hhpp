import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { toast } from "react-hot-toast";

export default function ReferralLink() {
  const T = useTranslations("Referral");

  const { data: referralData } = useReferralData();

  const refLink = useMemo(() => {
    if (!referralData) return "";
    const defaultRef = referralData.find((ref) => ref.flag === "1");

    if (!defaultRef) return "";
    return `${window.location.origin}/s/${defaultRef?.referral_code || ""}`;
  }, [referralData]);

  function handleCopy() {
    if (!refLink) return;
    navigator.clipboard.writeText(refLink);

    toast.success("Copied to clipboard");
  }

  return (
    <div className="p-[10px] pb-[20px]  text-xs">
      <div className="leading-[18px] text-title-white">
        {T("YourReferralLink")}
      </div>
      <div className="relative mt-[10px]">
        <div className="flex h-8 items-center justify-between space-x-2 rounded border border-border-black pl-4 hover:border-[#d1d4dc]">
          <div className="flex-1 truncate text-title-white">{refLink}</div>

          <div className="flex items-center ">
            <button
              className="flex items-center space-x-1 rounded-lg px-2 py-1 text-gray hover:text-[#50D2C1]"
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
