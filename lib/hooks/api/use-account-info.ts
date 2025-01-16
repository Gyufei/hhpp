import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { dataApiFetcher } from "@/lib/fetcher";

interface IAccountInfo {
  wallet: "0x48639f1e148b3734dd60d51b9e1c36c8d6ce72a6";
  dest_wallet: "0x311555599c574992c48a1cb9560f01ab2dde607f";
}

export function useAccountInfo(wallet: string) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IAccountInfo>(
    wallet
      ? `${apiEndPoint}${ApiPaths.accountInfo}?wallet=${wallet}`
      : null,
    dataApiFetcher,
  );

  return res;
}
