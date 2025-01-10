"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useReferralCodeData } from "@/lib/hooks/api/use-referral-data";
import { usePathname, useRouter } from "@/i18n/routing";
import { useReferralBind, useReferralView } from "@/lib/hooks/api/use-referral";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ReferralDialog() {
  const query = useSearchParams();
  const referralCode = query.get("s") || "";

  const { trigger: viewReferral } = useReferralView();

  const { address } = useChainWallet();

  const [showReDialog, setShowReDialog] = useState(false);

  useEffect(() => {
    if (referralCode && address) {
      viewReferral({ referral_code: referralCode, authority: address });
    }
  }, [referralCode, viewReferral, address]);

  useEffect(() => {
    if (address && referralCode) {
      setShowReDialog(true);
      return;
    }
  }, [address, setShowReDialog, referralCode]);

  return (
    <Dialog
      open={showReDialog}
      onOpenChange={(isOpen) => setShowReDialog(isOpen)}
    >
      <VisuallyHidden asChild>
        <DialogTitle>Connect Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        showClose={false}
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <ReferralSignInBtn
          referralCode={referralCode}
          onSuccess={() => setShowReDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function ReferralSignInBtn({
  referralCode,
  onSuccess,
}: {
  referralCode: string;
  onSuccess: () => void;
}) {
  const t = useTranslations("Header");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: codeData } = useReferralCodeData({
    code: referralCode,
  });

  const referrerStr = useMemo(() => {
    if (!codeData) return "";
    return codeData.authority;
  }, [codeData]);

  const shortAddr = useMemo(() => {
    if (!referrerStr) return "";
    return truncateAddr(referrerStr, {
      nPrefix: 4,
      nSuffix: 4,
    });
  }, [referrerStr]);

  const {
    isMutating: isUpdating,
    data: isSuccess,
    trigger: writeAction,
  } = useReferralBind();

  function handleSignInReferral() {
    if (isUpdating || !codeData) return;
    writeAction({ referral_code: referralCode });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
      if (searchParams.get("s")) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("s");

        router.replace(pathname + `?${params.toString()}`);
      }
    }
  }, [isSuccess]);

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-txt-white">
        {t("cap-Welcome")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-txt-white">
        {t.rich("txt-YourFriendSentYouAnOnboardingInvitation", {
          name: (_chunks: any) => (
            <span className="text-green">{shortAddr}</span>
          ),
          num: (_chunks: any) => (
            <span className="text-green">
              {Number(codeData?.authority_rate || 0) / 10 ** 4 + "%"}
            </span>
          ),
        })}
      </div>
      <div className="mt-10 w-full">
        <button
          onClick={handleSignInReferral}
          className="flex h-12 w-full items-center justify-center rounded bg-main text-txt-white"
        >
          {t("btn-SignIn")}
        </button>
      </div>
    </>
  );
}
