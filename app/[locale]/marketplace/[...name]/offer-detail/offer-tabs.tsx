import { SmallSwitch } from "@/components/share/small-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { TakerOrders } from "./taker-orders";
import { IOffer } from "@/lib/types/offer";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useTakerOrderOfOffers } from "@/lib/hooks/api/use-taker-orders-of-offer";

export default function OfferTabs({ offer }: { offer: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");
  const [currentTab, setCurrentTab] = useState("orders");

  const { address } = useChainWallet();

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
    <div className="no-scroll-bar w-full overflow-x-scroll sm:w-auto sm:overflow-x-hidden">
      <div className="mt-4 max-h-[415px] min-w-[820px] rounded-[20px] bg-[#fafafa] p-4 pb-6">
        <Tabs
          value={currentTab}
          className="flex flex-1 flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList className="flex items-end justify-between p-0">
            <div className="flex items-center justify-start space-x-10">
              <TabsTrigger
                className="flex w-[105px] items-center pb-[10px] pl-0 pt-0 leading-6 data-[state=active]:border-b-2 data-[state=active]:border-lightgray data-[state=inactive]:border-transparent data-[state=active]:text-black data-[state=inactive]:text-lightgray"
                value="orders"
              >
                {T("cap-TakerOrders")}
              </TabsTrigger>
              {/* <TabsTrigger
              className="w-[105px] leading-6 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=active]:border-lightgray data-[state=inactive]:text-lightgray data-[state=active]:text-black"
              value="history"
            >
              {T("cap-OrderHistory")}
            </TabsTrigger> */}
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="onlyMe"
                className="text-xs leading-[18px] text-gray"
              >
                {T("tg-OnlyMe")}
              </label>
              <SmallSwitch
                checked={onlyMe}
                onCheckedChange={(v) => setOnlyMe(v)}
                id="onlyMe"
              />
            </div>
          </TabsList>
          <TabsContent value="orders" className="h-fit">
            {<TakerOrders orders={showOrders || []} offer={offer} />}
          </TabsContent>
          <TabsContent value="history" className="flex-1"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
