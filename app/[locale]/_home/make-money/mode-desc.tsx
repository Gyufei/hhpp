"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/app/navigation";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils/common";

export default function ModeDesc() {
  const t = useTranslations("Home");
  const [mode, setMode] = useState("turbo");

  return (
    <div
      className="flex flex-1 flex-col pt-[40px] sm:pt-[60px]"
      style={{
        backgroundImage: "url(/img/home/make-money.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
      }}
    >
      <div className="mb-7 flex items-center justify-center space-x-5 text-lg leading-6 sm:justify-start">
        <div
          data-active={mode === "turbo"}
          onClick={() => setMode("turbo")}
          className="flex h-12 cursor-pointer items-center justify-center rounded-xl px-[20px] text-[#c0c4cc] data-[active=true]:bg-yellow data-[active=true]:text-black md:px-[30px]"
        >
          {t("btn-TurboMode")}
        </div>
        <div
          data-active={mode === "protected"}
          onClick={() => setMode("protected")}
          className="flex h-12 cursor-pointer items-center justify-center rounded-xl px-[30px] text-[#c0c4cc] data-[active=true]:bg-yellow data-[active=true]:text-black"
        >
          {t("btn-ProtectedMode")}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {mode === "turbo" && (
          <div
            className={cn(
              "flex flex-col space-y-4 text-base leading-[30px] text-gray",
              inter.className,
            )}
          >
            <div>{t("p-TurboMode1")}</div>
            <div>{t("p-TurboMode2")}</div>
          </div>
        )}
        {mode === "protected" && (
          <div
            className={cn(
              "flex flex-col space-y-4 text-base leading-[30px] text-gray",
              inter.className,
            )}
          >
            <div>{t("p-ProtectedMode1")}</div>
            <div>{t("p-ProtectedMode2")}</div>
          </div>
        )}

        <Link
          href="/marketplace"
          className="mt-[50px] flex cursor-pointer items-center space-x-1 sm:mt-0"
        >
          <div className="text-lg leading-6 text-black">
            {t("btn-StartTrading")}
          </div>
          <Image src="/icons/right-arrow.svg" width={24} height={24} alt="go" />
        </Link>
      </div>
    </div>
  );
}
