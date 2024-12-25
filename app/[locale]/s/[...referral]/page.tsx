"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";

import { useRouter } from "@/app/navigation";
import { useReferralCodeData } from "@/lib/hooks/api/use-referral-data";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";

export default function ReferralPage({ params }: { params: any }) {
  const referral = params.referral[0];
  const router = useRouter();

  const { address } = useChainWallet();

  const { data: codeData, isLoading } = useReferralCodeData({
    chain: ChainType.ARB,
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
      router.replace(`/marketplace?s=${referral}`);
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
