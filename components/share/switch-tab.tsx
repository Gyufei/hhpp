import { cn } from "@/lib/utils/common";
import { ReactNode } from "react";

function TabItem({
  isChecked,
  onClick,
  children,
  className,
}: {
  isChecked: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-check={isChecked ? "true" : "false"}
      onClick={onClick}
      className={cn(
        "c-font-title-55 data-[check=true]:c-font-title-65 relative z-0 cursor-pointer select-none rounded-t-xl border-2 border-b-0 border-black py-[5px] px-[36px] text-sm leading-[18px] transition-all data-[check=true]:z-10 data-[check=true]:bg-yellow data-[check=true]:leading-[22px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function SwitchTab({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Array<string>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex h-9 items-end">
      <TabItem
        isChecked={activeTab === tabs[0]}
        onClick={() => setActiveTab(tabs[0])}
      >
        {tabs[0]}
      </TabItem>

      <TabItem
        isChecked={activeTab === tabs[1]}
        onClick={() => setActiveTab(tabs[1])}
        className="right-[10px]"
      >
        {tabs[1]}
      </TabItem>
    </div>
  );
}
