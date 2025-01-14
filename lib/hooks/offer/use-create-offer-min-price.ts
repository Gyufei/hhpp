export function useCreateOfferMinPrice() {
  function checkMinPrice(price: number | string, minPrice: number) {
    if (Number(price) < Number(minPrice * 0.8)) {
      return "Too small price shift";
    }
    return "";
  }

  function checkMaxPrice(price: number | string, minPrice: number) {
    if (Number(price) > Number(minPrice * 1.2)) {
      return "Too big price shift";
    }
    return "";
  }

  return {
    checkMinPrice,
    checkMaxPrice,
  };
}
