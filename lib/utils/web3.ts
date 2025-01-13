import { ChainType } from "@/lib/types/chain";
import { isProduction } from "../PathMap";

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
  return [ChainType.HYPER].includes(chain);
}

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

  if (chain === ChainType.HYPER) {
    if (isProduction) {
      window.open(
        `https://app.hyperliquid.xyz/explorer/${goType}/${addr}`,
        "_blank",
      );
    } else {
      window.open(
        `https://app.hyperliquid-testnet.xyz/explorer/${goType}/${addr}`,
        "_blank",
      );
    }
  }
}
