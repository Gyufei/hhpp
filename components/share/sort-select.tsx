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

export type ISortField = "Created" | "Price" | "Collateral";
export type ISortDir = "Ascending" | "Descending";

export function SortSelect({
  sortField,
  sortDir,
  handleSortFieldChange,
  handleSortDirChange,
  showCollateral = false,
}: {
  sortField: ISortField;
  sortDir: ISortDir;
  handleSortFieldChange: (_s: ISortField) => void;
  handleSortDirChange: (_s: ISortDir) => void;
  showCollateral?: boolean;
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
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#949E9C] px-[16px] py-[5px] outline-none data-[open=true]:border-main data-[open=true]:bg-main"
        >
          <Image src="/icons/sort.svg" width={20} height={20} alt="type icon" />
          <div className="overflow-hidden text-clip whitespace-nowrap text-sm leading-5 text-txt-white">{`${t(
            "sl-" + sortField,
          )}:${t("sl-" + sortDir)}`}</div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down.svg"
            width={16}
            height={16}
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
        />
        <SortOptions
          field="Price"
          sortField={sortField}
          sortDir={sortDir}
          onSortDirChange={handleSortDirClick}
        />
        {showCollateral && (
          <SortOptions
            field="Collateral"
            sortField={sortField}
            sortDir={sortDir}
            onSortDirChange={handleSortDirClick}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortOptions({
  field,
  sortField,
  sortDir,
  onSortDirChange,
}: {
  field: ISortField;
  sortField: ISortField;
  sortDir: ISortDir;
  onSortDirChange: (_field: ISortField, _dir: ISortDir) => void;
}) {
  const t = useTranslations("sl-OrderSort");
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        data-checked={sortField === field}
        className="flex h-9 cursor-pointer items-center rounded-xl px-4 text-xs leading-[18px] text-txt-white data-[checked=true]:bg-bg-black"
      >
        {t("sl-" + field)}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          sideOffset={6}
          className="w-[88px] border-0 bg-bg-black p-1 sm:w-[158px]"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
        >
          <DropdownMenuItem
            data-active={sortField === field && sortDir === "Ascending"}
            className="h-9 cursor-pointer py-[3px] text-txt-white data-[active=true]:bg-bg-black"
          >
            <SortUp onClick={() => onSortDirChange(field, "Ascending")} />
          </DropdownMenuItem>
          <DropdownMenuItem
            data-active={sortField === field && sortDir === "Descending"}
            className="h-9 cursor-pointer py-[3px] text-txt-white data-[active=true]:bg-bg-black"
          >
            <SortDown onClick={() => onSortDirChange(field, "Descending")} />
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SortUp({ onClick }: { onClick: () => void }) {
  const t = useTranslations("sl-OrderSort");
  const local = useLocale();
  const isEn = local === "en";

  return (
    <div className="flex items-center space-x-1 " onClick={onClick}>
      <Image src="/icons/sort-up.svg" width={16} height={16} alt="up" />
      <span className="text-xs leading-[18px]">
        {isEn ? "Sort " : ""}
        {t("sl-Ascending")}
      </span>
    </div>
  );
}

function SortDown({ onClick }: { onClick: () => void }) {
  const t = useTranslations("sl-OrderSort");
  const local = useLocale();
  const isEn = local === "en";

  return (
    <div onClick={onClick} className="flex items-center space-x-1">
      <Image
        src="/icons/sort-up.svg"
        className="rotate-180"
        width={16}
        height={16}
        alt="up"
      />
      <span className="text-xs leading-[18px]">
        {isEn ? "Sort " : ""}
        {t("sl-Descending")}
      </span>
    </div>
  );
}
