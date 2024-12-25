import { IMarketplace } from "../types/marketplace";

export function checkIsNeedCollateral(
  cate: IMarketplace["market_catagory"] | undefined,
) {
  if (!cate) return false;

  return ![
    "offchain_fungible_point",
    "point_token",
    "whitelist",
    "token",
  ].includes(cate);
}
