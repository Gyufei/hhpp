import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useAccountInfo } from "./use-account-info";

export function useUserXp() {
  const { apiEndPoint } = useEndPoint();
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const res = useSWR<any>(
    address ? `${apiEndPoint}${ApiPaths.userXP}/${address}` : null,
    apiFetcher,
  );

  return res;
}
