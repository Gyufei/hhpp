"use client";

import React from "react";
import { Provider } from "jotai";
import { UserStore } from "@/lib/states/user";

export default function JotaiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={UserStore}>{children}</Provider>;
}
