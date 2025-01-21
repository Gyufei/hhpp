"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";

import { useRouter } from "@/i18n/routing";
import { useReferralCodeData } from "@/lib/hooks/api/use-referral-data";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function ReferralPage({ params }: { params: any }) {
  const referral = params.referral[0];
  const router = useRouter();

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: codeData, isLoading } = useReferralCodeData({
    code: referral,
  });

  const noReferralData = useMemo(() => {
    if (!codeData) return false;

    return codeData && (codeData as any)?.code === 500;
  }, [codeData]);

  const sameUser = useMemo(() => {
    if (!codeData) return false;
    return codeData && codeData.authority === address;
  }, [codeData, address]);

  useEffect(() => {
    if (!isLoading && !noReferralData && !sameUser) {
      router.replace(`/direct-trade?s=${referral}`);
    }
  }, [isLoading, referral, router, noReferralData, sameUser]);

  if (noReferralData || sameUser) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return <></>;
}
