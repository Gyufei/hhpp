import Image from "next/image";
import React from "react";
import usePagination from "./use-pagination";
import {
  IPagination,
  IPaginationProps,
  ButtonProps,
  PageButtonProps,
} from "./types";
import { cn } from "@/lib/utils/common";

export const PrevButton = ({ className, ...buttonProps }: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
  const previous = () => {
    if (pagination.currentPage + 1 > 1) {
      pagination.setCurrentPage(pagination.currentPage - 1);
    }
  };

  const disabled = pagination.currentPage === 0;

  return (
    <button
      {...buttonProps}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg bg-bg-black text-sm leading-5 text-lightgray data-[active=true]:bg-main data-[active=true]:text-txt-white",
        className,
      )}
      onClick={() => previous()}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onKeyDown={(event: React.KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter" && !disabled) {
          previous();
        }
      }}
    >
      <Image
        src="/icons/arrow-right-gray.svg"
        className="rotate-180"
        width={20}
        height={20}
        alt="arrow"
      />
    </button>
  );
};

export const NextButton = ({ className, ...buttonProps }: ButtonProps) => {
  const pagination = React.useContext(PaginationContext);
  const next = () => {
    if (pagination.currentPage + 1 < pagination.pages.length) {
      pagination.setCurrentPage(pagination.currentPage + 1);
    }
  };

  const disabled = pagination.currentPage === pagination.pages.length - 1;

  return (
    <button
      {...buttonProps}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg bg-bg-black text-sm leading-5 text-lightgray data-[active=true]:bg-main data-[active=true]:text-txt-white",
        className,
      )}
      onClick={() => next()}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onKeyDown={(event: React.KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter" && !disabled) {
          next();
        }
      }}
    >
      <Image
        src="/icons/arrow-right-gray.svg"
        width={20}
        height={20}
        alt="arrow"
      />
    </button>
  );
};

type ITruncableElementProps = {
  prev?: boolean;
};

const TruncableElement = ({ prev }: ITruncableElementProps) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const { isPreviousTruncable, isNextTruncable } = pagination;

  return (isPreviousTruncable && prev === true) ||
    (isNextTruncable && !prev) ? (
    <li>
      <a
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg bg-bg-black text-sm leading-5 text-lightgray data-[active=true]:bg-main data-[active=true]:text-txt-white",
        )}
      >
        ...
      </a>
    </li>
  ) : null;
};

export const PageButton = ({ className }: PageButtonProps) => {
  const pagination: IPagination = React.useContext(PaginationContext);

  const renderPageButton = (page: number) => (
    <li key={page}>
      <a
        tabIndex={0}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            pagination.setCurrentPage(page - 1);
          }
        }}
        onClick={() => pagination.setCurrentPage(page - 1)}
        data-active={pagination.currentPage + 1 === page}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-bg-black text-sm leading-5 text-lightgray data-[active=true]:bg-main data-[active=true]:text-txt-white",
          className,
        )}
      >
        {page}
      </a>
    </li>
  );

  return (
    <>
      {pagination.previousPages.map(renderPageButton)}
      <TruncableElement prev />
      {pagination.middlePages.map(renderPageButton)}
      <TruncableElement />
      {pagination.nextPages.map(renderPageButton)}
    </>
  );
};

const defaultState: IPagination = {
  currentPage: 0,
  setCurrentPage: () => {},
  pages: [],
  hasPreviousPage: false,
  hasNextPage: false,
  previousPages: [],
  isPreviousTruncable: false,
  middlePages: [],
  isNextTruncable: false,
  nextPages: [],
};

const PaginationContext: React.Context<IPagination> =
  React.createContext<IPagination>(defaultState);

export const Pagination = ({ ...paginationProps }: IPaginationProps) => {
  const pagination = usePagination(paginationProps);

  return (
    <PaginationContext.Provider value={pagination}>
      <div
        className={cn(
          "mx-auto mt-4 flex items-center justify-center",
          paginationProps.className,
        )}
      >
        {paginationProps.children}
      </div>
    </PaginationContext.Provider>
  );
};

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;
Pagination.PageButton = PageButton;
