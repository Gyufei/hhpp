import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTranslations } from "next-intl";

type IFilterType = "Type" | "Status";
const FilterTypes: Array<IFilterType> = ["Type", "Status"];
export type IRole = "All" | "Maker" | "Taker";
export const Roles: Array<IRole> = ["All", "Maker", "Taker"];
export type IStatus = "All" | "Virgin" | "Ongoing" | "Canceled" | "Finished";
export const Status: Array<IStatus> = [
  "All",
  "Virgin",
  "Ongoing",
  "Canceled",
  "Finished",
];

export function FilterSelect({
  role,
  setRole,
  status,
  setStatus,
}: {
  role: IRole;
  setRole: (t: IRole) => void;
  status: IStatus;
  setStatus: (t: IStatus) => void;
}) {
  const T = useTranslations("page-MyOrders");
  const [popOpen, setPopOpen] = useState(false);

  const [checkFilterType, setCheckFilterType] = useState<IFilterType>(
    FilterTypes[0],
  );

  function handleRoleClick(role: IRole) {
    setRole(role);
    setPopOpen(false);
  }

  function handleStatusClick(status: IStatus) {
    setStatus(status);
    setPopOpen(false);
  }

  return (
    <DropdownMenu open={popOpen} onOpenChange={setPopOpen}>
      <DropdownMenuTrigger asChild>
        <div
          data-open={popOpen}
          className="flex h-8 w-8 cursor-pointer items-center justify-center space-x-1 rounded-full border border-[#D3D4D6] outline-none"
        >
          <Image
            src="/icons/filter.svg"
            width={20}
            height={20}
            alt="type icon"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[158px] border-0 bg-white p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            data-checked={checkFilterType === "Type"}
            className="flex h-9 cursor-pointer items-center rounded-xl px-4 text-xs leading-[18px] text-black data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => setCheckFilterType(FilterTypes[0])}
          >
            {T("sl-Type")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={6}
              className="w-[158px] border-0 bg-white p-1"
              style={{
                boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
              }}
            >
              {Roles.map((r) => (
                <DropdownMenuItem
                  key={r}
                  data-active={role === r}
                  className="h-9 cursor-pointer py-[3px] data-[active=true]:bg-[#FAFAFA]"
                  onClick={() => handleRoleClick(r)}
                >
                  <div className="text-xs leading-[18px]">{r}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            data-checked={checkFilterType === "Status"}
            className="flex h-9 cursor-pointer items-center rounded-xl px-4 text-xs leading-[18px] text-black data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => setCheckFilterType(FilterTypes[1])}
          >
            {T("sl-Status")}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={6}
              className="w-[158px] border-0 bg-white p-1"
              style={{
                boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
              }}
            >
              {Status.map((s) => (
                <DropdownMenuItem
                  key={s}
                  data-active={status === s}
                  className="h-9 cursor-pointer py-[3px] data-[active=true]:bg-[#FAFAFA]"
                  onClick={() => handleStatusClick(s)}
                >
                  <div className="text-xs leading-[18px]">{s}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
