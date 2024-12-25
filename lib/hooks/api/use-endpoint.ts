import { useMemo } from "react";
import { WithCDN, WithDataApiHost, WithApiHost, WithWss } from "@/lib/PathMap";

export function useEndPoint() {
  const dataApiEndPoint = useMemo(() => WithDataApiHost(""), []);

  const apiEndPoint = useMemo(() => WithApiHost(""), []);

  const cdnEndPoint = useMemo(() => WithCDN(""), []);

  const wssEndPoint = useMemo(() => WithWss(""), []);

  return {
    dataApiEndPoint,
    apiEndPoint,
    cdnEndPoint,
    wssEndPoint,
  };
}
