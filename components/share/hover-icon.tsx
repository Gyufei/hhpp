"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/common";

export default function HoverIcon({
  src,
  hoverSrc,
  width,
  height,
  alt,
  className,
  active,
  ...rest
}: {
  src: string;
  hoverSrc: string;
  width: number;
  height: number;
  alt: string;
  active?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Image
      className={cn("cursor-pointer", className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      src={isHover || active ? hoverSrc : src}
      width={width}
      height={height}
      alt={alt}
      {...rest}
    />
  );
}
