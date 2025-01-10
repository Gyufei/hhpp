"use client";
import ConnectBtn from "./connect-btn";
import NavigationBtns from "./navigation-btns";
import { usePathname } from "@/i18n/routing";
import Logo from "./logo";
import Setting from "./setting";
import LanguageSetting from "./language-setting";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <></>;
  }

  return (
    <div className="flex h-14 items-center justify-between px-[10px] py-2">
      <div className="flex flex-row-reverse items-center justify-start space-x-[30px] sm:flex-row">
        <Logo />
        <NavigationBtns />
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4 sm:space-x-5">
        <ConnectBtn />
        <div className="flex items-center gap-[10px]">
          <Setting />
          <LanguageSetting />
        </div>
      </div>
    </div>
  );
}
