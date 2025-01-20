"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { truncateAddr } from "@/lib/utils/web3";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useReferralCodeData } from "@/lib/hooks/api/use-referral-data";
import { usePathname, useRouter } from "@/i18n/routing";
import { useReferralBind, useReferralView } from "@/lib/hooks/api/use-referral";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "react-hot-toast";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ReferralBindDialog() {
  const query = useSearchParams();
  const referralCode = query.get("s") || "";

  const { trigger: viewReferral } = useReferralView();

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const [showReDialog, setShowReDialog] = useState(false);

  useEffect(() => {
    if (referralCode && address) {
      viewReferral({ referral_code: referralCode, authority: address });
    }
  }, [referralCode, viewReferral, address]);

  useEffect(() => {
    if (referralCode) {
      setShowReDialog(true);
      return;
    }
  }, [setShowReDialog, referralCode]);

  return (
    <Dialog
      open={showReDialog}
      onOpenChange={(isOpen) => setShowReDialog(isOpen)}
    >
      <VisuallyHidden asChild>
        <DialogTitle>Connect Dialog</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="z-[199] flex w-[360px] flex-col items-center gap-0 rounded border-border-black bg-bg-black p-6"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        aria-describedby={undefined}
      >
        <ReferralBindBtn
          referralCode={referralCode}
          onSuccess={() => setShowReDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function ReferralBindBtn({
  referralCode,
  onSuccess,
}: {
  referralCode: string;
  onSuccess: () => void;
}) {
  const T = useTranslations("Common");
  const RT = useTranslations("Referral");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

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
    isMutating,
    data: isSuccess,
    trigger: writeAction,
    error,
  } = useReferralBind();

  function handleSignInReferral() {
    if (isMutating || !codeData) return;
    writeAction({ referral_code: referralCode });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
      toast.success("Sign in with referral_code success");
      if (searchParams.get("s")) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("s");

        router.replace(pathname + `?${params.toString()}`);
      }
    }

    if (error) {
      toast.error(error.message || "Sign in with referral_code failed");
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="mb-3 text-xl leading-[30px] text-title-white">
        {T("Welcome")}
      </div>
      <div className="min-h-10 px-5 text-center text-sm leading-5 text-title-white">
        {RT.rich("YourFriendSentYouAnOnboardingInvitation", {
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
      <div className="mt-6 w-full">
        <WithWalletConnectBtn onClick={handleSignInReferral}>
          <button className="flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover">
            {address ? RT("Bind") : T("SignIn")}
          </button>
        </WithWalletConnectBtn>
      </div>
    </>
  );
}
