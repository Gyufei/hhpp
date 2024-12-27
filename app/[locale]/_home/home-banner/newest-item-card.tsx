"use client";

import Image from "next/image";
import { useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { formatNum } from "@/lib/utils/number";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";

export default function NewestItemCard() {
  const t = useTranslations("Home");
  const [prevMsg, setPrevMsg] = useState<any>(null);
  const [nowMsg, setNowMsg] = useState<any>(null);
  const { data } = useWsMsgSub(ChainType.ARB);

  useEffect(() => {
    if (!data) return;

    const msgAll = data.filter((msg) => !!msg);
    const len = msgAll.length;

    if (data.length === 1) {
      setPrevMsg(data[0]);
    }

    if (data.length > 1) {
      setPrevMsg(nowMsg);
      setNowMsg(data[len - 1]);

      setTimeout(() => {
        setNowMsg((val: any) => {
          setPrevMsg(val);
          return null;
        });
      }, 1000);
    }
  }, [data]);

  if (!prevMsg && !nowMsg) {
    return null;
  }

  return (
    <div className="relative mt-20">
      <div className="mx-8 flex justify-between space-x-[250px] text-xl leading-[30px] text-gray">
        <div>{t("th-ItemId")}</div>
        <div>{t("th-Asset")}</div>
        <div>{t("th-Value")}</div>
      </div>
      {!nowMsg && (
        <div
          className="mt-4 flex h-[88px] items-center justify-between space-x-[250px] rounded-[20px] bg-white px-8"
          style={{
            boxShadow: "4px 8px 40px 0px rgba(45, 46, 51, 0.1)",
          }}
        >
          <div>{prevMsg.item_id}</div>
          <div className="flex items-center">
            <span>{formatNum(prevMsg.value)}</span>
            <Image
              className="ml-1"
              src="/icons/usdc.svg"
              width={12}
              height={12}
              alt="token"
            />
          </div>
          <div>{prevMsg.amount}</div>
        </div>
      )}
      {nowMsg && (
        <div
          className="now-msg absolute flex h-[88px] w-full items-center justify-between space-x-[250px] rounded-[20px] bg-white px-8"
          style={{
            boxShadow: "4px 8px 40px 0px rgba(45, 46, 51, 0.1)",
          }}
        >
          <div>{nowMsg.item_id}</div>
          <div className="flex items-center">
            <span>{formatNum(nowMsg.value)}</span>
            <Image
              className="ml-1"
              src="/icons/usdc.svg"
              width={12}
              height={12}
              alt="token"
            />
          </div>
          <div>{nowMsg.amount}</div>
        </div>
      )}
    </div>
  );
}
