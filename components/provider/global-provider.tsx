"use client";

import NP from "number-precision";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  NP.enableBoundaryChecking(false);

  return <>{children}</>;
}
