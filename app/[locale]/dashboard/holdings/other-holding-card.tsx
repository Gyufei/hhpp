import { formatNum } from "@/lib/utils/number";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import NP from "number-precision";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useUserItemBalance } from "@/lib/hooks/api/use-user-item-balance";
import { ChainType } from "@/lib/types/chain";
import { useMemo } from "react";
import { ProjectDecimalsMap } from "@/lib/const/constant";

export default function OtherHoldingCard({ holding }: { holding: any }) {
  const ct = useTranslations("page-MyStocks");

  return (
    <div className="rounded-[20px] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex cursor-pointer items-start space-x-3">
          <div className="mt-2">
            <TokenPairImg
              src1={holding.marketplace?.projectLogo}
              src2={ChainConfigs[holding.marketplace.chain_name].logo}
              width1={48}
              height1={48}
              width2={8.8}
              height2={8.8}
            />
          </div>
          <div>
            <div className="mb-[2px] leading-6 text-black">
              {holding.marketplace.item_name}
            </div>
            <div className="mt-4 flex items-start justify-between ">
              <div className="flex flex-col">
                <div className="mt-[2px] text-xs leading-[18px] text-gray">
                  {ct("txt-Free")}
                </div>
                <div className="flex items-center leading-6 text-black">
                  <BalanceValue type="free" holding={holding} />
                </div>
                <div className="mt-[2px] text-xs leading-[18px] text-gray">
                  {ct("txt-Locked")}
                </div>
                <div className="flex items-center leading-6 text-black">
                  <BalanceValue type="locked" holding={holding} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BalanceValue = ({ type, holding }: { type: string; holding: any }) => {
  const pointDecimalNum = useMemo(() => {
    if (ProjectDecimalsMap[holding?.marketplace?.market_symbol]) {
      const decimal = ProjectDecimalsMap[holding.marketplace.market_symbol];
      return 10 ** decimal;
    }
    return 1;
  }, [holding]);
  if (holding.marketplace.market_catagory === "point_token") {
    if (type === "free")
      return (
        <>
          {formatNum(NP.divide(holding?.allItemAmount, pointDecimalNum)) || 0}
        </>
      );
    return <>0</>;
  }

  if (holding.marketplace.market_catagory === "offchain_fungible_point")
    return (
      <OffchainFungiblePointBalance
        marketSymbol={holding.marketplace.market_symbol}
        type={type}
        chain={holding.marketplace.chain_name}
      />
    );
  return <>0</>;
};

const OffchainFungiblePointBalance = ({
  type,
  marketSymbol,
  chain,
}: {
  type: string;
  marketSymbol: string;
  chain: ChainType;
}) => {
  const { address: wallet } = useChainWallet();

  const { data: itemBlcData } = useUserItemBalance(wallet, marketSymbol, chain);
  if (itemBlcData) {
    if (type === "free") {
      return <>{itemBlcData?.available || 0}</>;
    } else {
      return <>{itemBlcData?.locked || 0}</>;
    }
  }
  return <>0</>;
};
