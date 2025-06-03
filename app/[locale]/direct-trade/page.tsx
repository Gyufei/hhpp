"use client";
import { useRouter } from "@/i18n/routing";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { checkIsAfterExpiry } from "@/lib/hooks/offer/use-offer-format";
import { useSearchParams } from "next/navigation";

export default function Marketplace() {
  const router = useRouter();
  const { data: markets } = useMarketplaces();
  const searchParams = useSearchParams();

  const firstMarket = markets?.filter(
    (m) => !checkIsAfterExpiry(m.expiry_date),
  )?.[0];

  if (firstMarket) {
    router.replace(
      `/direct-trade/${firstMarket.id}?${searchParams.toString()}`,
    );
  }

  return <></>;
}
