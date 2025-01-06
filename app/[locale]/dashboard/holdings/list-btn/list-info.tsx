import { useTranslations } from "next-intl";

export default function ListInfo({
  id,
  inherit,
  origin,
}: {
  id: string;
  inherit: string;
  origin: string;
}) {
  const T = useTranslations("drawer-ListOrder");
  return (
    <div className="mb-4 flex flex-wrap justify-between space-x-3 space-y-4 sm:space-y-0">
      <div className="break-all rounded-2xl bg-bg-black p-4 sm:flex-1 sm:break-normal">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-StockId")}
        </div>
        <div className="leading-6 text-txt-white">#{id}</div>
      </div>
      <div className="flex-1 rounded-2xl bg-bg-black p-4">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-Prev")} Maker/Taker
        </div>
        <div className="max-w-[120px] truncate leading-6 text-txt-white">
          #{inherit}
        </div>
      </div>
      <div className="flex-1 rounded-2xl bg-bg-black p-4">
        <div className="text-xs leading-[18px] text-gray">
          {T("cap-OriginatedFrom")}
        </div>
        <div className="max-w-[120px] truncate leading-6 text-txt-white">
          #{origin}
        </div>
      </div>
    </div>
  );
}
