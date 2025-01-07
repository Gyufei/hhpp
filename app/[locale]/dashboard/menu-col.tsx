"use client";
import Image from "next/image";
import { usePathname, Link } from "@/i18n/routing";

export default function MenuCol() {
  const pathname = usePathname();

  return (
    <div className="mt-[70px] hidden flex-col space-y-5 sm:flex">
      <MenuIcon
        href={`/dashboard/orders`}
        isActive={pathname === `/dashboard/orders`}
      >
        <Image src="/icons/menus.svg" width={24} height={24} alt="orders" />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/holdings`}
        isActive={pathname === `/dashboard/holdings`}
      >
        <Image
          src="/icons/holdings.svg"
          width={24}
          height={24}
          alt="holdings"
        />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/balances`}
        isActive={pathname === `/dashboard/balances`}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="balances" />
      </MenuIcon>
      <MenuIcon
        href={`/dashboard/referral`}
        isActive={pathname === `/dashboard/referral`}
      >
        <Image
          src="/icons/referral-system.svg"
          width={24}
          height={24}
          alt="referral"
        />
      </MenuIcon>
      {/* <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-main data-[active=true]:bg-main"
      >
        <Image src="/icons/compass.svg" width={24} height={24} alt="holdings" />
      </div>
      <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-main data-[active=true]:bg-main"
      >
        <Image src="/icons/stats.svg" width={24} height={24} alt="holdings" />
      </div>
      <div
        onClick={handleComingSoon}
        data-active={false}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-main data-[active=true]:bg-main"
      >
        <Image src="/icons/referral.svg" width={24} height={24} alt="holdings" />
      </div> */}
      {/* <MenuIcon
        href="/dashboard/balances"
        isActive={pathname === "/dashboard/balances"}
      >
        <Image src="/icons/wallet.svg" width={24} height={24} alt="holdings" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/stats"}>
        <Image src="/icons/stats.svg" width={24} height={24} alt="holdings" />
      </MenuIcon>
      <MenuIcon href="#" isActive={pathname === "/dashboard/referral"}>
        <Image src="/icons/referral.svg" width={24} height={24} alt="holdings" />
      </MenuIcon> */}
    </div>
  );
}

function MenuIcon({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        data-active={isActive}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#d3d4d5] data-[active=true]:border-main data-[active=true]:bg-main"
      >
        {children}
      </div>
    </Link>
  );
}
