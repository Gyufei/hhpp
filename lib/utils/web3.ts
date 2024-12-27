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
  return [ChainType.ARB].includes(chain);
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

  if (chain === ChainType.ARB) {
    window.open(`https://etherscan.io/${goType}/${addr}`, "_blank");
  }
}
