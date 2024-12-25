import { isAndroid, isChrome, isIOS, isMobile } from "../utils/isMobile";

function getExplicitInjectedProvider(flag: string) {
  const _window =
    typeof window !== "undefined" ? (window as Record<string, any>) : undefined;

  if (typeof _window === "undefined" || typeof _window.ethereum === "undefined")
    return;

  const providers = _window.ethereum.providers as any[];

  return providers
    ? providers.find((provider) => provider[flag])
    : _window.ethereum[flag]
    ? _window.ethereum
    : undefined;
}

function getWindowProviderNamespace(namespace: string) {
  const providerSearch = (provider: any, namespace: string): any => {
    const [property, ...path] = namespace.split(".");
    const _provider = provider[property];
    if (_provider) {
      if (path.length === 0) return _provider;
      return providerSearch(_provider, path.join("."));
    }
  };
  if (typeof window !== "undefined") return providerSearch(window, namespace);
}

export const metaMaskWallet = {
  name: "MetaMask",
  icon: "/icons/metaMaskWallet.svg",
  installed: () =>
    typeof getExplicitInjectedProvider("isMetaMask") !== "undefined",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=io.metamask",
    ios: "https://apps.apple.com/us/app/metamask/id1438144202",
    mobile: "https://metamask.io/download",
    qrCode: "https://metamask.io/download",
    chrome:
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
    firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
    opera: "https://addons.opera.com/extensions/details/metamask-10",
    browserExtension: "https://metamask.io/download",
  },
};

export const okxWallet = {
  name: "OKX Wallet",
  icon: "/icons/okxWallet.svg",
  installed: () =>
    typeof getWindowProviderNamespace("okxwallet") !== "undefined",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
    ios: "https://itunes.apple.com/app/id1327268470?mt=8",
    mobile: "https://okx.com/download",
    qrCode: "https://okx.com/download",
    chrome:
      "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
    edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
    firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
    browserExtension: "https://okx.com/download",
  },
};

export const trustWallet = {
  name: "Trust Wallet",
  icon: "/icons/trustWallet.svg",
  installed: () =>
    isMobile()
      ? getExplicitInjectedProvider("isTrust")
      : getExplicitInjectedProvider("isTrustWallet"),
  downloadUrls: {
    android:
      "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
    ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
    mobile: "https://trustwallet.com/download",
    qrCode: "https://trustwallet.com/download",
    chrome:
      "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
    browserExtension: "https://trustwallet.com/browser-extension",
  },
};

export const walletConnect = {
  id: "walletConnect",
  name: "WalletConnect",
  installed: () => true,
  icon: "/icons/walletConnectWallet.svg",
};

export function openWalletUrl(walletUrls: Record<string, string>) {
  if (!walletUrls) return;

  if (isAndroid()) {
    window.open(walletUrls.android, "_blank");
    return;
  }

  if (isIOS()) {
    window.open(walletUrls.ios, "_blank");
    return;
  }

  if (isMobile()) {
    window.open(walletUrls.mobile, "_blank");
    return;
  }

  if (isChrome()) {
    window.open(walletUrls.chrome, "_blank");
    return;
  }

  window.open(walletUrls.browserExtension);
}

export const EVM_WALLETS = [
  metaMaskWallet,
  trustWallet,
  okxWallet,
  walletConnect,
];
