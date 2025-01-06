import { IMarketplace } from "./marketplace";

export type IOfferType = "buy" | "sell";
export type ISettleMode = "protected" | "turbo";

export interface IOffer {
  offer_id: string;
  create_at: string;
  tx_hash: string;
  abort_offer_status:
    | "initialize_v1"
    | "initialize_v2"
    | "allocation_propagated"
    | "aborted";
  item_amount: number;
  payment_token: string;
  price: string;
  offer_maker: string;
  collateral_ratio: string;
  status:
    | "unknown"
    | "virgin"
    | "ongoing"
    | "canceled"
    | "filled"
    | "settling"
    | "settled";
  note: string;
  settled_item_token_amount: number;
  settled_item_amount: number;
  taken_item_amount: number;
  origin_settle_mode: ISettleMode;
  trade_tax_accum: string;
  trade_tax_pct: string;
  entry: IOfferEntry;

  marketplace: IMarketplace;
}

export interface IOfferEntry {
  id: number;
  is_root: boolean;
  market_symbol: string;
  direction: IOfferType;
  create_at: number;
}
