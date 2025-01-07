import NP from "number-precision";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { WithTip } from "@/components/share/with-tip";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useTranslations } from "next-intl";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useEntryById } from "@/lib/hooks/api/use-entry-by-id";

export default function MyDetailCard({ offer }: { offer: IOffer }) {
  const ot = useTranslations("drawer-OfferDetail");

  const { address } = useChainWallet();

  const { offerPointInfo, pointDecimalNum } = useOfferFormat({
    offer: offer,
  });

  const { data: entryInfo } = useEntryById(offer.entry.id);

  const originId = entryInfo?.root_entry_id || offer.entry.id;
  const originMaker = entryInfo?.original_creator || offer.offer_maker;

  const isYouAreOriginMaker = address === originMaker;

  return (
    <div className="flex-1 px-6">
      <div className="leading-6 text-txt-white">{ot("cap-OfferDetail")}</div>

      <DetailRow>
        <DetailLabel tipText={ot("tip-Filled")}>
          {ot("lb-Filled/SellingAmount")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="text-sm leading-5 text-txt-white">
            {formatNum(
              NP.divide(offer.taken_item_amount, pointDecimalNum),
              2,
              true,
            )}{" "}
            /{" "}
            {formatNum(NP.divide(offer.item_amount, pointDecimalNum), 2, true)}{" "}
            pts
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
        <DetailLabel tipText="">{ot("lb-Previous")} Maker / Taker</DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-bg-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {offer.entry.id ? `#${offer.entry.id}` : ""}
          </div>
          <div className="text-sm leading-5 text-txt-white">
            {truncateAddr(offer.offer_maker || "", {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, offer.offer_maker || "")
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
        <DetailLabel tipText={ot("tip-InitialOfferMaker")}>
          {ot("lb-InitialOfferMaker")}
        </DetailLabel>
        <div className="flex items-center space-x-1">
          <div className="w-fit rounded-[4px] bg-bg-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            {originId ? `#${originId}` : ""}
          </div>
          <div className="text-sm leading-5 text-red">
            {isYouAreOriginMaker
              ? ot("lb-You")
              : truncateAddr(originMaker, {
                  nPrefix: 4,
                  nSuffix: 4,
                })}
          </div>
          <Image
            onClick={() =>
              handleGoScan(offer.marketplace.chain, originMaker || "")
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
        boxShadow: showBottomLine ? "inset 0px -1px 0px 0px #303030" : "none",
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
