import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/components/share/with-tip";
import { formatTimeObj } from "@/lib/utils/time";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useTranslations } from "next-intl";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";

export default function MyDetailCard({ offer }: { offer: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");

  const { offerPointInfo, pointDecimalNum } = useOfferFormat({
    offer: offer,
  });
  const offerType = offer.entry.direction;
  const { data: entryInfo } = useEntryById(offer.entry.id);

  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  return (
    <div className="flex-1 px-0 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="leading-6 text-txt-white">{T("cap-OfferDetail")}</div>
      </div>
      <DetailRow>
        <DetailLabel tipText={T("tip-SellerAmount")}>
          {T("lb-SellerAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-txt-white">
            {formatNum(NP.divide(offer.item_amount, pointDecimalNum))}
          </div>
          <Image
            src={offerPointInfo.logoURI}
            width={16}
            height={16}
            alt="stable token"
            className="rounded-full"
          />
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={T("tip-Seller")}>{T("lb-Seller")}</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-txt-white">
            {truncateAddr(offer?.offer_maker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, offer?.offer_maker || "")
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>

      <DetailRow showBottomLine={offerType === "sell"}>
        <DetailLabel tipText={T("tip-TrendingEndsAt")}>
          {T("lb-TrendingEndsAt")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5">--</div>
        </div>
      </DetailRow>

      <DetailRow showBottomLine={false}>
        <DetailLabel tipText={T("tip-InitialOfferMaker")}>
          {T("lb-InitialOfferMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded bg-bg-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {originId ? `#${originId}` : ""}
          </div>
          <div className="text-sm leading-5 text-txt-white">
            {truncateAddr(originMaker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, String(originMaker))
            }
            src="/icons/right-45.svg"
            width={16}
            height={16}
            alt="goScan"
            className="cursor-pointer"
          />
        </div>
      </DetailRow>
    </div>
  );
}

function DetailRow({
  showBottomLine = true,
  children,
}: {
  showBottomLine?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-1 flex items-center justify-between py-[10px]"
      style={{
        boxShadow: showBottomLine ? "inset 0px -1px 0px 0px #474747" : "none",
      }}
    >
      {children}
    </div>
  );
}

function DetailLabel({
  tipText,
  children,
}: {
  tipText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-1 text-sm leading-5 text-gray">
      {children}
      {tipText && <WithTip>{tipText}</WithTip>}
    </div>
  );
}

function TimeDisplay({ seconds }: { seconds: number }) {
  const dateObj = formatTimeObj(seconds);
  const ct = useTranslations("Common");

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <TimeItem num={dateObj.days || 0} text={ct("Days")} />
      <TimeItem num={dateObj.hours || 0} text={ct("Hours")} />
      <TimeItem num={dateObj.minutes || 0} text={ct("Minutes")} />
      <TimeItem num={dateObj.seconds || 0} text={ct("Seconds")} />
    </div>
  );
}

function TimeItem({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-yellow flex h-12 w-12 items-center justify-center rounded-lg bg-black text-xl leading-[30px]">
        {num}
      </div>
      <div className="text-xs leading-[18px] text-lightgray">{text}</div>
    </div>
  );
}
