import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { ApiPaths } from "@/lib/PathMap";
import { IEntry } from "@/lib/types/entry";

export function useEntryById(entryId?: number) {
  const { apiEndPoint } = useEndPoint();

  const res = useSWR<IEntry>(
    entryId ? `${apiEndPoint}${ApiPaths.entry}/${entryId}` : null,
  );

  return res;
}
