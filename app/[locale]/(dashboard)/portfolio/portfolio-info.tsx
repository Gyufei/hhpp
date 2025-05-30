import { useTranslations } from "next-intl";
import { WithTip } from "@/components/share/with-tip";
import { formatNum } from "@/lib/utils/number";
import { useUserStats } from "@/lib/hooks/api/use-user-stats";

export default function PortfolioInfo() {
  const T = useTranslations("Dashboard");
  const { data: userData } = useUserStats();

  return (
    <>
      <div className="flex flex-col items-center justify-start text-xs sm:flex-row sm:space-x-4">
        <div className="flex flex-col items-start justify-between object-contain">
          <WithTip className="text-gray underline" content={"View Volume"}>
            {T("14DayVolume")}
          </WithTip>
          <div className="mt-1 flex items-center justify-center text-title-white">
            <div>${formatNum(userData?.trade_vol || 0, 6)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
