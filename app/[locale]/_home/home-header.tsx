import StartTradingButton from "./start-trading-button";
import SocialIcon from "./social-icon";
import NavigationBtns from "../_page-layout/_header/navigation-btns";
import Logo from "../_page-layout/_header/logo";

export default function HomeHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-14 w-full items-center justify-between bg-bg-black px-5 sm:px-[120px]">
      <div className="flex flex-row-reverse items-center justify-start sm:flex-row sm:space-x-[100px]">
        <Logo />
        <NavigationBtns />
      </div>
      <div className="flex items-center space-x-[30px]">
        <div className="hidden items-center space-x-[20px] sm:flex">
          <SocialIcon />
        </div>
        <StartTradingButton className="h-9 px-[30px] text-xs" />
      </div>
    </div>
  );
}
