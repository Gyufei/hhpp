import Image from "next/image";
import SocialIcon from "./social-icon";

export default function HomeFooter() {
  return (
    <div className="h-[200px] bg-bg-black">
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
  );
}
