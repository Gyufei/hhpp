import Image from "next/image";
import NewestItemCard from "./newest-item-card";
import { useTranslations } from "next-intl";
import { Link } from "@/app/navigation";
import { DocLink } from "@/lib/utils/social";

export default function HomeBanner() {
  const t = useTranslations("Home");

  return (
    <div
      className="flex h-[680px] flex-col items-center pt-[50px] sm:pt-[252px]"
      style={{
        backgroundImage: "url(/img/home/home-bg-1.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative hidden min-w-[1023px] text-center text-[50px] leading-[72px] text-txt-white sm:flex sm:flex-col">
        {t("cap-DecentralizedPreMarketInfrastructure")}
        <Image
          src="/img/home/home-title-path.png"
          width={220}
          height={160}
          alt="home title path"
          className="absolute left-[90px] top-[66px]"
        />
      </div>
      <div className="flex justify-center text-center text-[40px] leading-[60px] text-txt-white sm:hidden">
        {t("cap-TheFirstPreSuperMarket")}
      </div>

      <div className="mt-10 hidden text-center text-xl leading-[30px] text-lightgray sm:flex">
        {t("cap-BridgingLiquidityBetweenPrimaryAndSecondaryMarkets")}
      </div>
      <div className="mt-[10px] block text-center text-sm leading-[20px] text-lightgray sm:hidden">
        {t("cap-BridgingLiquidityBetweenPrimaryAndSecondaryMarkets")}
      </div>

      <div className="mt-10 flex w-full flex-col items-center px-4 sm:w-fit sm:flex-row sm:space-x-10 sm:px-0">
        <Link href="/marketplace">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-yellow px-5 text-lg leading-6">
            {t("btn-GetStarted")}
          </div>
        </Link>
        <Link
          href={DocLink}
          className="ml-1 mt-[22px] flex cursor-pointer items-center space-x-1 sm:ml-0 sm:mt-0"
        >
          <div className="text-lg leading-6 text-txt-white">
            {t("btn-ReadTheDocs")}
          </div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </Link>
      </div>

      <NewestItemCard />
    </div>
  );
}
