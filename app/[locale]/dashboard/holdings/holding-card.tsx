import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import ListAskHoldingBtn from "./list-btn/list-ask-holding-btn";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { IHolding } from "@/lib/types/holding";
import DelistBtn from "./delist-btn";
import { useTranslations } from "next-intl";
import AbortHoldingBtn from "./abort-holding-btn";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { ChainConfigs } from "@/lib/const/chain-configs";

export default function HoldingCard({
  openHoldingDrawer,
  holding,
  onSuccess,
}: {
  openHoldingDrawer: (_h: string) => void;
  holding: IHolding;
  onSuccess: () => void;
}) {
  const ct = useTranslations("page-MyStocks");

  const {
    offerValue,
    forValue,
    offerLogo,
    pointPerPrice,
    tokenTotalPrice,
    forLogo,
    isCanAbort,
  } = useOfferFormat({
    offer: holding?.offer || ({} as any),
  });

  const isAskStock = holding?.offer?.entry?.direction === "sell";

  const { data: subOrders } = {
    data: [],
  };

  const isCanList = !isAskStock && !holding.offer;
  const isListed = !isAskStock && holding.offer;

  function handleOpenDetail() {
    openHoldingDrawer(holding.holding_id);
  }

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3"
          onClick={handleOpenDetail}
        >
          <TokenPairImg
            src1={holding.marketplace?.projectLogo}
            src2={ChainConfigs[holding.marketplace.chain].logo}
            width1={48}
            height1={48}
            width2={8.8}
            height2={8.8}
          />

          <div>
            <div className="mb-[2px] leading-6 text-black">
              {holding.marketplace?.market_name}
            </div>
            <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{holding.entries[0].id}
            </div>
          </div>
        </div>

        <div
          data-type={holding.offer?.entry?.direction}
          className="flex h-5 items-center rounded px-[10px] text-xs leading-[18px] data-[type=ask]:bg-[#EDF8F4] data-[type=bid]:bg-[#FFEFEF] data-[type=buy]:text-red data-[type=sell]:text-green"
        >
          {!isAskStock ? ct("tag-Bid") : ct("tag-Ask")}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("lb-Offer")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(offerValue, 2, true)}
            <Image
              src={offerLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            ${formatNum(pointPerPrice, 6)} / {holding.marketplace.item_name}
          </div>
        </div>
        <Image
          src="/icons/arrow-right-gray.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <div className="flex flex-col items-end">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {ct("lb-For")}
          </div>
          <div className="flex items-center leading-6 text-black">
            {formatNum(forValue, 2, true)}
            <Image
              src={forLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="text-xs leading-[18px] text-lightgray">
            ${formatNum(tokenTotalPrice)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <ManToMans num={subOrders?.length || 0} isAsk={isAskStock} />
        {isCanList && (
          <ListAskHoldingBtn holding={holding} onSuccess={onSuccess} />
        )}
        {isListed && <DelistBtn />}
        {isCanAbort && (
          <AbortHoldingBtn holding={holding} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
}

function ManToMans({ num, isAsk }: { num: number; isAsk: boolean }) {
  return (
    <div className="flex items-center space-x-[6px]">
      <Image
        src={isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
        width={20}
        height={20}
        alt="man"
      />
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="man"
      />
      {num === 1 && (
        <Image
          src={!isAsk ? "/icons/man.svg" : "/icons/man-gray.svg"}
          width={20}
          height={20}
          alt="man"
        />
      )}
      {num === 2 && (
        <Image
          src={!isAsk ? "/icons/two-man.svg" : "/icons/two-man-gray.svg"}
          width={24}
          height={20}
          alt="man"
        />
      )}
      {num === 3 && (
        <Image
          src={!isAsk ? "/icons/three-man.svg" : "/icons/three-man-gray.svg"}
          width={32}
          height={20}
          alt="man"
        />
      )}
      {num >= 4 && (
        <Image
          src={!isAsk ? "/icons/four-man.svg" : "/icons/four-man-gray.svg"}
          width={36}
          height={20}
          alt="man"
        />
      )}
      <div className="text-sm leading-5 text-black">{num}</div>
    </div>
  );
}
