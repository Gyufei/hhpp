import { IMarketplace } from "./marketplace";

export type IOfferType = "buy" | "sell";
export type ISettleMode = "protected" | "turbo";

export interface IOffer {
  id: number;
  order_id: string;
  market_place_id: string;
  shares: string;
  creator: string;
  taker: string;
  order_note: string;
  order_status: string;
  update_at: string;
  create_at: string;

  marketplace: IMarketplace;
}

export interface IOfferEntry {
  id: number;
  is_root: boolean;
  market_symbol: string;
  direction: IOfferType;
  create_at: number;
}
