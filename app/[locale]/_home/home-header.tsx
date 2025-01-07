import Image from "next/image";

const menuItemsClx =
  "flex h-10 items-center rounded-3xl px-[10px] cursor-pointer";

export default function HomeHeader() {
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
