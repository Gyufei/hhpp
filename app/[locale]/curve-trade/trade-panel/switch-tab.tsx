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
        "relative flex h-8 flex-1 cursor-pointer select-none items-center justify-center rounded text-xs leading-[18px] transition-all data-[check=false]:bg-transparent data-[check=true]:bg-main data-[check=false]:text-gray data-[check=true]:text-title-white",
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
    <div className="flex h-10 items-center justify-between rounded border border-border-black bg-[#222428] p-1">
      <TabItem
        isChecked={activeTab === tabs[0]}
        onClick={() => setActiveTab(tabs[0])}
        className="data-[check=true]:bg-main"
      >
        {tabs[0]}
      </TabItem>

      <TabItem
        isChecked={activeTab === tabs[1]}
        onClick={() => setActiveTab(tabs[1])}
        className="data-[check=true]:bg-red"
      >
        {tabs[1]}
      </TabItem>
    </div>
  );
}
