import Header from "@/app/[locale]/_page-layout/_header";
import GlobalActionTip from "@/components/share/global-action-tip";
import NP from "number-precision";
import WalletsModal from "@/components/share/wallets-modal";
import ReferralDialog from "../(dashboard)/referrals/referral-dialog";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  NP.enableBoundaryChecking(false);

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-bg-black">
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalActionTip />
      <ReferralDialog />
      <WalletsModal />
    </div>
  );
}
