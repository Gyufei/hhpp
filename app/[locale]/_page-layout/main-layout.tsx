import GlobalToast from "@/components/share/global-toast";
import WalletsModal from "@/components/share/wallets-modal";

import Header from "@/app/[locale]/_page-layout/_header";
import UserProfileDialog from "@/app/[locale]/_page-layout/_header/user-profile-dialog";
import ReferralBindDialog from "@/app/[locale]/(dashboard)/referrals/referral-bind-dialog";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-bg-black">
      <div className="flex w-full flex-col justify-between">
        <div className="relative mx-auto w-full">
          <Header />
          {children}
        </div>
      </div>

      <GlobalToast />
      <ReferralBindDialog />
      <WalletsModal />
      <UserProfileDialog />
    </div>
  );
}
