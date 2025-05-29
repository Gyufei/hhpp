import { IMarketplace } from "./marketplace";

export interface IToken {
  id: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  price: string;
  [key: string]: any;
}

export type IPoint = IToken & {
  marketplace: IMarketplace;
};
