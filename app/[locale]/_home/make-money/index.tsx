import { useTranslations } from "next-intl";
import ModeDesc from "./mode-desc";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils/common";

export default function MakeMoney() {
  const t = useTranslations("Home");
  return (
    <div className="mx-4 mt-6 flex flex-col items-center pt-6 pb-[72px] sm:mx-[120px]">
      <div className="text-[24px] leading-[36px] text-black sm:text-[40px] sm:leading-[60px]">
        {t("cap-TradePointsToMakeMoney")}
      </div>
      <div className="flex flex-1 flex-col items-stretch justify-between space-x-0 sm:flex-row sm:space-x-[80px]">
        <div className="flex-1 pt-[40px] sm:pt-[60px]">
          <div className="mb-3 text-center text-base leading-6 text-black sm:mb-[30px] sm:text-right sm:text-[30px] sm:leading-[42px]">
            {t("cap-SpecialPointMarket")}
          </div>
          <div
            className={cn(
              "flex flex-col space-y-4 text-base leading-[30px] text-gray",
              inter.className,
            )}
          >
            <div>{t("p-SpecialPointMarket1")}</div>
            <div>{t("p-SpecialPointMarket2")}</div>
            <div>{t("p-SpecialPointMarket3")}</div>
          </div>
        </div>
        <ModeDesc />
      </div>
    </div>
  );
}
