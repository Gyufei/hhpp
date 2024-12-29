import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const UserStore = createStore();

export const AccessTokenAtom = atomWithStorage<string>(
  "userToken",
  "",
  undefined,
  {
    getOnInit: true,
  },
);
