"use client";
import { useState } from "react";
import {
  IOfferType,
  OfferTypeSelect,
} from "@/components/share/offer-type-select";
import { OrderTable } from "./order-table";
import { FilterSelect, IRole, IStatus, Roles, Status } from "./filter-select";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { NetworkSelect } from "@/components/share/network-select";
import { useSearchParams } from "next/navigation";

export default function MyOrders() {
  const T = useTranslations("page-MyOrders");
  const [orderTypes, setOrderTypes] = useState<Array<IOfferType>>(["sell"]);
  const [status, setStatus] = useState<IStatus>(Status[0]);
  const [role, setRole] = useState<IRole>(Roles[0]);
  const chain: any = useSearchParams().get("chain");
  const [selectedChain, setSelectedChain] = useState<ChainType>(
    chain || ChainType.BNB,
  );

  function handleTypeChange(t: Array<IOfferType>) {
    setOrderTypes(t);
  }

  function handleRoleChange(r: IRole) {
    setRole(r);
  }

  function handleStatusChange(s: IStatus) {
    setStatus(s);
  }

  function handleChainChange(chain: ChainType) {
    setSelectedChain(chain);
  }

  return (
    <div className="box-content flex h-[calc(100vh-156px)] w-full flex-1 flex-col sm:ml-5 sm:h-[calc(100vh-96px)] sm:px-0">
      <div className="mb-[10px] mt-4 flex w-full items-center justify-between pl-2 sm:mb-0 sm:mt-0 sm:pl-0">
        <div className="hidden items-center space-x-5 sm:flex">
          <div className="text-xl leading-[30px] text-black">
            {T("cap-MyOrders")}
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-6">
          <NetworkSelect
            selectedChain={selectedChain}
            handleChainChange={handleChainChange}
          />
          <OfferTypeSelect
            types={orderTypes}
            handleTypeChange={handleTypeChange}
          />
          <FilterSelect
            role={role}
            status={status}
            setRole={handleRoleChange}
            setStatus={handleStatusChange}
          />
        </div>
      </div>
      <div className="flex max-w-[100vw] flex-1 flex-col overflow-x-scroll px-4 sm:max-w-none sm:overflow-x-hidden sm:px-0">
        <div className="max-h-auto relative min-h-[296px] w-[820px] flex-1 flex-col overflow-y-hidden sm:w-full sm:min-w-0">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
            <OrderTable
              chain={selectedChain}
              types={orderTypes}
              status={status}
              role={role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
