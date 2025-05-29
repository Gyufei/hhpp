import { apiFetcher } from "@/lib/fetcher";
import { ApiPaths, WithApiHost } from "@/lib/PathMap";

export async function getUserNonce(account: string) {
  const res = await apiFetcher(`${WithApiHost(ApiPaths.userNonce)}/${account}`);
  return res?.nonce || 0;
}
