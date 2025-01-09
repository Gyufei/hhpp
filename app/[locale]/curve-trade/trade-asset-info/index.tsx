import AssetSelect from "./asset-select";
import AssetTag from "./asset-tag";
import InfoOptions from "./info-options";

export function TradeAssetInfo() {
  return (
    <div className="flex h-[80px] items-center justify-start rounded bg-bg-black px-[10px]">
      <AssetSelect />
      <AssetTag />
      <InfoOptions />
    </div>
  );
}
