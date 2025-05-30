import useSWRMutation from "swr/mutation";
import { apiFetcher } from "@/lib/fetcher";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";

export function useUserNameChange() {
  const { apiEndPoint } = useEndPoint();

  const postApi = async (
    _: string,
    {
      arg,
    }: {
      arg: {
        wallet: string;
        user_name: string;
      };
    },
  ) => {
    if (!arg.wallet || !arg.user_name) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update username", postApi);

  return res;
}
