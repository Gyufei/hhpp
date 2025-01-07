export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "1";
export const isProduction = process.env.NODE_ENV === "production" && !isPreview;
// export const isProduction = true;

export function WithApiHost(path: string) {
  const prodHost = `https://api.hypes.trade`;
  const devHost = `https://preview-hypes-api.aggregation.top`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export function WithDataApiHost(path: string) {
  return WithApiHost(path);
}

export function WithCDN(path: string) {
  const prodCDN = `https://cdn.hypes.trade`;
  const devCDN = `https://preview-hypes-cdn.aggregation.top`;
  const cdn = isProduction ? prodCDN : devCDN;
  return `${cdn}${path}`;
}

export function WithProjectImgCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/images/project/${goPath}`);
}

export function WithPointImgCDN(path: string) {
  const goPath = path.endsWith(".png") ? path : `${path}.png`;
  return WithCDN(`/images/point/${goPath}`);
}

export function WithWss(path: string) {
  const prodWss = "wss://wss.hypes.trade" + path;
  const devWss = "wss://preview-wss.hypes.trade" + path;
  const wss = isProduction ? prodWss : devWss;
  return wss;
}

export const DataApiPaths = {
  markets: "/markets",
  offers: "/offers",
  entry: "/entry",
  offer: "/offer",
  orders: "/orders",
  holding: "/holdings",
  userXP: "/account/xp",
  usdcBalance: "/account/usdc_balance",
  accountInfo: "/account/info",
  userWithdraw: "/account/bridge",
  userTokenBalance: "/account/token_balances",
  userItemBalance: "/account/item_balances",
  accountStats: "/account/stats",
  accountWithdraw: "/account/withdraw",
  transactionSubmit: "/transaction/submit",
  marketPointAmount: "/point",
};

export const ApiPaths = {
  makerOrders: "/user/maker_orders",
  taxIncome: "/user/tax_income",
  tradingVol: "/user/trade_vol",
  userName: "/user/user_name",
  tokenPrice: "/token/info",
  marketTrades: "/market_place/maker_trades_history",
  salesVolumeHistory: "/market_place/sales_volume_history",

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
