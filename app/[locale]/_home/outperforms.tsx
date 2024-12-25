"use client";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils/common";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OutPerforms() {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col items-center bg-[rgba(224,255,98,0.1)] px-4 pt-[80px] sm:px-[120px]">
      <div className="text-[24px] leading-9 text-black sm:text-[40px] sm:leading-10">
        {t("cap-WhyTadleOutperformsOthers")}
      </div>
      <div className="mt-[60px] flex flex-col items-stretch">
        <div className="flex flex-1 flex-col items-center justify-between sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/rocket.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-OptimalCapitalEfficiency")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-OptimalCapitalEfficiency")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-0 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-SuperiorLiquidity")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-SuperiorLiquidity")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/liquidity.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col items-center justify-between sm:mt-0 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/fee.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-LowTradingFee")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-LowTradingFee")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-[87px] sm:flex-row sm:items-stretch">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-AdvancedTradingSystem")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-AdvancedTradingSystem")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/system.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col items-center justify-between sm:mt-[87px] sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/security.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-RobustSecurity")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-RobustSecurity")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col-reverse items-center justify-between sm:mt-[87px] sm:flex-row sm:items-stretch">
          <div className="flex flex-1 flex-col items-center pt-10 sm:items-start sm:justify-between">
            <div>
              <div className="text-center text-base leading-6 text-black sm:text-left sm:text-[30px] sm:leading-[42px]">
                {t("cap-DecentralizedArbitrationForSettlements")}
              </div>
              <div
                className={cn(
                  "mt-6 text-center text-sm leading-6 text-gray sm:text-left sm:text-xl sm:leading-[30px]",
                  inter.className,
                )}
              >
                {t("p-DecentralizedArbitrationForSettlements")}
              </div>
            </div>
            <ReadMore onClick={() => {}} />
          </div>
          <div className="flex flex-1 items-stretch justify-center">
            <Image
              src="/img/home/settlements.png"
              width={560}
              height={372}
              alt="rocket"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadMore({ onClick }: { onClick: () => void }) {
  const t = useTranslations("Home");

  return (
    <div
      onClick={onClick}
      className="mt-6 flex h-12 w-[200px] cursor-pointer items-center justify-center space-x-1 rounded-xl bg-yellow text-lg leading-6 hover:w-[200px] hover:bg-yellow sm:mb-10 sm:mt-0 sm:w-fit sm:bg-transparent"
    >
      <div className="flex justify-between space-x-1">
        <div className="text-lg leading-6 text-black">{t("btn-ReadMore")}</div>
        <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
      </div>
    </div>
  );
}
