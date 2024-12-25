import { isProduction } from "../PathMap";
import { IToken } from "@/lib/types/token";
import { ChainType } from "@/lib/types/chain";

export function truncateAddr(
  address: string,
  params = {
    nPrefix: 3,
    nSuffix: 3,
  },
): string {
  if (!address) return address;
  const { nPrefix, nSuffix } = params;

  const shorter = `${address.slice(0, nPrefix)}...${address.slice(
    -1 * nSuffix,
  )}`;

  return shorter;
}

export function isEvmChain(chain: ChainType) {
  return [ChainType.ARB, ChainType.BNB].includes(chain);
}

export const checkIsNativeToken = (chain: ChainType, token: IToken | null) => {
  if (!token) return false;

  if (chain === ChainType.ARB) {
    return token.symbol === "ETH";
  }

  if (chain === ChainType.BNB) {
    return token.symbol === "BNB";
  }

  if (chain === ChainType.SOLANA) {
    return token.symbol === "SOL";
  }

  return false;
};

export function handleGoScan(
  chain: ChainType,
  addr: string,
  type: "account" | "tx" = "account",
) {
  if (!addr) return;

  let goType: any = type;
  if (type === "account") {
    goType = "address";
  }

  if (chain === ChainType.ARB) {
    window.open(`https://etherscan.io/${goType}/${addr}`, "_blank");
  }

  if (chain === ChainType.BNB) {
    window.open(`https://bscscan.com/${goType}/${addr}`, "_blank");
  }

  if (chain === ChainType.SOLANA) {
    window.open(
      `https://solscan.io/${type}/${addr}${
        isProduction ? "" : "?cluster=devnet"
      }`,
      "_blank",
    );
  }
}
