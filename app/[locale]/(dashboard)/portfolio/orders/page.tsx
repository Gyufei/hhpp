"use client";
// import { useState } from "react";
// import {
//   IOfferType,
//   OfferTypeSelect,
// } from "@/components/share/offer-type-select";
import { OrderTable } from "./order-table";
import { Roles, Status } from "./filter-select";
// import { useTranslations } from "next-intl";

export default function MyOrders() {
  // const T = useTranslations("page-MyOrders");
  // const [orderTypes, setOrderTypes] = useState<Array<IOfferType>>(["sell"]);
  // const [status, setStatus] = useState<IStatus>(Status[0]);
  // const [role, setRole] = useState<IRole>(Roles[0]);

  // function handleTypeChange(t: Array<IOfferType>) {
  //   setOrderTypes(t);
  // }

  // function handleRoleChange(r: IRole) {
  //   setRole(r);
  // }

  // function handleStatusChange(s: IStatus) {
  //   setStatus(s);
  // }

  return (
    <div className="box-content flex h-[calc(100vh-156px)] w-full flex-1 flex-col  text-txt-white sm:h-[calc(100vh-96px)] sm:px-0">
      <div className="mb-[10px] mt-4 flex w-full items-center justify-between pl-2 sm:mb-0 sm:mt-0 sm:pl-0">
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* <OfferTypeSelect
            types={orderTypes}
            handleTypeChange={handleTypeChange}
          /> */}
          {/* <FilterSelect
            role={role}
            status={status}
            setRole={handleRoleChange}
            setStatus={handleStatusChange}
          /> */}
        </div>
      </div>
      <div className="flex max-w-[100vw] flex-1 flex-col overflow-x-scroll px-4 sm:max-w-none sm:overflow-x-hidden sm:px-0">
        <div className="max-h-auto relative min-h-[296px] w-[820px] flex-1 flex-col overflow-y-hidden sm:w-full sm:min-w-0">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col text-txt-white">
            <OrderTable types={[]} status={Status[0]} role={Roles[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
