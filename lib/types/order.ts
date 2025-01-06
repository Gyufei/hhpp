import { IOffer, IOfferType } from "@/lib/types/offer";

export interface IOrder {
  order_id: string;
  self_direction: IOfferType;
  role: string;
  maker: string;
  creator: string;
  create_at: number;
  item_amount: string;
  price: string;
  notional_value: string;
  tx_hash: string;
  entry: IOrderEntry;
  offer: IOffer;
}

export interface IOrderEntry {
  id: number;
  root_entry_id: number;
  is_root: boolean;
  market_symbol: string;
  direction: IOfferType;
  project_token_addr: string;
  create_at: number;
}
