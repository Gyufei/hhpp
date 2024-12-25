import Image from "next/image";
import { cn } from "@/lib/utils/common";
import { useState } from "react";

export default function AdBanner({ className }: { className?: string }) {
  const images = [
    "/img/ad-placeholder-3.png",
    "/img/ad-placeholder-3.png",
    "/img/ad-placeholder-3.png",
  ];

  const [mainSrc, setMainSrc] = useState(images[0]);

  function handleClick(src: string) {
    setMainSrc(src);
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={mainSrc}
        width={280}
        height={160}
        alt="ad1"
        className="w-full rounded-2xl sm:h-auto sm:w-[300px]"
      />
      <div className="absolute bottom-0 right-3 top-0 my-3 flex flex-col items-center justify-center gap-2 sm:justify-between">
        {images.map((src, index) => (
          <Image
            onClick={() => handleClick(src)}
            key={index}
            src={src}
            width={64}
            height={40}
            alt="ad1"
            className="h-8 w-14 cursor-pointer rounded-lg border border-white sm:h-10 sm:w-16"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
