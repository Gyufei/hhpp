import { atom } from "jotai";

export type IActionType = "success" | "warning" | "error";

export const GlobalMessageAtom = atom<{
  type: IActionType;
  message: string;
  duration?: number;
  zIndex?: number;
  bottom?: string;
} | null>(null);
