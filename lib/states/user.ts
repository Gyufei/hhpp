import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const UserStore = createStore();

export const AccessTokenAtom = atomWithStorage<string>(
  "privy:token",
  "",
  undefined,
  {
    getOnInit: true,
  },
);
