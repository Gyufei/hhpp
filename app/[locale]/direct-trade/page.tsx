"use client";
import { useRouter } from "@/i18n/routing";
import { useMarketplacesDisplay } from "@/lib/hooks/api/use-marketplaces-display";
import { checkIsAfterExpiry } from "@/lib/hooks/offer/use-offer-format";
import { getMarketUrlField } from "@/lib/utils/other";
import { useSearchParams } from "next/navigation";

export default function Marketplace() {
  const router = useRouter();
  const { data: markets } = useMarketplacesDisplay();
  const searchParams = useSearchParams();

  const firstMarket = markets?.filter(
    (m) => !checkIsAfterExpiry(m.expiry_date),
  )?.[0];

  if (firstMarket) {
    router.replace(
      `/direct-trade/${getMarketUrlField(
        firstMarket,
      )}?${searchParams.toString()}`,
    );
  }

  return <></>;
}
