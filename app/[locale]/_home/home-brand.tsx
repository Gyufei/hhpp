import Image from "next/image";

export default function HomeBrand() {
  return (
    <div className="flex h-[440px] items-end justify-center bg-[#A7E8DF]">
      <div className="relative flex w-fit flex-col items-center justify-end">
        <Image src="/icons/brand.svg" width={862} height={190} alt="brand" />
        <Image
          src="/icons/simple-logo-black.svg"
          width={74}
          height={60}
          alt="brand"
          className="absolute right-0 top-0 -translate-y-full translate-x-full"
        />
      </div>
    </div>
  );
}
