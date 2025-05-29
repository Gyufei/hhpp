import { ISortDir, ISortField } from "@/components/share/sort-select";
import { IDirection } from "@/components/share/direction-select";
import { IOffer } from "@/lib/types/offer";
import { sortBy } from "lodash";
import { useMemo, useState } from "react";

export function useSortOffer(offers: Array<any>) {
  const [sortField, setSortField] = useState<ISortField>("Created");
  const [sortDir, setSortDir] = useState<ISortDir>("Descending");
  const [direction, setDirection] = useState<IDirection>("CALL");

  function handleSortFieldChange(field: ISortField) {
    setSortField(field);
  }

  function handleSortDirChange(dir: ISortDir) {
    setSortDir(dir);
  }

  function handleDirectionChange(dir: IDirection) {
    setDirection(dir);
  }

  const sortOffers = useMemo(() => {
    if (!sortField) return offers;

    // 先按Direction筛选
    let filteredOffers = offers;

    if (direction === "CALL") {
      filteredOffers = offers.filter(
        (offer) =>
          offer.marketplace.strike_price > offer.marketplace.token.price,
      );
    } else {
      filteredOffers = offers.filter(
        (offer) =>
          offer.marketplace.strike_price <= offer.marketplace.token.price,
      );
    }

    // 然后按字段排序
    let sortArr = filteredOffers;
    if (sortField === "Collateral") {
      const collateralFunc = (order: IOffer) => {
        return order.shares;
      };
      sortArr = sortBy(filteredOffers, [collateralFunc]);
    }

    if (sortField === "Price") {
      const priceFunc = (order: IOffer) => {
        const price = order.marketplace.strike_price;
        return price;
      };
      sortArr = sortBy(filteredOffers, [priceFunc]);
    }

    if (sortField === "Created") {
      const createdFunc = (off: IOffer) => {
        return new Date(off.create_at).getTime();
      };

      sortArr = sortBy(filteredOffers, [createdFunc]);
    }

    if (sortDir === "Descending") {
      return sortArr.reverse();
    } else {
      return sortArr;
    }
  }, [offers, sortField, sortDir, direction]);

  return {
    sortField,
    sortDir,
    direction,
    handleSortFieldChange,
    handleSortDirChange,
    handleDirectionChange,
    sortOffers,
  };
}
