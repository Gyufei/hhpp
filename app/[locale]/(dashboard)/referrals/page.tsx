"use client";
import { useTranslations } from "next-intl";
import ReferralInfo from "./referral-info";
import Image from "next/image";
import { ReferralTable } from "./referral-table";
import { useReferralData } from "@/lib/hooks/api/use-referral-data";
import { useEffect } from "react";
import { useReferralCreate } from "@/lib/hooks/api/use-referral";

export default function Referral() {
  const rt = useTranslations("page-Referral");

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
  }, [isSuccess]);

  function handleCreate() {
    if (createLoading) {
      return;
    }

    createAction(undefined);
  }

  return (
    <div className="flex h-full w-screen flex-1 flex-col sm:w-full ">
      <div className="ml-[2px] mt-[2px] hidden items-center justify-between rounded bg-bg-black p-4 sm:flex ">
        <div className="flex w-full items-center justify-between space-x-5">
          <div className="text-xl leading-[30px] text-txt-white">
            {rt("cap-Referrals")}
          </div>
          <ReferralInfo referralData={referralData || []} />
        </div>
      </div>

      <div className="relative m-[2px] mr-0 flex flex-1 flex-col justify-start rounded bg-bg-black">
        <div className="mt-4 rounded bg-bg-black p-4 sm:mt-0 sm:bg-transparent">
          <div className="mb-2 mt-5 flex items-center space-x-2">
            <div className="text-base leading-6 text-txt-white">
              {rt("cap-ReferralLink")}
            </div>
            <Image
              onClick={handleCreate}
              width={20}
              height={20}
              src="/icons/circle-add.svg"
              alt="add"
              className="cursor-pointer"
            />
          </div>
          <div className=" overflow-x-scroll sm:max-w-none sm:overflow-x-hidden sm:px-0">
            <div className="max-h-auto relative min-h-[296px] w-[820px] overflow-y-hidden sm:w-full sm:min-w-0">
              <div className="absolute bottom-0 left-0 right-0 top-0">
                <ReferralTable referralData={referralData} refresh={refetch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
