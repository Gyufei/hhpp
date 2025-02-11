import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";

export function useUserData(address: string | undefined) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR(
    address ? `${apiEndPoint}${ApiPaths.userData}?dest_wallet=${address}` : "",
    apiFetcher,
  );

  return res;
}
