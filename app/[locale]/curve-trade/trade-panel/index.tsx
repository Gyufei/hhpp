import InfoDisplay from "./info-display";
import SellBuy from "./sell-buy";

export default function TradePanel() {
  return (
    <div className="ml-[2px] flex w-[320px] flex-col rounded">
      <InfoDisplay />
      <SellBuy />
    </div>
  );
}
