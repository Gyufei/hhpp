import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import { ISortDir, ISortField } from "@/components/share/sort-select";
import { IHolding } from "@/lib/types/holding";

export function useSortHolding(holdings: Array<IHolding>) {
  const [sortField, setSortField] = useState<ISortField>("Created");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  const sortOffers = useMemo(() => {
    if (!sortField) return holdings;

    let sortArr = holdings;
    if (sortField === "Collateral") {
      const collateralFunc = (hd: IHolding) => {
        const amount = hd.entries.reduce((acc, entry) => {
          return acc + entry.item_amount;
        }, 0);
        return amount;
      };
      sortArr = sortBy<any>(holdings, [collateralFunc]);
    }

    if (sortField === "Price") {
      const priceFunc = (hd: IHolding) => {
        return hd?.offer?.price;
      };
      sortArr = sortBy<any>(holdings, [priceFunc]);
    }

    if (sortField === "Created") {
      const createdFunc = (off: IHolding) => {
        return new Date(off?.create_at).getTime();
      };

      sortArr = sortBy<any>(holdings, [createdFunc]);
    }

    if (sortDir === "Descending") {
      return sortArr.reverse();
    } else {
      return sortArr;
    }
  }, [holdings, sortField, sortDir]);

  return {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOffers,
  };
}
