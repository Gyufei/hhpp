"use client";
import { useTranslations } from "next-intl";
import { ReferralTable } from "./referral-table";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { useEffect } from "react";
import { useReferralCreate } from "@/lib/hooks/api/use-referral";
import HoverIcon from "@/components/share/hover-icon";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function Referral() {
  const T = useTranslations("Referral");

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";
  const { data: referralData, mutate: refetch } = useReferralData();

  const {
    trigger: createAction,
    isMutating: createLoading,
    data: isSuccess,
  } = useReferralCreate();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  function handleCreate() {
    if (createLoading) {
      return;
    }

    createAction(undefined);
  }

  return (
    <div className="flex h-full w-screen flex-1 flex-col sm:w-full ">
      <div className="hidden items-center justify-between rounded bg-bg-black p-5 sm:flex sm:py-[25px] ">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl leading-[30px] text-title-white">
            {T("Referrals")}
          </div>
        </div>
      </div>

      <div className="relative mr-0 mt-[2px] flex flex-1 flex-col justify-start rounded bg-bg-black">
        <div className="mt-4 flex h-full flex-col rounded bg-bg-black p-[10px] sm:mt-0 sm:bg-transparent">
          <div className="flex h-[24px] items-center space-x-[5px]">
            <div className="pl-[10px] text-sm leading-5 text-title-white">
              {T("ReferralLink")}
            </div>
            {address && (
              <HoverIcon
                onClick={handleCreate}
                width={20}
                height={20}
                src="/icons/circle-add.svg"
                hoverSrc="/icons/green-add.svg"
                alt="add"
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col overflow-x-scroll sm:max-w-none sm:overflow-x-hidden sm:px-0">
            <div className="max-h-auto relative min-h-[296px] w-[820px] flex-1 flex-col sm:w-full sm:min-w-0">
              <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
                <ReferralTable referralData={referralData} refresh={refetch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
