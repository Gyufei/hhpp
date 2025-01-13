import HoverIcon from "@/components/share/hover-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils/common";

export default function LanguageSetting() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [popOpen, setPopOpen] = useState(false);

  const langs = [
    {
      label: "English(EN)",
      value: "en",
      logo: "/icons/usa.svg",
    },
    {
      label: "简体中文(CN)",
      value: "zh",
      logo: "/icons/china.svg",
    },
    {
      label: "한국어(KR)",
      value: "ko",
      logo: "/icons/korea.svg",
    },
  ];

  function handleSelectLang(t: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: t },
    );
  }

  return (
    <>
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger className="hidden h-9 w-9 items-center justify-center sm:flex">
          <HoverIcon
            src="/icons/en.svg"
            hoverSrc="/icons/en.svg"
            width={24}
            height={24}
            alt="en"
          />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="hidden w-[124px] flex-col items-stretch border border-border-black bg-bg-black p-1 sm:flex"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
        >
          <LangOptions
            langs={langs}
            locale={locale}
            handleSelectLang={handleSelectLang}
          />
        </PopoverContent>
      </Popover>

      <Collapsible open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <CollapsibleTrigger className="flex h-12 w-full items-center justify-between px-5 text-title-white sm:hidden">
          <div>Language</div>
          <Image
            src="/icons/down.svg"
            width={20}
            height={20}
            alt="arrow"
            className={cn(popOpen ? "rotate-180" : "")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col items-stretch sm:hidden">
          <LangOptions
            langs={langs}
            locale={locale}
            handleSelectLang={handleSelectLang}
          />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

function LangOptions({
  langs,
  locale,
  handleSelectLang,
}: {
  langs: any[];
  locale: string;
  handleSelectLang: (t: string) => void;
}) {
  return (
    <>
      {(langs || []).map((t) => (
        <div
          key={t.value}
          onClick={() => handleSelectLang(t.value)}
          data-active={locale === t.value}
          className="flex h-8 cursor-pointer flex-row-reverse items-center justify-end rounded px-1 pl-[30px] text-xs leading-[18px] text-txt-white hover:text-main data-[active=true]:text-main sm:h-9 sm:flex-row sm:justify-start sm:pl-1"
        >
          <Image
            width={16}
            height={16}
            src={t?.logo || ""}
            alt="select lang"
            className="ml-2 rounded-full sm:ml-0 sm:mr-2"
          ></Image>
          {t.label}
        </div>
      ))}
    </>
  );
}
