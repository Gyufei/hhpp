import useSWR from "swr";
import { useEndPoint } from "./use-endpoint";
import { DataApiPaths } from "@/lib/PathMap";
import { IEntry } from "@/lib/types/entry";

export function useEntryById(entryId?: number) {
  const { dataApiEndPoint } = useEndPoint();

  const res = useSWR<IEntry>(
    entryId ? `${dataApiEndPoint}${DataApiPaths.entry}/${entryId}` : null,
  );

  return res;
}
