import NP from "number-precision";

type NumberType = string | number;

export function formatNum(num: NumberType, decimal = 2, unit = false): string {
  if (num == null) return num as any;

  if (typeof num === "string") {
    if (Number.isNaN(Number.parseFloat(num))) return num;
    if (num === "0.0") return num;

    num = Number.parseFloat(num);
  }

  if (typeof num !== "number") return num;

  if (num === 0) return "0";

  if (unit) {
    const unitResult = getFormatUnit(num);
    const result =
      addThousandsSep(dealDecimals(unitResult.number, decimal)) +
      unitResult.unit;
    return result;
  } else {
    const result = addThousandsSep(dealDecimals(num, decimal));
    return result;
  }
}

/*
 * 1.2345678 => 1.2345
 * 1234.567 => 1,234.56
 * 0.0000001234567 => 0.0{6}1234
 */
export function formatPlainNum(price: NumberType) {
  if (!price) return price;

  if (typeof price === "string") {
    price = Number(price);
  }

  if (typeof price === "number") {
    if (price >= 100) {
      return addThousandsSep(dealDecimals(price, 2));
    }

    if (price >= 1) {
      return dealDecimals(price, 4);
    }

    if (price > 0) {
      return replaceZero(price);
    }
  }

  return price;
}

export function addThousandsSep(num: NumberType) {
  if (num == undefined) return "";

  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// 金额规则
export function toAmount(num: NumberType, unit = true) {
  if (typeof num === "string") {
    if (Number.isNaN(Number.parseFloat(num))) return num;
    num = Number.parseFloat(num);
  }
  if (typeof num !== "number") return num;

  if (num === 0) return 0;

  const target = Math.abs(num);

  if (target >= 0.01) {
    return formatNum(num, 2, unit);
  }

  if (target >= 0.0001 && target < 0.01) {
    return formatNum(num, 3);
  }

  if (target < 0.0001) {
    return 0;
  }

  return num;
}

export function toPercent(percent: number) {
  percent = Math.abs(percent);
  if (percent * 1 === 0) return "0";
  if (percent * 1 < 0.01) return "< 0.01";
  return formatNum(percent * 1);
}

// 将科学记数法转化正常计数
export function toNonExponential(num: number | string) {
  if (typeof num === "string") {
    if (Number.isNaN(Number.parseFloat(num))) return num;
    if (!num.includes("e")) return num;
    num = Number.parseFloat(num);
  }
  if (typeof num !== "number") return num;
  if (!String(num).includes("e")) return String(num);

  const strParam: any = String(num);
  const index = Number(strParam.match(/\d+$/)[0]);
  const basis = strParam.match(/^[\d.]+/)[0].replace(/\./, "");
  if (/e-/.test(strParam)) {
    return basis.padStart(index + basis.length, 0).replace(/^0/, "0.");
  } else {
    return basis.padEnd(index + 1, 0);
  }
}

export function toQuantity(amount: NumberType, price = 1) {
  if (!Number(amount)) return 0;

  try {
    if (Number(price) < 0.1) {
      return formatNum(amount, 0);
    } else {
      const target = NP.divide(1, Number(price));
      const precision = getAccuracy(target, 0);
      return formatNum(amount, precision);
    }
  } catch (error) {
    console.error("toQuantity", error);
  }
}

/*
 * 1456 => 2
 * 0.00012 => 7
 */
function getAccuracy(num: NumberType, length = 3) {
  if (Number(num) === 0) return 0;
  if (Number(num) >= 1) return 2;

  try {
    num = String(toNonExponential(num));
    const target = num.split(".")[1];
    let index = target.search(/[1-9]/);
    index = index + length + 1;

    return index;
  } catch (error) {
    console.error(error, num, "length");
    return 0;
  }
}

/*
 * (0.1234567, 4) => 0.1234
 */
export function dealDecimals(num: NumberType, decimals: NumberType) {
  const notExpNum = toNonExponential(num);
  const isDealPoint = notExpNum.split(".");

  if (isDealPoint?.length === 2) {
    const integer = isDealPoint[0];
    const point = isDealPoint[1];

    if (integer > 0) {
      return notExpNum.substring(0, integer.length + decimals + 1);
    }

    if (point?.length) {
      const match = point.match(/^0+/);
      const firstNotZero = (match ? match[0].length : 0) + 1;
      const len = firstNotZero > Number(decimals) ? firstNotZero : decimals;
      const subDecimalsNum = len ? Number(len) + 1 : 0;
      const maxLength = integer.length + subDecimalsNum;
      const fixNum = notExpNum.substring(0, maxLength);
      return fixNum;
    }
  }

  return notExpNum;
}

/*
 * 0.0000001234567 => 0.0{6}1234
 */
export function replaceZero(price: NumberType) {
  if (!price) return price;

  const number = toNonExponential(price);
  const isDealPoint = number.split(".");

  if (isDealPoint?.length === 2) {
    const index = isDealPoint[1].search(/[1-9]/);
    const head = `${isDealPoint[0]}.0{${index}}`;
    if (index === 0) {
      const noZeroHead = `${isDealPoint[0]}.`;
      return noZeroHead + isDealPoint[1].substring(index, index + 4);
    }
    const result = head + isDealPoint[1].substring(index, index + 4);
    return result;
  }
  return number;
}

/*
 * 10000 => { number: 10, unit: 'k', pow: 1000 }
 */
export function getFormatUnit(num: NumberType): {
  number: number;
  unit: string;
  pow: number;
} {
  let result = +num;

  const units = ["", "K", "M", "B", "T"];
  let unitIndex: number;
  if (Number(num) < 10 ** 4) {
    //nothing
    unitIndex = 0;
  } else if (Number(num) < 10 ** 7) {
    //K
    unitIndex = 1;
  } else if (Number(num) < 10 ** 10) {
    //M
    unitIndex = 2;
  } else if (Number(num) < 10 ** 13) {
    //B
    unitIndex = 3;
  } else {
    //T
    unitIndex = 4;
  }

  const powNum = Math.pow(1000, unitIndex);
  result = NP.divide(result, powNum);

  return {
    number: result,
    unit: units[unitIndex],
    pow: powNum,
  };
}

/*
 * 0.1230000 => 0.123
 */
export function trimZeroOfMantissa(num: NumberType) {
  const numStr = `${num}`;
  if (numStr === "0") return numStr;

  return numStr.replace(/\.?0*$/, "");
}

export function truncateNumber(num: number | string, n: number) {
  const multiplier = 10 ** n; // 计算 10 的 n 次方
  const multipliedNum = Number(num) * multiplier; // 将数字扩大对应倍数
  const truncatedNum = Math.trunc(multipliedNum); // 截断小数部分，保留整数部分
  return truncatedNum;
}

export function bigIntOrNpMinus(a: NumberType, b: NumberType) {
  if (NP.digitLength(a) && NP.digitLength(b)) {
    return NP.minus(a, b);
  } else {
    return (BigInt(a) - BigInt(b)).toString();
  }
}

export function formatLeadingZeros(num: number, decimalPlaces: number): string {
  const threshold = Math.pow(10, -decimalPlaces);
  if (Math.abs(num) < threshold) {
    return `< ${threshold}`;
  }
  return parseFloat(num.toFixed(decimalPlaces)).toString();
}
