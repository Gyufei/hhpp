import { useMemo } from "react";
import { WithApiHost, WithWss } from "@/lib/PathMap";

export function useEndPoint() {
  const apiEndPoint = useMemo(() => WithApiHost(""), []);

  const wssEndPoint = useMemo(() => WithWss(""), []);

  return {
    apiEndPoint,
    wssEndPoint,
  };
}
