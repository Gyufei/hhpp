import { TokenPairImg } from "@/components/share/token-pair-img";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { usePointAmount } from "@/lib/hooks/api/use-point-amount";

export default function HoldingCard({ holding }: { holding: any }) {
  const ct = useTranslations("page-MyStocks");

  return (
    <div className="rounded-[20px] bg-bg-black p-5">
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
            <div className="mb-[2px] leading-6 text-txt-white">
              {holding.marketplace.item_name}
            </div>
            <div className="mt-4 flex items-start justify-between ">
              <div className="flex flex-col">
                <div className="mt-[2px] text-xs leading-[18px] text-gray">
                  {ct("txt-Free")}
                </div>
                <div className="flex items-center leading-6 text-txt-white">
                  <BalanceValue
                    type="free"
                    marketAccount={holding.marketplace.market_place_account}
                  />
                </div>
                <div className="mt-[2px] text-xs leading-[18px] text-gray">
                  {ct("txt-Locked")}
                </div>
                <div className="flex items-center leading-6 text-txt-white">
                  <BalanceValue
                    type="locked"
                    marketAccount={holding.marketplace.market_place_account}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BalanceValue = ({
  type,
  marketAccount,
}: {
  type: string;
  marketAccount: string;
}) => {
  const { address: wallet } = useChainWallet();
  const { data: pointAmount } = usePointAmount(wallet, marketAccount);

  if (pointAmount) {
    if (type === "free") {
      return <>{pointAmount?.free_amount || 0}</>;
    } else {
      return <>{pointAmount?.locked_amount || 0}</>;
    }
  }
  return <>0</>;
};
