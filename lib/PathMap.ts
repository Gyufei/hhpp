export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "1";
export const isProduction = process.env.NODE_ENV === "production" && !isPreview;

export function WithApiHost(path: string) {
  const prodHost = `https://preview-api-option.hypetrade.xyz`;
  const devHost = `https://preview-api-option.hypetrade.xyz`;
  const host = isProduction ? prodHost : devHost;
  return `${host}${path}`;
}

export function WithWss(path: string) {
  const prodWss = "wss://wss.hypetrade.xyz" + path;
  const devWss = "wss://preview-wss.hypes.trade" + path;
  const wss = isProduction ? prodWss : devWss;
  return wss;
}

export const ApiPaths = {
  userCreate: "/user/create",
  userName: "/user/user_name",
  userStats: "/user/stats",
  userBalance: "/user/token_balances",
  userWithdraw: "/user/withdraw",
  userDeposit: "/user/deposit",
  userXP: "/user/xp",
  userNonce: "/user/nonce",

  tokenAllowance: "/token/allowance",
  tokenPrice: "/token/info",

  marketsDisplay: "/markets",
  markets: "/markets/stats",

  marketKline: "/market/kline",
  marketTrades: "/market/maker_trades_history",
  salesVolumeHistory: "/market/sales_volume_history",

  createOffer: "/market/create_offer",
  offers: "/offers",
  offer: "/offer",
  offerTake: "/offer/take",
  offerPremiumPrice: "/offer/current_premium_price",
  offerDistribution: "/offer/distribution",
  offerCancel: "/offer/cancel",
  offerRelist: "/offer/relist",
  offerDelist: "/offer/delist",
  offerMakerSettle: "/offer/liquidate_by_creator",
  offerTakerSettle: "/offer/liquidate_by_taker",

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
