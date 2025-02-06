import { IMarketplace } from "./marketplace";

export interface IHolding {
  holding_id: string;
  entries: IHoldingEntry[];
  market_symbol: string;
  status: string;
  create_at: number;

  marketplace: IMarketplace;
}

interface IHoldingEntry {
  id: number;
  item_amount: number;
}

export interface IHolderDistribution {
  address: string;
  percentage: string[];
}
