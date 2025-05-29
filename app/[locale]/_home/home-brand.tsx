"use client";

import Image from "next/image";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function HomeBrand() {
  const { isMobileSize } = useDeviceSize();

  return (
    <div className="flex h-[200px] lg:h-[440px] items-end justify-center bg-[#A7E8DF]">
      <div className="relative flex w-fit flex-col items-center justify-end">
        <Image src="/icons/brand.svg" width={isMobileSize ? 276 : 862} height={isMobileSize ? 122 : 68} alt="brand" />
        <Image
          src="/icons/simple-logo-black.svg"
          width={isMobileSize ? 26 : 74}
          height={isMobileSize ? 21 : 60}
          alt="brand"
          className="absolute right-[2px] top-4 -translate-y-full translate-x-full"
        />
      </div>
    </div>
  );
}
