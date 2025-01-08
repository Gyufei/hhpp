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
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <HoverIcon
          src="/icons/en-gray.svg"
          hoverSrc="/icons/en.svg"
          width={24}
          height={24}
          alt="en"
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[124px] flex-col items-stretch border border-border-black bg-bg-black p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {(langs || []).map((t) => (
          <div
            key={t.value}
            onClick={() => handleSelectLang(t.value)}
            data-active={locale === t.value}
            className="flex h-9 cursor-pointer items-center rounded-xl px-1 text-xs leading-[18px] text-txt-white data-[active=true]:text-main"
          >
            <Image
              width={16}
              height={16}
              src={t?.logo || ""}
              alt="select lang"
              className="mr-2 rounded-full"
            ></Image>
            {t.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
