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
        dest_account: string;
        user_name: string;
        signature: string;
      };
    },
  ) => {
    if (!arg.dest_account || !arg.user_name || !arg.signature) return null;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userName}`, {
      method: "POST",
      body: JSON.stringify({
        ...arg,
      }),
    });

    return res;
  };

  const res = useSWRMutation("update username", postApi);

  return res;
}
