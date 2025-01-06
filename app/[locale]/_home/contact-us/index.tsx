"use client";

import Image from "next/image";
import {
  DocLink,
  handleGoDiscord,
  handleGoGithub,
  handleGoTg,
  handleGoTwitter,
} from "@/lib/utils/social";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SubscribeInput from "./subscribe-input";

export default function ContactUs() {
  const t = useTranslations("Home");
  return (
    <div className="bg-[#F9FAF2] px-4 pt-[60px] sm:px-[120px]">
      <div className="flex flex-col items-end justify-between sm:flex-row">
        <div className="flex w-full flex-col items-center sm:w-fit sm:items-start">
          <div className="text-center text-2xl leading-9 text-txt-white sm:text-4xl sm:text-[40px] sm:leading-[54px]">
            {t("cap-StayInTheLoopWithUs")}
          </div>
          <SubscribeInput />
        </div>
        <div className="mt-5 flex w-full items-center justify-start space-x-5 sm:mt-0 sm:w-fit">
          <HoverSocialIcon
            onClick={handleGoDiscord}
            src="/icons/discord-gray.svg"
            hoverSrc="/icons/discord.svg"
            width={32}
            height={32}
            alt="discord"
          />
          <HoverSocialIcon
            onClick={handleGoTwitter}
            src="/icons/twitter-gray.svg"
            hoverSrc="/icons/twitter.svg"
            width={32}
            height={32}
            alt="x"
          />
          <HoverSocialIcon
            onClick={handleGoGithub}
            src="/icons/github.svg"
            hoverSrc="/icons/github.svg"
            width={32}
            height={32}
            alt="discord"
          />
          <HoverSocialIcon
            onClick={handleGoTg}
            src="/icons/telegram.svg"
            hoverSrc="/icons/telegram.svg"
            width={32}
            height={32}
            alt="discord"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between px-0 py-[60px] sm:flex-row sm:items-center">
        <Image
          src="/icons/logo.svg"
          width={75}
          height={20}
          alt="logo"
          className="mb-8 sm:mb-0"
        />
        <div className="flex flex-wrap items-center justify-between gap-x-10 sm:flex-nowrap">
          {/* <LinkItem href={DiscordLink}>{t("lb-SubmitTicket")}</LinkItem>
          <LinkItem href="">{t("lb-ListingProposal")}</LinkItem> */}
          <LinkItem href="">{t("lb-ContactUs")}</LinkItem>
          <LinkItem href={DocLink}>{t("lb-Docs")}</LinkItem>
        </div>
      </div>

      <div
        className="flex h-10 items-center justify-between px-0 py-[24px]"
        style={{
          boxShadow: "inset 0px 1px 0px 0px #EEEEEE",
        }}
      >
        <div className="text-sm leading-5 text-lightgray">
          <span className="hidden sm:inline-block">
            Copyright @ Whity Ltd 2024. All Rights Reserved.
          </span>
          <span className="inline-block sm:hidden">
            Copyright @ Whity Ltd 2024. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-sm leading-5 text-lightgray hover:text-txt-white"
      href={href}
    >
      {children}
    </a>
  );
}

function HoverSocialIcon({
  src,
  hoverSrc,
  width,
  height,
  alt,
  onClick,
}: {
  src: string;
  hoverSrc: string;
  width: number;
  height: number;
  alt: string;
  onClick: () => void;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray sm:h-14 sm:w-14"
    >
      <Image
        src={isHover ? hoverSrc : src}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
}
