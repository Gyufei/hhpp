"use client";
import Header from "@/app/[locale]/_page-layout/_header";
import GlobalActionTip from "@/components/share/global-action-tip";
import ReferralDialog from "../dashboard/referral/referral-dialog";
import NP from "number-precision";
import WalletsModal from "@/components/share/wallets-modal";
import WalletDisconnectModal from "@/components/share/wallet-disconnect-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  NP.enableBoundaryChecking(false);

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
      <ReferralDialog />
      <WalletsModal />
      <WalletDisconnectModal />
    </div>
  );
}
