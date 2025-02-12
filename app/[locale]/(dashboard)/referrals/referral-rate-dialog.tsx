import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { useTranslations } from "next-intl";
import {
  IReferralItem,
  useReferralExtraRate,
} from "@/lib/hooks/api/use-referral-data";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { NumericalInput } from "@/components/share/numerical-input";
import { useReferralRateChange } from "@/lib/hooks/api/use-referral";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";

export function ReferralRateDialog({
  referral,
  onSuccess,
  drawerOpen,
  setDrawerOpen,
}: {
  referral: IReferralItem | null;
  onSuccess: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (_v: boolean) => void;
}) {
  const CT = useTranslations("Common");
  const T = useTranslations("Referral");
  const { data: extraRateData } = useReferralExtraRate();
  const extraRate = useMemo(
    () => (extraRateData?.data || 0) / 10 ** 4,
    [extraRateData],
  );

  const { referralBaseRate } = useGlobalConfig();

  const {
    trigger: updateReferralRate,
    data: createResult,
    reset: resetCreateResult,
  } = useReferralRateChange();

  const [rate, setRate] = useState(
    String(Number(referral?.referrer_rate || 0) / 10 ** 4),
  );
  const [friendRate, setFriendRate] = useState(
    String(Number(referral?.authority_rate || 0) / 10 ** 4),
  );
  const [rateError, setRateError] = useState(false);

  useEffect(() => {
    setRate(String(Number(referral?.referrer_rate || 0) / 10 ** 4));
    setFriendRate(String(Number(referral?.authority_rate || 0) / 10 ** 4));
  }, [referral]);

  function handleRateInput(v: string) {
    setRate(v);
  }

  function handleFRateInput(v: string) {
    setFriendRate(v);
  }

  useEffect(() => {
    if (Number(rate) + Number(friendRate) > referralBaseRate + extraRate) {
      setRateError(true);
    } else {
      setRateError(false);
    }
  }, [rate, friendRate, referralBaseRate, extraRate]);

  useEffect(() => {
    if (createResult) {
      onSuccess();
      setDrawerOpen(false);
      resetCreateResult();
    }
  });

  function handleSaveRate() {
    if (rateError) {
      return;
    }

    const args = {
      referral_code: referral?.referral_code || "",
      authority_rate: String(Number(friendRate || 0) * 10 ** 4),
      referrer_rate: String(Number(rate || 0) * 10 ** 4),
    };

    if (
      args.authority_rate === referral?.authority_rate &&
      args.referrer_rate === referral?.referrer_rate
    ) {
      onSuccess();
      setDrawerOpen(false);
      return;
    }

    updateReferralRate(args);
  }

  return (
    <Dialog open={drawerOpen} onOpenChange={(v) => setDrawerOpen(v)}>
      <DialogContent
        className="flex w-[480px] flex-col items-center justify-stretch gap-0 rounded border border-border-black bg-bg-black p-0"
        aria-describedby="referral-drawer"
      >
        <DialogTitle>{T("CommissionRates")}</DialogTitle>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col p-5">
            <div className="text-sm leading-5 text-title-white">
              {T("SetReferralLink")}
            </div>
            <div className="mt-[10px] text-xs leading-[18px] text-gray">
              {T("ReferralCode")}
            </div>
            <Input
              disabled={true}
              value={referral?.referral_code}
              placeholder="qwerty"
              className="mt-[10px] h-8 rounded border-border-black pl-[10px] text-xs text-title-white placeholder:text-gray focus:border-txt-white disabled:bg-[#222428]"
            />

            <div className="mt-[30px] h-1 border-b border-[#303030]"></div>

            <div className="mt-5 text-sm leading-5 text-title-white">
              {T("SetCommissionRates")}
            </div>

            <div className="relative mt-[10px] flex items-center justify-between space-x-[6px]">
              <div className="flex flex-1 flex-col space-y-[10px]">
                <div className="text-xs leading-[18px] text-gray">
                  {T("You")}
                </div>

                <NumericalInput
                  data-error={rateError}
                  className="h-8 w-full rounded border border-border-black px-[10px] py-2 text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white disabled:cursor-not-allowed data-[error=true]:!border-red"
                  placeholder={`${referralBaseRate}%`}
                  value={rate || ""}
                  onUserInput={handleRateInput}
                />
              </div>
              <div className="mt-6 text-xs leading-[18px] text-gray">+</div>
              <div className="flex flex-1 flex-col space-y-2">
                <div className="text-sm leading-5 text-gray">
                  {T("YourFriend")}
                </div>

                <NumericalInput
                  disabled={extraRate === 0}
                  data-error={rateError}
                  className="h-8 w-full rounded border border-border-black px-[10px] py-2 text-xs leading-[18px] text-title-white placeholder:text-gray focus:border-txt-white disabled:cursor-not-allowed disabled:bg-[#222428] disabled:text-gray data-[error=true]:!border-red"
                  placeholder="0%"
                  value={friendRate || ""}
                  onUserInput={handleFRateInput}
                />
              </div>
              <div className="mt-6 flex items-center space-x-1 text-xs leading-[18px] text-gray">
                <div>=</div>
                <div>{Number(rate || 0) + Number(friendRate || 0)}%</div>
              </div>

              {rateError && (
                <div className="absolute -bottom-6 left-0 text-xs leading-[18px] text-red">
                  {T("RateError", {
                    rate:
                      Number(referralBaseRate || 0) + Number(extraRate || 0),
                  })}
                </div>
              )}
            </div>

            <div className="mt-[30px] rounded bg-[#50d2c110] p-[10px] text-xs leading-[18px] text-[#50D2C1]">
              <Image
                width={18}
                height={18}
                src="/icons/info-main.svg"
                alt="info"
                className="float-left mr-2"
              />
              <div>
                {T("ReferralDrawer", {
                  num1: Number(rate || 0) + "%",
                  num2: Number(friendRate || 0) + "%",
                })}
              </div>
            </div>
          </div>

          <div className="relative border-t border-[#303030] px-5 py-4">
            <button
              onClick={handleSaveRate}
              className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive"
            >
              {CT("Save")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
