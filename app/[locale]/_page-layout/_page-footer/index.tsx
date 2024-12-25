"use client";

import { handleGoTwitter } from "@/lib/utils/social";
import HoverIcon from "@/components/share/hover-icon";
import FooterSetting from "./footer-setting";
import LanguageSetting from "./language-setting";
import { LiveMs } from "./live-ms";
import { cn } from "@/lib/utils/common";

export default function PageFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 pb-4 pt-5",
        className,
      )}
    >
      <LiveMs />
      <div className="flex items-center space-x-5">
        <HoverIcon
          onClick={handleGoTwitter}
          src="/icons/twitter-gray.svg"
          hoverSrc="/icons/twitter.svg"
          width={24}
          height={24}
          alt="x"
        />
        <FooterSetting />
        <LanguageSetting />
      </div>
    </div>
  );
}
