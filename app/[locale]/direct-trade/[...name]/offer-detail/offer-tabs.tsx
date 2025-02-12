import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { TakerOrders } from "./taker-orders";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useTakerOrderOfOffers } from "@/lib/hooks/api/use-taker-orders-of-offer";
import { Checkbox } from "@/components/ui/checkbox";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function OfferTabs({ offer }: { offer: IOffer }) {
  const T = useTranslations("Offer");
  const [currentTab, setCurrentTab] = useState("orders");

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: takerOrders } = useTakerOrderOfOffers({
    offerId: offer.offer_id,
    chain: offer.marketplace.chain,
  });

  const [onlyMe, setOnlyMe] = useState(false);

  const showOrders = useMemo(() => {
    if (!takerOrders) return [];
    const allOrd = onlyMe
      ? takerOrders.filter((s) => s.taker === address)
      : takerOrders;
    return allOrd;
  }, [takerOrders, onlyMe, address]);

  return (
    <div className="no-scroll-bar flex w-full flex-1 flex-col overflow-x-scroll sm:w-auto sm:overflow-x-hidden">
      <div className="max-h-auto mx-5 mt-[10px] w-[700px] flex-1 flex-col rounded-[20px] bg-bg-black pb-5 pt-0">
        <Tabs
          value={currentTab}
          className="flex h-full flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList className="relative flex items-center justify-between rounded-none p-0">
            <div className="z-10 flex items-center justify-start space-x-10">
              <TabsTrigger
                className="flex items-center rounded-none border-b-2 px-[10px] pb-[10px] pt-0 text-sm leading-5 data-[state=active]:border-main data-[state=inactive]:border-transparent data-[state=active]:text-title-white data-[state=inactive]:text-gray"
                value="orders"
              >
                {T("Transactions")}({takerOrders?.length || 0})
              </TabsTrigger>
            </div>
            <div className="mb-2 flex items-center space-x-2">
              <label
                htmlFor="onlyMe"
                className="text-xs leading-[18px] text-title-white"
              >
                {T("tg-OnlyMe")}
              </label>
              <Checkbox
                checked={onlyMe}
                onCheckedChange={(v) => setOnlyMe(!!v)}
                id="onlyMe"
              />
            </div>
            <div className="absolute bottom-[4.5px] h-1 w-full border-b border-border-black"></div>
          </TabsList>
          <TabsContent
            value="orders"
            className="flex h-full flex-1 flex-col justify-between"
          >
            {<TakerOrders orders={showOrders || []} offer={offer} />}
          </TabsContent>
          <TabsContent value="history" className="flex-1"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
