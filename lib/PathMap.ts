export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "1";
export const isProduction = process.env.NODE_ENV === "production" && !isPreview;

export function WithApiHost(path: string) {
  const prodHost = `https://api.hypetrade.xyz`;
  const devHost = `https://preview-api-option.hypetrade.xyz`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export function WithCDN(path: string) {
  const prodCDN = `https://cdn.hypetrade.xyz`;
  const devCDN = `https://preview-hypes-cdn.aggregation.top`;
  const cdn = isProduction ? prodCDN : devCDN;
  return `${cdn}${path}`;
}

export function WithWss(path: string) {
  const prodWss = "wss://wss.hypetrade.xyz" + path;
  const devWss = "wss://preview-wss.hypes.trade" + path;
  const wss = isProduction ? prodWss : devWss;
  return wss;
}

export const ApiPaths = {
  accountCreate: "/user/create",
  userName: "/user/user_name",
  accountStats: "/user/stats",
  accountBalance: "/user/token_balances",
  userWithdraw: "/user/withdraw",
  userDeposit: "/user/deposit",
  userXP: "/user/xp",

  tokenAllowance: "/token/allowance",

  tokenPrice: "/token/info",
  accountInfo: "/account/info",
  usdcBalance: "/account/usdc_balance",

  markets: "/markets",
  offers: "/offers",
  entry: "/entry",
  offer: "/offer",
  orders: "/orders",
  holding: "/holdings",
  accountWithdraw: "/account/withdraw",
  marketPointAmount: "/point",
  marketKline: "/market/kline",

  makerOrders: "/user/maker_orders",
  userData: "/user/user_data",
  marketTrades: "/market_place/maker_trades_history",
  salesVolumeHistory: "/market_place/sales_volume_history",
  userTokenBalance: "/account/token_balances",
  holderDistribution: "/holdings/distribution",

  referral: {
    referer: "/referral/referer",
    create: "/referral/create",
    updateCommission: "/referral/update_commission",
    updateNote: "/referral/update_notes",
    default: "/referral/default",
    data: "/referral/referral_system_data",
    views: "/referral/views",
    bind: "/referral/bind",
    delete: "/referral/delete",
    codeData: "/referral/referal_rate",
    extraRate: "/referral/referal_extra_rate",
  },
};
