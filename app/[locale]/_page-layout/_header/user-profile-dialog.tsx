"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TradingMode, useAccountInfo } from "@/lib/hooks/api/use-account-info";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/common";
import { toast } from "react-hot-toast";
import { useUserCreate } from "@/lib/hooks/contract/use-user-create";
import { UserProfileDialogOpen } from "@/lib/states/user";
import { useUserNameChange } from "@/lib/hooks/api/use-user-name-change";
import SparkMD5 from "spark-md5";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserProfileDialog() {
  const T = useTranslations("Common");
  const [showProDialog, setShowProDialog] = useAtom(UserProfileDialogOpen);
  const { data: accountInfo, error, mutate } = useAccountInfo();

  const {
    trigger: triggerCreate,
    isMutating,
    data: isSuccess,
  } = useUserCreate();

  const {
    trigger: triggerUserNameChange,
    isMutating: isUserNameChangeMutating,
    data: isUserNameChangeSuccess,
  } = useUserNameChange();

  const [username, setUsername] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");

  const [canEditTradingMode, setCanEditTradingMode] = useState(false);
  const [tradingMode, setTradingMode] = useState<TradingMode>("Private");

  useEffect(() => {
    if (error && error?.status === 500) {
      setCanEditTradingMode(true);
      setShowProDialog(true);
    }

    if (accountInfo && accountInfo.dest_account) {
      setCanEditTradingMode(false);
      setShowProDialog(false);
      setUsername(accountInfo.user_name);
    }
  }, [accountInfo, error, setShowProDialog]);

  useEffect(() => {
    if (isSuccess) {
      setShowProDialog(false);
      toast.success("Create user successful");
      mutate();
    }
  }, [isSuccess, setShowProDialog]);

  useEffect(() => {
    if (isUserNameChangeSuccess) {
      setShowProDialog(false);
      toast.success("Change username successful");
      mutate();
    }
  }, [isUserNameChangeSuccess, setShowProDialog]);

  function handleUsernameInput(v: string) {
    setUsername(v);
    if (!v) {
      setNameErrorText("");
      return;
    }

    const errTxt = getNameErrorText(v);
    setNameErrorText(errTxt);
  }

  function handleBlur() {
    const errTxt = getNameErrorText(username);
    setNameErrorText(errTxt);
  }

  function getNameErrorText(v: string) {
    if (v.length < 4) {
      return T("UsernameLengthError");
    }

    if (v.startsWith("_") || v.startsWith("-")) {
      return T("UsernameStartWith");
    }

    const NameRegex = /^[a-z0-9_-]{4,30}$/g;
    if (!NameRegex.test(v)) {
      return T("UsernameInvalid");
    }

    return "";
  }

  function handleSave() {
    if (nameErrorText) return;

    if (canEditTradingMode) {
      triggerCreate({ username, tradingMode });
    } else {
      const account = accountInfo?.dest_account || "";
      const signature = SparkMD5.hash(account);
      triggerUserNameChange({
        dest_account: account,
        user_name: username,
        signature,
      });
    }
  }

  return (
    <Dialog open={showProDialog} onOpenChange={() => setShowProDialog(true)}>
      <VisuallyHidden asChild>
        <DialogTitle>{T("UserProfile")}</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle showClose={false}>{T("UserProfile")}</DialogTitle>

        <div className="w-full p-5">
          <div className="relative mb-5">
            <label
              className="text-xs leading-[18px] text-title-white"
              htmlFor="username"
            >
              {T("Username")}
            </label>
            <Input
              placeholder={T("Username")}
              onBlur={handleBlur}
              value={username}
              onChange={(e) => handleUsernameInput(e.target.value)}
              type="text"
              className="z-0 mt-[10px] h-8 w-full rounded border border-border-black bg-transparent px-[10px] text-xs leading-[18px] text-txt-white placeholder:text-gray focus:text-txt-white"
            />
            {nameErrorText && (
              <div className="text-error absolute -bottom-[18px] left-0 text-xs leading-[18px] text-red">
                {nameErrorText}
              </div>
            )}
          </div>

          <div>
            <div className="mb-[10px] text-xs leading-[18px] text-title-white">
              {T("TradingMode")}
            </div>
            <div className="flex items-center justify-between space-x-[10px]">
              <div
                className={cn(
                  "flex h-8 flex-1 items-center justify-between rounded border border-border-black px-[10px]",
                  canEditTradingMode
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-70",
                )}
                onClick={() => {
                  if (!canEditTradingMode) return;
                  setTradingMode("Private");
                }}
              >
                <div className="select-none text-xs leading-[18px] text-title-white">
                  Private
                </div>
                <Checkbox
                  className={cn(
                    canEditTradingMode
                      ? "cursor-pointer"
                      : "pointer-events-none",
                  )}
                  checked={tradingMode === "Private"}
                  onCheckedChange={() => {
                    if (tradingMode === "Private") return;
                    setTradingMode("Private");
                  }}
                />
              </div>

              <div
                className={cn(
                  "flex h-8 flex-1 items-center justify-between rounded border border-border-black px-[10px]",
                  canEditTradingMode
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-70",
                )}
                onClick={() => {
                  if (!canEditTradingMode) return;
                  setTradingMode("Public");
                }}
              >
                <div className="select-none text-xs leading-[18px] text-title-white">
                  Public
                </div>
                <Checkbox
                  className={cn(
                    canEditTradingMode
                      ? "cursor-pointer"
                      : "pointer-events-none",
                  )}
                  checked={tradingMode === "Public"}
                  onCheckedChange={() => {
                    if (!canEditTradingMode) return;
                    if (tradingMode === "Public") return;
                    setTradingMode("Public");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full border-t border-[#303030] px-5 py-4">
          <button
            disabled={
              isMutating ||
              !!nameErrorText ||
              !username ||
              isUserNameChangeMutating
            }
            onClick={handleSave}
            className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive"
          >
            {T("Save")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
