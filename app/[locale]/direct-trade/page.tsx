"use client";
import { useRouter } from "@/i18n/routing";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { useSearchParams } from "next/navigation";

export default function Marketplace() {
  const router = useRouter();
  const { data: markets } = useMarketplaces();
  const searchParams = useSearchParams();

  const firstMarket = markets?.[0];

  if (firstMarket) {
    router.replace(
      `/direct-trade/${firstMarket.market_symbol}?${searchParams.toString()}`,
    );
  }

  return <></>;
}
