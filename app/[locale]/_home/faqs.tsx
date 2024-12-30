"use client";

import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React, { forwardRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/navigation";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils/common";

export default function Faqs() {
  const t = useTranslations("Home");
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div className="mt-[60px] bg-[rgba(224,255,98,0.1)] px-4 py-20 sm:px-[120px]">
      <div className="flex items-center justify-between">
        <div />
        <div className="text-center text-2xl leading-9 text-black sm:text-4xl sm:leading-[54px]">
          {t("cap-FAQ")}
        </div>
        <div className="flex cursor-pointer items-center space-x-1">
          <Link
            className="flex items-center"
            href="https://hyper.gitbook.io/faq"
          >
            <div className="text-lg leading-6 text-black">{t("btn-More")}</div>
            <Image
              src="/icons/right-arrow.svg"
              width={24}
              height={24}
              alt="go"
            />
          </Link>
        </div>
      </div>

      <Collapsible
        open={openIdx === 0}
        onOpenChange={(open) => setOpenIdx(open ? 0 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 0}>
            {t("cap-WhatIsPoint")}
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>{t("p-WhatIsPoint")}</CollContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openIdx === 1}
        onOpenChange={(open) => setOpenIdx(open ? 1 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 1}>
            {t("cap-WhatIsPointMarket")}
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>{t("p-WhatIsPointMarket")}</CollContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={openIdx === 2}
        onOpenChange={(open) => setOpenIdx(open ? 2 : -1)}
        className="py-6"
        style={{
          boxShadow: "inset 0px -2px 0px 0px #F0F1F5",
        }}
      >
        <CollapsibleTrigger asChild>
          <CollTrigger isOpen={openIdx === 2}>
            {t("cap-HowDoIStartToTrade")}
          </CollTrigger>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollContent>
            1. {t("p-HowDoIStartToTrade1")}
            <br />
            2. {t("p-HowDoIStartToTrade2")}
            <br />
            3. {t("p-HowDoIStartToTrade3")}
            <br />
            4. {t("p-HowDoIStartToTrade4")}
            <br />
          </CollContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

const CollTrigger = forwardRef(
  (
    {
      isOpen,
      children,
      ...props
    }: { isOpen: boolean; children: React.ReactNode },
    ref: any,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center space-x-5">
          <CollDot />
          <div className="relative">
            <div className="relative z-10 text-base leading-6 text-[#3D3D3D] sm:text-xl sm:leading-[30px]">
              {children}
            </div>
            {isOpen && (
              <div className="absolute bottom-[6px] z-0 h-1 w-full rounded-full bg-yellow"></div>
            )}
          </div>
        </div>

        <div>
          {isOpen ? (
            <Image src="/icons/close.svg" width={20} height={20} alt="close" />
          ) : (
            <Image src="/icons/plus.svg" width={20} height={20} alt="close" />
          )}
        </div>
      </button>
    );
  },
);
CollTrigger.displayName = "CollTrigger";

function CollDot() {
  return (
    <div className="h-1 w-1 rounded-full bg-black sm:h-[6px] sm:w-[6px]"></div>
  );
}

function CollContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "mt-[10px] pl-[26px] text-sm leading-5 text-gray sm:text-base sm:leading-6",
        inter.className,
      )}
    >
      {children}
    </div>
  );
}
