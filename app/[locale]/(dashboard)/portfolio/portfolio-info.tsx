import { useTranslations } from "next-intl";
import { WithTip } from "@/components/share/with-tip";
import { useUserData } from "@/lib/hooks/api/use-user-data";
import { useUserEquity } from "@/lib/hooks/api/use-user-equity";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function PortfolioInfo() {
  const T = useTranslations("Dashboard");
  const { data: accountInfo } = useAccountInfo();
  const { data: userData } = useUserData(accountInfo?.dest_account);
  const { data: equity } = useUserEquity();

  return (
    <>
      <div className="flex flex-col items-center justify-start text-xs sm:flex-row sm:space-x-4">
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Equity"}>
            {T("Equity")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>${equity || 0}</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Volume"}>
            {T("14DayVolume")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>${userData?.volume || 0}</div>
          </div>
        </div>
      </div>
    </>
  );
}
