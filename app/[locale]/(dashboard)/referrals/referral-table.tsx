import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NP from "number-precision";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import useOnclickOutside from "react-cool-onclickoutside";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HoverIcon from "@/components/share/hover-icon";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/c-tooltip-arrow";
import { Input } from "@/components/ui/input";
import { formatNum } from "@/lib/utils/number";
import { IReferralItem } from "@/lib/hooks/api/use-referral-data";
import toast from "react-hot-toast";

import { ReferralDrawer } from "./referral-drawer";
import {
  useReferralDelete,
  useReferralDefault,
  useReferralNoteChange,
} from "@/lib/hooks/api/use-referral";

export function ReferralTable({
  referralData,
  refresh,
}: {
  referralData?: IReferralItem[] | null;
  refresh: () => void;
}) {
  const T = useTranslations("page-Referral");

  const data = useMemo(() => {
    return {
      nodes: referralData || [],
    };
  }, [referralData]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 170px repeat(7,minmax(0,1fr));
      grid-template-rows: repeat(auto-fit, 40px);
      grid-auto-rows: 40px;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 12px;
      line-height: 18px;
      background: #111a1e;
    `,
    HeaderRow: `
    `,
    Row: `
      &:hover {
        background: #222428;
      }
    `,
    BaseCell: `
      text-align: left;

      &:first-of-type {
        padding-left: 10px;
      }
      
      &:last-of-type {
        text-align: right;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #949e9c;
      line-height: 18px;
    `,
    Cell: `
      color: #F6FEFD;
    `,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<IReferralItem | null>(null);
  const [hoverRowId, setHoverRowId] = useState<string | null>(null);

  function openEditDrawer(item: IReferralItem) {
    setDrawerData(item);
    setDrawerOpen(true);
  }

  if (!data.nodes.length) {
    return (
      <div className="flex w-screen flex-1 items-center justify-center pt-20 text-base text-gray sm:w-full">
        {T("txt-YourReferralLinkAppearHere")}
      </div>
    );
  }

  return (
    <>
      <Table data={data} theme={theme} className="no-scroll-bar flex-1">
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="border-none">
                <HeaderCell className="px-1 py-[11px]">
                  {T("ReferralCode")}
                </HeaderCell>
                <HeaderCell className="px-1 py-[11px]">
                  {T("SignedUp")}
                </HeaderCell>
                <HeaderCell className="px-1 py-[11px]">
                  {T("TradingUsers")}
                </HeaderCell>
                <HeaderCell className="px-1 py-[11px]">
                  {T("TradingVol")}
                </HeaderCell>
                <HeaderCell className="px-1 py-[11px]">{T("Views")}</HeaderCell>
                <HeaderCell className="px-1 py-[11px]">
                  {T("CommissionRates")}
                </HeaderCell>
                <HeaderCell className="px-1 py-[11px]">{T("Note")}</HeaderCell>
                <HeaderCell className="px-1 py-[11px]">{T("Op")}</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((rD: IReferralItem, index: number) => (
                <Row
                  key={rD.id}
                  item={rD}
                  className="border-none"
                  onMouseEnter={() => setHoverRowId(rD.id)}
                  onMouseLeave={() => setHoverRowId(null)}
                >
                  <Cell className="px-1 py-[11px] align-top">
                    <ReferralCode rD={rD} index={index} />
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <div className="">{rD.referral_users}</div>
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <div className="">{rD.trading_users}</div>
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <div className="">
                      ${formatNum(NP.times(rD.trading_fee, 50), 6)}
                    </div>
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <div className="">{rD.unique_views}</div>
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <ReferralRate
                      rD={rD}
                      onClick={() => openEditDrawer(rD)}
                      isHover={hoverRowId === rD.id}
                    />
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <ReferralNote rD={rD} onSuccess={refresh} />
                  </Cell>
                  <Cell className="px-1 py-[11px] align-top">
                    <OpBtn rD={rD} onSuccess={refresh} />
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      <ReferralDrawer
        referral={drawerData}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onSuccess={() => refresh()}
      />
    </>
  );
}

function ReferralCode({ rD, index }: { rD: IReferralItem; index: number }) {
  const [isHover, setIsHover] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rD.referral_code);

    toast.success("Copied to clipboard");
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative flex h-fit w-fit cursor-pointer items-center space-x-2"
    >
      <span className="mr-[2px] ">#{index + 1}</span>
      <span>{rD.referral_code}</span>
      {isHover && (
        <HoverIcon
          onClick={handleCopy}
          src="/icons/copy-gray.svg"
          hoverSrc="/icons/white-copy.svg"
          width={20}
          height={20}
          alt="copy"
          className="mr-3"
        />
      )}
    </div>
  );
}

function ReferralRate({
  rD,
  onClick,
  isHover,
}: {
  rD: IReferralItem;
  onClick: () => void;
  isHover: boolean;
}) {
  return (
    <div className="relative flex h-fit w-fit cursor-pointer items-center space-x-[6px]">
      <span className="border-lightgray border-b border-dashed">
        {rD.referrer_rate != "" && rD.referrer_rate != null && (
          <>{formatNum(Number(rD.referrer_rate || 0) / 10 ** 4)}%,&nbsp;</>
        )}
        {rD.authority_rate != "" && rD.authority_rate != null && (
          <>{formatNum(Number(rD.authority_rate || 0) / 10 ** 4)}%</>
        )}
      </span>
      {isHover && (
        <HoverIcon
          onClick={onClick}
          src="/icons/set-up-gray.svg"
          hoverSrc="/icons/set-up.svg"
          width={20}
          height={20}
          alt="copy"
          className="mr-3"
        />
      )}
    </div>
  );
}

function ReferralNote({
  rD,
  onSuccess,
}: {
  rD: IReferralItem;
  onSuccess: () => void;
}) {
  const T = useTranslations("page-Referral");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(rD.notes);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setInputValue(rD.notes);
  }, [rD]);

  const { trigger: updateNoteAction, data: updateRes } =
    useReferralNoteChange();

  useEffect(() => {
    if (updateRes) {
      onSuccess();
    }
  }, [updateRes, onSuccess]);

  const outSideRef = useOnclickOutside(() => {
    if (isEdit) {
      handleInputConfirm();
    }
  });

  function handleEditNote() {
    setIsEdit(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 500);
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      handleInputConfirm();
    }
  }

  function handleInputConfirm() {
    setIsEdit(false);

    updateNoteAction({
      referral_code: rD.referral_code,
      notes: inputValue,
    });
  }

  return (
    <div
      className="relative flex h-fit w-fit items-center justify-start"
      onClick={handleEditNote}
    >
      {isEdit ? (
        <div ref={outSideRef}>
          <Input
            ref={inputRef}
            placeholder={T("Note")}
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border-lightgray h-6 rounded-none border-x-0 border-b border-t-0 bg-bg-black px-[10px] py-0 text-xs text-title-white  placeholder:text-gray"
          />
          <Image
            onClick={handleInputConfirm}
            src={"/icons/enter.svg"}
            width={24}
            height={24}
            alt="link"
            className="absolute right-0 top-0 cursor-pointer"
          />
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-start">
                <div className="mr-[6px] w-fit truncate text-right ">
                  {inputValue}
                </div>
                <HoverIcon
                  src="/icons/edit-note-gray.svg"
                  hoverSrc="/icons/edit-note.svg"
                  width={20}
                  height={20}
                  alt="note"
                />
              </div>
            </TooltipTrigger>
            {rD.notes && (
              <TooltipContent className="w-auto object-contain">
                <p className="text-xs leading-[18px]">{rD.notes}</p>
                <TooltipArrow asChild>
                  <CTooltipArrow />
                </TooltipArrow>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

function OpBtn({
  rD,
  onSuccess,
}: {
  rD: IReferralItem;
  onSuccess: () => void;
}) {
  const { trigger: setDefaultAction, data: setDefaultRes } =
    useReferralDefault();
  const { trigger: deleteAction, data: isSuccess } = useReferralDelete();

  useEffect(() => {
    if (setDefaultRes) {
      onSuccess();
    }
  }, [setDefaultRes]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  function handleFlag() {
    setDefaultAction({
      referral_code: rD.referral_code,
    });
  }

  function handleDelete() {
    if (rD.flag === "1") return;

    deleteAction({
      referral_code: rD.referral_code,
    });
  }

  return (
    <div className="flex items-center justify-end space-x-3">
      {rD.flag === "1" ? (
        <Image
          onClick={handleFlag}
          src="/icons/flag-main.svg"
          width={20}
          height={20}
          alt="copy"
        />
      ) : (
        <HoverIcon
          onClick={handleFlag}
          src="/icons/flag-gray.svg"
          hoverSrc="/icons/flag.svg"
          width={20}
          height={20}
          alt="copy"
        />
      )}
      {rD.flag !== "1" && (
        <HoverIcon
          onClick={handleDelete}
          src="/icons/delete-gray.svg"
          hoverSrc="/icons/red-delete.svg"
          width={20}
          height={20}
          alt="copy"
        />
      )}
    </div>
  );
}
