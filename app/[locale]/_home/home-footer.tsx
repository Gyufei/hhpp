import Image from "next/image";
import SocialIcon from "./social-icon";

export default function HomeFooter() {
  return (
    <div className="h-[162px] lg:h-[200px] bg-bg-black">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        <div className="mt-10 flex items-center justify-end space-x-[30px] px-[120px]">
          <SocialIcon />
        </div>
        <div className="mt-[42px] flex items-center justify-between px-[120px] text-sm leading-5 text-title-white">
          <div className="flex items-center space-x-[80px]">
            <div>2024</div>
            <div>HypeTrade Labs.</div>
          </div>
          <Image src="/icons/simple-logo.svg" width={39} height={32} alt="logo" />
          <div className="flex items-center space-x-[80px]">
            <div className="cursor-pointer hover:text-main">Terms of Service</div>
            <div className="cursor-pointer hover:text-main">Privacy Policy</div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden px-4 py-6 h-full flex flex-col">
        {/* Top section: logo left, social icons right */}
        <div className="flex items-center justify-between">
          <Image src="/icons/simple-logo.svg" width={32} height={26} alt="logo" />
          <div className="flex items-center justify-between"><SocialIcon /></div>
        </div>
        
        {/* Bottom content */}
        <div className="mt-[20px] flex items-end justify-between text-[12px] leading-[18px] text-[#F6FEFD] font-[400]">
          <div className="flex flex-col space-y-2">
            <div>2024</div>
            <div>HypeTrade Labs.</div>
          </div>
          <div className="flex flex-col space-y-2 text-right">
            <div className="cursor-pointer hover:text-main">Terms of Service</div>
            <div className="cursor-pointer hover:text-main">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}