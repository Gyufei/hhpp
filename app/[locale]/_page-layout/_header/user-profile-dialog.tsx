"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TradingMode, useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { Checkbox } from "@/components/ui/checkbox";

export const UserProfileDialogOpen = atom(true);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserProfileDialog() {
  const T = useTranslations("Common");
  const [showReDialog, setShowReDialog] = useAtom(UserProfileDialogOpen);
  const { data: accountInfo } = useAccountInfo();

  const [username, setUsername] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");

  const [tradingMode, setTradingMode] = useState<TradingMode>("Private");

  useEffect(() => {
    console.log(accountInfo);
  }, []);

  function handleUsernameInput(v: string) {
    setUsername(v);

    const errTxt = getNameErrorText(v);
    if (!errTxt) {
      setNameErrorText(errTxt);
    }
  }

  function handleBlur() {
    const errTxt = getNameErrorText(username);
    setNameErrorText(errTxt);
  }

  function getNameErrorText(v: string) {
    if (v.length < 3) {
      return T("UsernameLengthError");
    }

    return "";
  }

  return (
    <Dialog
      open={showReDialog}
      onOpenChange={(isOpen) => setShowReDialog(isOpen)}
    >
      <VisuallyHidden asChild>
        <DialogTitle>{T("UserProfile")}</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle>{T("UserProfile")}</DialogTitle>

        <div>
          <label htmlFor="username">{T("Username")}</label>
          <Input
            placeholder={T("Username")}
            onBlur={handleBlur}
            value={username}
            onChange={(e) => handleUsernameInput(e.target.value)}
            className="z-0 h-8 w-[200px] rounded border border-[#d1d4dc] bg-transparent px-[10px] text-txt-white placeholder:text-gray"
          />
          <div>{nameErrorText}</div>
        </div>

        <div>
          <div>{T("TradingMode")}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <div>Private</div>
              <Checkbox
                checked={tradingMode === "Private"}
                onCheckedChange={() => {
                  if (tradingMode === "Private") return;
                  setTradingMode("Private");
                }}
              />
            </div>

            <div className="flex items-center ">
              <div>Public</div>
              <Checkbox
                checked={tradingMode === "Public"}
                onCheckedChange={() => {
                  if (tradingMode === "Public") return;
                  setTradingMode("Public");
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
