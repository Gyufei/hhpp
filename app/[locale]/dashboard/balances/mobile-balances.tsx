import React from "react";
import { TokenGetCard } from "./token-get-card";
import { useTranslations } from "next-intl";
import { formatNum } from "@/lib/utils/number";
import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IPanelProps } from "./page";

interface MobileBalancesProps {
  dataArray: IPanelProps[];
  updateData: () => void;
}

const MobileBalances: React.FC<MobileBalancesProps> = ({
  dataArray,
  updateData,
}) => {
  const mbt = useTranslations("page-MyBalance");
  const [openPanel, setOpenPanel] = useState("taxIncomeData");

  function handleOpenPanel(panelIndex: string) {
    if (!panelIndex) return;
    setOpenPanel(panelIndex);
  }

  return (
    <div className="flex h-[calc(100vh-206px)] w-full flex-1 flex-col overflow-y-auto">
      {dataArray.length > 0 ? (
        <div className="mx-auto max-w-sm space-y-2 bg-white p-4">
          <Accordion
            type="single"
            collapsible
            value={openPanel}
            onValueChange={(v) => handleOpenPanel(v)}
          >
            {dataArray.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.panelName}
                className="mb-3 overflow-hidden rounded-lg border bg-[#FAFAFA] p-4"
              >
                <AccordionTrigger className="mb-4 h-6" showIcon={false}>
                  <AcHeader
                    open={openPanel === item.panelName}
                    name={item.title}
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
                        onSuccess={() => updateData()}
                      />
                    ))}
                  </div>
                </AccordionContent>
                {openPanel !== item.panelName && (
                  <AcFooter
                    walletCount={item.data?.length}
                    totalAmount={item.total}
                  />
                )}
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
};

export default MobileBalances;

function AcHeader({ open, name }: { open: boolean; name: string }) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex flex-1 justify-start">{name}</div>
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

function AcFooter({
  walletCount,
  totalAmount,
}: {
  walletCount: number;
  totalAmount: number;
}) {
  const mbt = useTranslations("page-MyBalance");

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="mb-2 flex w-full items-center justify-between ">
        <div className="text-gray">{mbt("cap-WalletCount")}</div>
        <div className="text-black">{walletCount}</div>
      </div>
      <div className="mb-2 flex w-full items-center justify-between ">
        <div className="text-gray">{mbt("cap-TotalAmount")}</div>
        <div className="text-black">{formatNum(totalAmount)}</div>
      </div>
    </div>
  );
}
