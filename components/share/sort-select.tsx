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
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/common";

export type ISortField = "Created" | "Price" | "Collateral";
export type ISortDir = "Ascending" | "Descending";

export function SortSelect({
  sortField,
  sortDir,
  handleSortFieldChange,
  handleSortDirChange,
}: {
  sortField: ISortField;
  sortDir: ISortDir;
  handleSortFieldChange: (_s: ISortField) => void;
  handleSortDirChange: (_s: ISortDir) => void;
}) {
  const t = useTranslations("sl-OrderSort");
  const [popOpen, setPopOpen] = useState(false);

  function handleSortDirClick(field: ISortField, dir: ISortDir) {
    handleSortFieldChange(field);
    handleSortDirChange(dir);
    setPopOpen(false);
  }

  return (
    <DropdownMenu open={popOpen} onOpenChange={setPopOpen}>
      <DropdownMenuTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded bg-[#222428] px-[10px] py-[5px] outline-none"
        >
          <Image src="/icons/sort.svg" width={20} height={20} alt="type icon" />
          <div className="overflow-hidden text-clip whitespace-nowrap text-xs leading-[18px] text-title-white">{`${t(
            "sl-" + sortField,
          )}:${t("sl-" + sortDir)}`}</div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow"
            className="data-[open=true]:rotate-180"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[158px] border border-border-black bg-bg-black p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <SortOptions
          field="Created"
          sortField={sortField}
          sortDir={sortDir}
          onSortDirChange={handleSortDirClick}
          alignOffset={-5}
        />
        <SortOptions
          field="Price"
          sortField={sortField}
          sortDir={sortDir}
          onSortDirChange={handleSortDirClick}
          alignOffset={-40}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortOptions({
  field,
  sortField,
  sortDir,
  onSortDirChange,
  alignOffset = -5,
}: {
  field: ISortField;
  sortField: ISortField;
  sortDir: ISortDir;
  onSortDirChange: (_field: ISortField, _dir: ISortDir) => void;
  alignOffset?: number;
}) {
  const t = useTranslations("sl-OrderSort");
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        data-checked={sortField === field}
        className="flex h-9 cursor-pointer items-center rounded px-4 text-xs leading-[18px] text-gray hover:text-main data-[checked=true]:text-main"
      >
        {t("sl-" + field)}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          sideOffset={6}
          alignOffset={alignOffset}
          className="w-[88px] border-border-black bg-bg-black p-1 sm:w-[158px]"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
        >
          <DropdownMenuItem
            data-active={sortField === field && sortDir === "Ascending"}
            className="h-9 cursor-pointer py-[3px] text-txt-white hover:text-main data-[active=true]:text-main"
          >
            <SortUpDown
              active={sortField === field && sortDir === "Ascending"}
              onClick={() => onSortDirChange(field, "Ascending")}
              isDown={false}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            data-active={sortField === field && sortDir === "Descending"}
            className="h-9 cursor-pointer py-[3px] text-txt-white hover:text-main data-[active=true]:text-main"
          >
            <SortUpDown
              active={sortField === field && sortDir === "Descending"}
              onClick={() => onSortDirChange(field, "Descending")}
              isDown={true}
            />
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SortUpDown({
  onClick,
  active,
  isDown,
}: {
  onClick: () => void;
  active: boolean;
  isDown: boolean;
}) {
  const t = useTranslations("sl-OrderSort");
  const local = useLocale();
  const isEn = local === "en";

  const [isHover, setIsHover] = useState(false);
  const isActive = active || isHover;

  return (
    <div
      className={cn("flex items-center space-x-1", isActive ? "text-main" : "")}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={isActive ? "/icons/sort-up-hover.svg" : "/icons/sort-up.svg"}
        width={20}
        height={20}
        alt="up"
        className={cn(isDown ? "rotate-180" : "")}
      />
      <span className="text-xs leading-[18px]">
        {isEn ? "Sort " : ""}
        {isDown ? t("sl-Descending") : t("sl-Ascending")}
      </span>
    </div>
  );
}
