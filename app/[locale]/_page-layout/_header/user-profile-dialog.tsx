"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useUserCreate } from "@/lib/hooks/contract/use-user-create";
import { UserProfileDialogOpen } from "@/lib/states/user";
import { useUserNameChange } from "@/lib/hooks/api/use-user-name-change";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";
import { useUserStats } from "@/lib/hooks/api/use-user-stats";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserProfileDialog() {
  const T = useTranslations("Common");

  const [showProDialog, setShowProDialog] = useAtom(UserProfileDialogOpen);
  const { address } = useChainWallet();
  const { data: accountStat, mutate } = useUserStats();
  const { checkAndSwitchChain } = useCheckSwitchChain();

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

  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (!accountStat?.user_name) {
      setIsCreate(true);
      // setShowProDialog(true);
    } else {
      setIsCreate(false);
      setShowProDialog(false);
      setUsername(accountStat.user_name || "");
    }
  }, [accountStat, setShowProDialog]);

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
    isCreate && checkAndSwitchChain();
    const errTxt = getNameErrorText(username);
    setNameErrorText(errTxt);
  }

  function getNameErrorText(v: string) {
    if (v.length < 4) {
      return T("StrLengthError", { length: 4 });
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

  async function handleSave() {
    if (nameErrorText) return;

    if (!address) return;

    if (isCreate) {
      await checkAndSwitchChain();
      triggerCreate({ username });
    } else {
      triggerUserNameChange({
        wallet: address,
        user_name: username,
      });
    }
  }

  return (
    <Dialog
      open={showProDialog}
      onOpenChange={() =>
        setShowProDialog(!accountStat?.user_name ? true : !showProDialog)
      }
    >
      <VisuallyHidden asChild>
        <DialogTitle>{T("UserProfile")}</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-0"
        aria-describedby={undefined}
      >
        <DialogTitle showClose={!!accountStat?.user_name}>
          <div className="flex items-center justify-between w-full">
            <div className="text-title-white">{T("UserProfile")}</div>
            <button
              onClick={() => setShowProDialog(false)}
              className="text-title-white hover:text-main"
            >
              &times;
            </button>
          </div>
        </DialogTitle>

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
              className="z-0 mt-[10px] h-8 w-full rounded border border-border-black bg-transparent px-[10px] text-xs leading-[18px] text-title-white placeholder:text-gray focus:text-txt-white"
            />
            {nameErrorText && (
              <div className="text-error absolute -bottom-[18px] left-0 text-xs leading-[18px] text-red">
                {nameErrorText}
              </div>
            )}
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
