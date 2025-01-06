import Image from "next/image";

export interface IMobilePanel {
  name: string;
  icon: string;
  label: string;
}

export default function MobilePageFooter({
  panels,
  activePanel,
  setActivePanel,
}: {
  panels: Array<IMobilePanel>;
  activePanel: string;
  setActivePanel: (panel: string) => void;
}) {
  return (
    <div
      className="flex h-14 w-full justify-between bg-bg-black py-2 sm:hidden"
      style={{
        boxShadow: "0px -10px 20px 0px rgba(14, 4, 62, 0.02)",
      }}
    >
      {panels.map((item) => (
        <div
          key={item.name}
          onClick={() => setActivePanel(item.name)}
          className="flex flex-1 flex-col items-center justify-center gap-y-[2px]"
        >
          <Image
            src={item.icon}
            width={20}
            height={20}
            alt={item.name}
            data-active={activePanel === item.name}
            className="data-[active=false]:opacity-40"
          />
          <div
            data-active={activePanel === item.name}
            className="w-fit text-xs leading-[18px] text-[#2D2E33] data-[active=false]:opacity-40"
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
