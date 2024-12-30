"use client";

import NP from "number-precision";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatNum } from "@/lib/utils/number";
import { IToken } from "@/lib/types/token";
import { useTranslations } from "next-intl";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import {
  ITokenBalance,
  useUserTokenBalance,
} from "@/lib/hooks/api/use-user-token-balance";
import { TokenGetCard } from "./token-get-card";
import { ChainType } from "@/lib/types/chain";
import { useMarketPoints } from "@/lib/hooks/api/use-market-points";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { compact } from "lodash";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import MobileBalances from "./mobile-balances";

export interface IPanelProps {
  title: string;
  panelName: string;
  withdrawerName: string | null;
  data: {
    amount: number;
    tokenInfo: IToken;
  }[];
  total: number;
}

export default function MyBalances() {
  const mbt = useTranslations("page-MyBalance");
  const [openPanel, setOpenPanel] = useState("taxIncomeData");

  const { address: wallet } = useChainWallet();

  const { data: arbTokens } = useTokens(ChainType.HYPER);
  const { data: allMarketPoint } = useMarketPoints();

  const { isMobileSize } = useDeviceSize();

  const allTokens = useMemo(() => {
    function addChainToToken(chain: ChainType, tokens: IToken[]) {
      return tokens.map((token) => ({
        ...token,
        chain,
      }));
    }

    const marketToken = (allMarketPoint || [])
      .filter((t) => t.marketplace.market_catagory === "point_token")
      .map(
        (t) =>
          ({
            symbol: t.symbol,
            logoURI: t.logoURI,
            decimals: ProjectDecimalsMap[t.marketplace.market_symbol],
            chain: ChainType.HYPER,
          } as IToken),
      );

    return [
      ...addChainToToken(ChainType.HYPER, arbTokens || []),
      ...marketToken,
    ];
  }, [arbTokens, allMarketPoint]);

  const { data: tokenBlcData, mutate: refetchTokenBlcData } =
    useUserTokenBalance(wallet);

  const getTokenDataFormat = useCallback(
    (bData: Array<ITokenBalance> | undefined, key: string) => {
      if (!bData || !allTokens.length) return [];
      const itemData = bData?.map((t) => {
        const tokenInfo = allTokens.find(
          (token) =>
            token.address.toLowerCase() === t.token_address.toLowerCase(),
        );

        if (!tokenInfo) return null;

        const amount = NP.divide(
          (t.ledgers as any)[key],
          10 ** tokenInfo?.decimals,
        );
        return {
          amount: Number(amount),
          tokenInfo,
        };
      });

      return compact(itemData);
    },
    [allTokens],
  );

  const taxIncomeData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "tax_income");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const referralData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "referral_bonus");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const salesRevenueData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "sales_revenue");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const remainingCashData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "remaining_cash");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const makerRefundData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "maker_refund");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const pointTokenData = useMemo(() => {
    const data = getTokenDataFormat(tokenBlcData, "settlement");
    return data;
  }, [tokenBlcData, getTokenDataFormat]);

  const dataArray: Array<IPanelProps> = useMemo(() => {
    const items = [];

    if (taxIncomeData.length > 0) {
      const total = taxIncomeData.reduce((acc, t) => acc + t.amount || 0, 0);
      items.push({
        title: mbt("cap-TaxIncome"),
        panelName: "taxIncomeData",
        withdrawerName: "tax_income",
        data: taxIncomeData,
        total,
      } as IPanelProps);
    }

    if (referralData.length > 0) {
      const total = referralData.reduce((acc, t) => acc + t.amount || 0, 0);
      items.push({
        title: mbt("cap-ReferralBonus"),
        panelName: "referralData",
        withdrawerName: "referral_bonus",
        data: referralData,
        total,
      } as IPanelProps);
    }

    if (salesRevenueData.length > 0) {
      const total = salesRevenueData.reduce((acc, t) => acc + t.amount || 0, 0);
      items.push({
        title: mbt("cap-SalesRevenue"),
        panelName: "salesRevenueData",
        withdrawerName: "sales_revenue",
        data: salesRevenueData,
        total,
      } as IPanelProps);
    }

    if (remainingCashData.length > 0) {
      const total = remainingCashData.reduce(
        (acc, t) => acc + t.amount || 0,
        0,
      );
      items.push({
        title: mbt("cap-RemainingCash"),
        panelName: "remainingCashData",
        withdrawerName: "remaining_cash",
        data: remainingCashData,
        total,
      } as IPanelProps);
    }

    if (makerRefundData.length > 0) {
      const total = makerRefundData.reduce((acc, t) => acc + t.amount || 0, 0);
      items.push({
        title: mbt("cap-MakerRefund"),
        panelName: "makerRefundData",
        withdrawerName: "maker_refund",
        data: makerRefundData,
        total,
      } as IPanelProps);
    }

    if (pointTokenData.length > 0) {
      const total = pointTokenData.reduce((acc, t) => acc + t.amount || 0, 0);
      items.push({
        title: mbt("cap-PointToken"),
        panelName: "pointTokenData",
        withdrawerName: "settlement",
        data: pointTokenData,
        total,
      } as IPanelProps);
    }

    return items;
  }, [
    mbt,
    taxIncomeData,
    referralData,
    salesRevenueData,
    remainingCashData,
    makerRefundData,
    pointTokenData,
  ]);

  useEffect(() => {
    if (dataArray.length > 0) {
      setOpenPanel(dataArray[0].panelName);
    }
  }, [dataArray]);

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  if (isMobileSize) {
    return (
      <MobileBalances dataArray={dataArray} updateData={refetchTokenBlcData} />
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col sm:ml-5">
      <div className="hidden items-center space-x-5 sm:flex">
        <div className="text-xl leading-[30px] text-black">
          {mbt("cap-MyBalances")}
        </div>
      </div>
      {dataArray.length > 0 ? (
        <div className="relative mt-5 flex w-full flex-1 flex-col justify-between border-t border-[#eee]">
          <Accordion
            type="single"
            collapsible
            value={openPanel}
            onValueChange={(v) => handleOpenPanel(v)}
          >
            {dataArray
              .filter((i) => i.total > 0)
              ?.map((item, index) => (
                <AccordionItem key={index} value={item.panelName}>
                  <AccordionTrigger showIcon={false}>
                    <AcHeader
                      open={openPanel === item.panelName}
                      name={item.title}
                      walletCount={item.data?.length}
                      totalAmount={item.total}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-5">
                      {item.data.map((i, index) => (
                        <TokenGetCard
                          key={index}
                          tokenInfo={i.tokenInfo}
                          amount={i.amount || 0}
                          withdrawerName={item.withdrawerName}
                          onSuccess={() => refetchTokenBlcData()}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-base text-gray">
          {mbt("txt-YourBalanceAppearHere")}
        </div>
      )}
    </div>
  );
}

function AcHeader({
  open,
  name,
  walletCount,
  totalAmount,
}: {
  open: boolean;
  name: string;
  walletCount: number;
  totalAmount: number;
}) {
  const mbt = useTranslations("page-MyBalance");

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex flex-1 items-center text-lg leading-[28px] ">
        <div className="flex flex-1 justify-start text-black">{name}</div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">{mbt("cap-WalletCount")}</div>
          <div className="text-black">{walletCount}</div>
        </div>
        <div className="flex flex-1 items-center gap-x-[10px]">
          <div className="text-gray">{mbt("cap-TotalAmount")}</div>
          <div className="text-black">{formatNum(totalAmount)}</div>
        </div>
      </div>
      <div>
        {open ? (
          <Image src="/icons/ac-minus.svg" width={24} height={24} alt="open" />
        ) : (
          <Image src="/icons/ac-plus.svg" width={24} height={24} alt="open" />
        )}
      </div>
    </div>
  );
}
