import { IToken } from "./token";

export interface IMarketplace {
  id: number;
  market_place_id: string;
  token_name: string;
  token_address: string;

  expiry_date: string;
  strike_price: string;
  market_place_status: string;
  trading_start_at: string;
  initial_premium_price: string;
  maximum_premium_price: string;
  premium_price: string;
  filled_orders: string;
  listed_supply: string;
  active_wallets: string;
  vol_24h: string;
  total_vol: string;

  token: IToken;

  projectLogo: string;
  pointLogo: string;
}
