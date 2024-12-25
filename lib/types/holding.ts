import { IMarketplace } from "./marketplace";
import { IOffer } from "./offer";

export interface IHolding {
  holding_id: string;
  entries: IHoldingEntry[];
  market_symbol: string;
  status: string;
  create_at: number;

  marketplace: IMarketplace;
  offer?: IOffer;
}

interface IHoldingEntry {
  id: number;
  item_amount: number;
}
