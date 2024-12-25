import { IMarketplace } from "./marketplace";
import { ChainType } from "./chain";

export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  chain: ChainType;
  [key: string]: any;
}

export interface IPoint {
  symbol: string;
  logoURI: string;
  marketplace: IMarketplace;
}
