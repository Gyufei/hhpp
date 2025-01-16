import { useMemo } from "react";
import { WithCDN, WithApiHost, WithWss } from "@/lib/PathMap";

export function useEndPoint() {
  const apiEndPoint = useMemo(() => WithApiHost(""), []);

  const cdnEndPoint = useMemo(() => WithCDN(""), []);

  const wssEndPoint = useMemo(() => WithWss(""), []);

  return {
    apiEndPoint,
    cdnEndPoint,
    wssEndPoint,
  };
}
