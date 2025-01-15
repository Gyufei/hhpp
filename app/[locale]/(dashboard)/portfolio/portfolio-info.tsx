import { useTranslations } from "next-intl";

export default function PortfolioInfo() {
  const T = useTranslations("menu-Dashboard");
  return (
    <>
      <div className="flex flex-col items-center justify-start text-[12px] sm:flex-row sm:space-x-4">
        <div className="flex flex-col items-start justify-between object-contain">
          <div className="text-gray underline">{T("cap-Equity")}</div>
          <div className="mt-1 flex items-center justify-center text-txt-white">
            <div>$1,000,000</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between object-contain">
          <div className="text-gray underline">{T("cap-14DayVolume")}</div>
          <div className="mt-1 flex items-center justify-center text-txt-white">
            <div>$1,000,000</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between">
          <div className="text-gray underline">
            {T("cap-Fees(Taker/Maker)")}
          </div>
          <div className="mt-1 flex items-center justify-center  text-txt-white">
            <div>0.0350%/0.0100%</div>
          </div>
        </div>
      </div>
    </>
  );
}
