import Header from "@/app/[locale]/_page-layout/_header";
import GlobalToast from "@/components/share/global-toast";
import WalletsModal from "@/components/share/wallets-modal";
import ReferralDialog from "../(dashboard)/referrals/referral-dialog";

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
      <ReferralDialog />
      <WalletsModal />
    </div>
  );
}
