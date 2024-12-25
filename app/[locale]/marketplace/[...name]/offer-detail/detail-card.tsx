import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { WithTip } from "../../../../../components/share/with-tip";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useTranslations } from "next-intl";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";

export default function DetailCard({ offer }: { offer: IOffer }) {
  const T = useTranslations("drawer-OfferDetail");

  const { offerPointInfo, pointDecimalNum } = useOfferFormat({
    offer,
  });

  const { data: entryInfo } = useEntryById(offer.entry.id);

  const offerType = offer.entry.direction;
  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  return (
    <div className="flex-1 px-0 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="leading-6 text-black">{T("cap-OfferDetail")}</div>
      </div>
      <DetailRow>
        <DetailLabel tipText={T("tip-SellerAmount")}>
          {T("lb-SellerAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-black">
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
          <div className="text-sm leading-5 text-black">
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
          <div className="w-fit rounded-[4px] bg-[#F0F1F5] px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {originId ? `#${originId}` : ""}
          </div>
          <div className="text-sm leading-5 text-black">
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
        boxShadow: showBottomLine ? "inset 0px -1px 0px 0px #EEEEEE" : "none",
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
      <WithTip>{tipText}</WithTip>
    </div>
  );
}
