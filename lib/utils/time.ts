import { format, isSameDay, isSameYear } from "date-fns";

export function formatTimestamp(timestamp: string | number) {
  const isCurrentDay = isSameDay(new Date(), Number(timestamp));
  const isCurrentYear = isSameYear(new Date(), Number(timestamp));

  let formattedDate = "";
  if (isCurrentDay) {
    formattedDate = format(Number(timestamp), 'HH:mm')
  } else if (isCurrentYear) {
    formattedDate = format(Number(timestamp), 'HH:mm MMM dd')
  } else {
    formattedDate = format(Number(timestamp), 'HH:mm MMM dd yyyy')
  }

  return formattedDate;
}

export function formatTimeDuration(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) {
    return '';
  }
  const secs = Math.floor(seconds % 60);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const month = Math.floor(days / 30);

  if (month > 0) {
    return `${month}M`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${secs}s`;
  }
}

export function formatTimeObj(secs: number) {
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedTime = {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: secs % 60,
  };

  return formattedTime;
}

export function formatTimestampEn(timestamp: number) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const date = new Date(timestamp);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

export function convertUTCToLocalStamp(utcDateString: string) {
  const utcDate = new Date(utcDateString);

  const timezoneOffset = utcDate.getTimezoneOffset();

  const localTimestamp = utcDate.getTime() - timezoneOffset * 60000;

  const localDate = localTimestamp;

  return localDate;
}

export function convertUTCToLocalString(utcDateString: string) {
  const localDate = convertUTCToLocalStamp(utcDateString);
  return format(new Date(localDate), 'yyyy-MM-dd HH:mm:ss');
}
