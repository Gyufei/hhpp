import { cn } from "@/lib/utils/common";
import { TgLink, TwitterLink } from "@/lib/utils/social";
import Image from "next/image";
import Link from "next/link";

const menuItemsClx =
  "flex h-10 items-center rounded-3xl px-[10px] cursor-pointer";

export default function Home() {
  return (
    <div className="mx-0">
      <Header />
      <Banner />
      <TradeMore />
      <BlockChain />
      <Brand />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-14 w-full items-center justify-between bg-bg-black px-[120px]">
      <div className="flex items-center justify-start space-x-[100px]">
        <Image src="/icons/logo.svg" width={100} height={20} alt="logo" />
        <div className="flex items-center space-x-[30px] text-[#F6FEFD]">
          <div className={menuItemsClx}>Curve Trade</div>
          <div className="flex h-10 items-center rounded-3xl px-[10px]">
            Direct Trade
          </div>
          <div className={menuItemsClx}>Portfolio</div>
          <div className={menuItemsClx}>Referrals</div>
          <div className={cn(menuItemsClx, "space-x-[10px]")}>
            <span>More</span>
            <Image
              src="/icons/arrow-down.svg"
              width={10}
              height={10}
              alt="arrow-down"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-[30px]">
        <div className="flex items-center space-x-[20px]">
          <SocialIcon />
        </div>
        <StartTradingButton className="h-9 px-[30px] text-xs" />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div
      className="mt-14 flex flex-col items-center pb-[118px] pt-[132px]"
      style={{
        backgroundImage: "url('/img/home/banner-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image src="/icons/simple-logo.svg" width={120} height={90} alt="logo" />
      <div className="mt-5 text-center text-[80px] font-light leading-[120px] text-white">
        First stop for high quality <br /> Hyperliquid assets.
      </div>
      <div className="mt-[30px] w-[420px] text-center text-sm font-light text-[#F6FEFD]">
        Crypto is fragmented today, but it doesn&apos;t need to be.For the first
        time, build projects, create value, andexchange assets on the same
        hyper-performant chain.
      </div>
      <div className="mt-10 flex items-center justify-between space-x-[30px]">
        <StartTradingButton />
        <div className="flex h-10 cursor-pointer items-center rounded-3xl border border-yellow px-6 text-base font-light text-yellow">
          Start Building
        </div>
      </div>
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

function TradeMore() {
  return (
    <div
      className="flex h-[916px] items-center justify-center bg-[#E6FCF9]"
      style={{
        backgroundImage: "url('/img/home/trade-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-6">
          <span className="text-[70px] font-thin text-[#072722]">
            Trade more on
          </span>
          <Image
            src="/icons/trade.svg"
            width={280}
            height={62}
            alt="trade"
            className="translate-y-[8px]"
          />
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-[70px] font-thin text-[#072722]">
            Make more on
          </span>
          <Image
            src="/icons/liquid.svg"
            width={318}
            height={64}
            alt="liquidity"
            className="translate-y-[8px]"
          />
        </div>
      </div>
    </div>
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
          <div className="mt-5 flex h-10 items-center justify-center rounded-full bg-yellow px-[34px] text-bg-black">
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
