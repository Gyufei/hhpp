import { ISortDir, ISortField } from "@/components/share/sort-select";
import { IDirection } from "@/components/share/direction-select";
import { IOffer } from "@/lib/types/offer";
import { sortBy } from "lodash";
import { useMemo, useState } from "react";
import NP from "number-precision";

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

    if (direction !== "CALL" && direction !== "PUT") {
      const directionMap = {
        CALL: "buy",
        PUT: "sell",
      };
      filteredOffers = offers.filter(
        (offer) => offer.entry.direction === directionMap[direction],
      );
    }

    // 然后按字段排序
    let sortArr = filteredOffers;
    if (sortField === "Collateral") {
      const collateralFunc = (order: IOffer) => {
        return order.item_amount;
      };
      sortArr = sortBy(filteredOffers, [collateralFunc]);
    }

    if (sortField === "Price") {
      const priceFunc = (order: IOffer) => {
        // return order.price;

        const tokenPriceMap: any = {
          USDC: 1,
          USDT: 1,
          BNB: 614,
          ETH: 3125,
          SOL: 237,
        };
        const amount = NP.times(order.item_amount, order.price);
        const tokenTotalPrice = NP.times(
          amount,
          tokenPriceMap[order.payment_token] || 1,
        );
        const pointPerPrice = NP.divide(tokenTotalPrice, order.item_amount);
        return pointPerPrice;
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
