"use client";

import { isProduction } from "@/lib/PathMap";
// import { toast } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: !!isProduction,
        shouldRetryOnError: false,
        onError: (error) => {
          // toast.error(error.info || error.message || "Some Error Occurred");
          return Promise.reject(error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
