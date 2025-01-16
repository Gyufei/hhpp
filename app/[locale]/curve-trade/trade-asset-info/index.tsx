import MarketSelect from "@/components/share/market-select";
import AssetTag from "./asset-tag";
import InfoOptions from "./info-options";
import MarketInfo from "./market-info";

export function TradeAssetInfo() {
  return (
    <div className="flex h-[80px] items-center justify-start rounded bg-bg-black px-[10px]">
      <MarketInfo />
      <MarketSelect />
      <AssetTag />
      <InfoOptions />
    </div>
  );
}
