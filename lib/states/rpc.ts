import { atomWithStorage } from "jotai/utils";
import { ChainConfigs } from "../const/chain-configs";
import { ChainType } from "../types/chain";

export const GlobalRpcsAtom = atomWithStorage<Record<any, any>>("globalRpcs", {
  [ChainType.HYPER]: ChainConfigs[ChainType.HYPER].rpcs.TadleDefaultRPC,
});

export const CustomRpcsAtom = atomWithStorage<Record<any, any>>("customRpcs", {
  [ChainType.HYPER]: null,
});
