import { IMarketplace } from "../types/marketplace";

export function getMarketUrlField(market: IMarketplace) {
  const token = market.token_name;
  const expiryDate = market.expiry_date;
  const strikePrice = market.strike_price;
  const str = covertExpiryDateToStr(expiryDate);

  return `${token}-${str}-${strikePrice}`;
}

export function parseMarketUrlField(field: string) {
  const [token, expiryDate, strikePrice] = field.split("-");
  const expiryDateStr = convertStrToExpiryDate(expiryDate);
  return { token, expiryDate: expiryDateStr, strikePrice };
}

function covertExpiryDateToStr(expiryDate: string) {
  if (expiryDate.length !== 8 || !/^\d{8}$/.test(expiryDate)) {
    throw new Error("Invalid input: Must be an 8-digit string (YYYYMMDD)");
  }

  // 提取年、月、日
  const year = expiryDate.slice(0, 4);
  const monthStr = expiryDate.slice(4, 6);
  const dayStr = expiryDate.slice(6, 8);

  // 验证月份
  const monthNumber = parseInt(monthStr);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    throw new Error("Invalid month value");
  }

  // 日去除前导零
  const day = parseInt(dayStr).toString(); // 如 "01" → "1"

  // 月转换为三位字母
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthAbbr = monthNames[monthNumber - 1];

  return `${day}${monthAbbr}${year.slice(2)}`;
}

function convertStrToExpiryDate(dateString: string): string {
  // 基础格式验证：日、月（3字母）、年（2位）
  if (!/^\d+[A-Z]{3}\d{2}$/i.test(dateString)) {
    throw new Error(
      "Invalid input: Must be in format D/MON/YYYY (e.g., 1JUL25)",
    );
  }

  // 提取日、月、年（允许日为1或2位）
  const parts = dateString.match(/(\d+)([A-Z]{3})(\d{2})/i);
  if (!parts || parts.length < 4) {
    throw new Error("Could not extract day/month/year from input");
  }

  const day = parts[1];
  const monthAbbr = parts[2].toUpperCase();
  const yearPart = parts[3];

  // 补全日为两位（补前导零）
  const normalizedDay = day.length === 1 ? `0${day}` : day;

  // 月字母转换为数字（如 "JUL" → "07"）
  const monthMap: { [key: string]: string } = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };
  const month = monthMap[monthAbbr];
  if (!month) {
    throw new Error("Invalid month abbreviation");
  }

  // 年份假设为20XX（如 "25" → "2025"）
  const fullYear = `20${yearPart}`;

  return `${fullYear}${month}${normalizedDay}`;
}
