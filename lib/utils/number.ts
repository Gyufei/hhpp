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

export function addThousandsSep(num: NumberType) {
  if (num == undefined) return "";

  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
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

export function bigIntOrNpMinus(a: NumberType, b: NumberType) {
  if (NP.digitLength(a) && NP.digitLength(b)) {
    return NP.minus(a, b);
  } else {
    return (BigInt(a) - BigInt(b)).toString();
  }
}

// length: 6
// "123.45"       // "123.450000"
// "123.456789"   // "123.456789"
// "123"          // "123.000000"
// "123.4567891"  // "123.456789"
export function formatDecimal(numStr: string, length: number = 6): string {
  // 检查输入是否为有效的数字字符串
  if (!/^-?\d+(\.\d+)?$/.test(numStr)) {
    throw new Error("Invalid number string");
  }

  // 分离整数和小数部分
  const [integerPart, decimalPart = ""] = numStr.split(".");

  // 根据需求处理小数部分
  const formattedDecimal =
    decimalPart.length < length
      ? decimalPart + "0".repeat(length - decimalPart.length)
      : decimalPart.slice(0, length);

  // 组合整数和处理后的小数部分
  return `${integerPart}.${formattedDecimal}`;
}
