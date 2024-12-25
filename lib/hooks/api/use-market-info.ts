import useSWRImmutable from "swr/immutable";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";
import { ChainType } from "@/lib/types/chain";

interface ProjectLinks {
  twitter: string;
  discord: string;
  register_url?: string;
}

export function useMarketInfo(chain: ChainType) {
  const { cdnEndPoint } = useEndPoint();

  const res = useSWRImmutable<Record<string, ProjectLinks>>(
    chain ? `${cdnEndPoint}/${chain}/project_info.json` : null,
    apiFetcher,
  );

  return res;
}
