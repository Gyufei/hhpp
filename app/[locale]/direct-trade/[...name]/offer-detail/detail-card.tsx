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

  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  return (
    <div className="mt-5 flex-1 px-0 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="text-xs leading-[18px] text-title-white">
          {T("OfferDetail")}
        </div>
      </div>
      <DetailRow>
        <DetailLabel tipText={T("SellerAmount")}>
          {T("SellerAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-xs leading-[18px] text-title-white">
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
        <DetailLabel tipText={T("Seller")}>{T("Seller")}</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-title-white">
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

      <DetailRow>
        <DetailLabel tipText={T("TrendingEndsAt")}>
          {T("TrendingEndsAt")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-title-white">--</div>
        </div>
      </DetailRow>

      <DetailRow>
        <DetailLabel tipText={T("InitialOfferMaker")}>
          {T("InitialOfferMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded bg-border-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {originId ? `#${originId}` : ""}
          </div>
          <div className="text-sm leading-5 text-title-white">
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

export function DetailRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[10px] flex items-center justify-between">
      {children}
    </div>
  );
}

export function DetailLabel({
  tipText,
  children,
}: {
  tipText: string;
  children: React.ReactNode;
}) {
  return (
    <WithTip
      className="flex items-center space-x-1 text-xs leading-[18px] text-gray"
      content={tipText}
    >
      {children}
    </WithTip>
  );
}
