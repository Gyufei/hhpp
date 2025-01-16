import { useTranslations } from "next-intl";
import { WithTip } from "@/components/share/with-tip";
export default function PortfolioInfo() {
  const T = useTranslations("menu-Dashboard");
  return (
    <>
      <div className="flex flex-col items-center justify-start text-xs sm:flex-row sm:space-x-4">
        {/* <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Equity"}>
            {T("cap-Equity")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>$1,000,000</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Volume"}>
            {T("cap-14DayVolume")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>$1,000,000</div>
          </div>
        </div> */}
        <div className="flex flex-col items-start justify-between">
          <WithTip className="text-gray" content={"View Fee Schedule"}>
            {T("cap-Fees(Taker/Maker)")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center  text-title-white">
            <div>0.0350% / 0.0100%</div>
          </div>
        </div>
      </div>
    </>
  );
}
