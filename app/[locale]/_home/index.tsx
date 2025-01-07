import { cn } from "@/lib/utils/common";
import { TgLink, TwitterLink } from "@/lib/utils/social";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "./home-header";
import HomeBanner from "./home-banner";
import TradeMore from "./trade-more";

export default function Home() {
  return (
    <div className="mx-0">
      <HomeHeader />
      <HomeBanner />
      <TradeMore />
      <BlockChain />
      <Brand />
      <Footer />
    </div>
  );
}

function StartTradingButton({ className }: { className?: string }) {
  return (
    <Link href="/marketplace">
      <div
        className={cn(
          "flex h-10 cursor-pointer items-center rounded-3xl bg-yellow px-6 text-base font-light text-black",
          className,
        )}
      >
        Start Trading
      </div>
    </Link>
  );
}

function BlockChain() {
  return (
    <div className="flex h-[916px] items-center justify-center bg-bg-black">
      <div className=" relative flex h-[748px] w-[748px] items-center justify-center rounded-full border-[2px] border-[#303030]">
        <div className="relative flex h-[480px] w-[480px] flex-col items-center justify-center rounded-full border-[2px] border-[#303030]">
          <div className="text-[120px] font-bold leading-[120px] text-[#F6FEFD]">
            69+
          </div>
          <div className="text-base font-semibold leading-6 text-[#F6FEFD]">
            Blockchain
          </div>
          <div className="mt-5 flex h-10 cursor-pointer items-center justify-center rounded-full bg-yellow px-[34px] text-bg-black">
            Axelarscan
          </div>
          <div className="absolute left-0 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow"></div>
        </div>

        <div className="absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center">
          <div className="text-[80px] font-bold leading-[120px] text-[#F6FEFD]">
            $10B+
          </div>
          <div className="text-base leading-6 text-[#F6FEFD]">Transferred</div>
        </div>

        <div className="absolute right-0 top-[10px] flex translate-x-1/2 flex-col items-center">
          <div className="text-[80px] font-bold leading-[120px] text-[#F6FEFD]">
            2.5M+
          </div>
          <div className="text-base leading-6 text-[#F6FEFD]">Transactions</div>
        </div>

        <div className="absolute bottom-0 left-0 flex -translate-x-full flex-col items-center">
          <div className="text-[80px] font-bold leading-[120px] text-[#F6FEFD]">
            1.3M+
          </div>
          <div className="text-base leading-6 text-[#F6FEFD]">
            SDK Downloads
          </div>
        </div>

        <div className="absolute -right-[110px] bottom-0 flex translate-x-full flex-col items-center">
          <div className="text-[80px] font-bold leading-[120px] text-[#F6FEFD]">
            75
          </div>
          <div className="text-base leading-6 text-[#F6FEFD]">
            POS Validators
          </div>
        </div>
      </div>
    </div>
  );
}

function Brand() {
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

function Footer() {
  return (
    <div className="h-[200px] bg-bg-black">
      <div className="mt-10 flex items-center justify-end space-x-[30px] px-[120px]">
        <SocialIcon />
      </div>
      <div className="mt-[42px] flex items-center justify-between px-[120px] text-sm leading-5 text-[#F6FEFD]">
        <div className="flex items-center space-x-[80px]">
          <div>2024</div>
          <div>Genesis Event Terms & Conditions</div>
        </div>
        <Image src="/icons/simple-logo.svg" width={39} height={32} alt="logo" />
        <div className="flex items-center space-x-[80px]">
          <div className="cursor-pointer hover:text-yellow">
            Terms of Service
          </div>
          <div className="cursor-pointer hover:text-yellow">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon() {
  return (
    <>
      <Link href={TwitterLink}>
        <Image
          src="/icons/twitter-white.svg"
          width={36}
          height={36}
          alt="twitter"
          className="cursor-pointer"
        />
      </Link>
      <Link href={TgLink}>
        <Image
          src="/icons/tg-white.svg"
          width={36}
          height={36}
          alt="telegram"
          className="cursor-pointer"
        />
      </Link>
    </>
  );
}
