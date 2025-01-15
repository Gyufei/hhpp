"use client";

import NP from "number-precision";
import { Toaster } from "react-hot-toast";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  NP.enableBoundaryChecking(false);

  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#111A1E",
            color: "#F6FEFD",
          },
        }}
      />
    </>
  );
}
