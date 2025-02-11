import { useTranslations } from "next-intl";
import { WithTip } from "@/components/share/with-tip";
import { useUserData } from "@/lib/hooks/api/use-user-data";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function PortfolioInfo() {
  const T = useTranslations("Dashboard");
  const { data: accountInfo } = useAccountInfo();
  const { data: userData, isLoading: isUserDataLoading } = useUserData(
    accountInfo?.dest_account,
  );

  if (isUserDataLoading) return null;
  return (
    <>
      <div className="flex flex-col items-center justify-start text-xs sm:flex-row sm:space-x-4">
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Equity"}>
            {T("Equity")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>$1,000,000</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Volume"}>
            {T("14DayVolume")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>${userData.volume}</div>
          </div>
        </div>
        {/* <div className="flex flex-col items-start justify-between">
          <WithTip className="text-gray" content={"View Fee Schedule"}>
            {T("Fees(Taker/Maker)")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center  text-title-white">
            <div>0.0350% / 0.0100%</div>
          </div>
        </div> */}
      </div>
    </>
  );
}
