import { useMemo } from "react";

export function useTimeZone() {
  const value = Math.round((new Date().getTimezoneOffset() * -1) / 60);

  const text = useMemo(() => {
    const temp = value >= 0 ? `+${value}` : value;
    return `UTC${temp}`;
  }, [value]);

  const tz = {
    value,
    text,
  };

  const tzList = (() => {
    const arr = [];
    for (let i = 13; i >= -12; i--) {
      const temp = i >= 0 ? `+${i}` : `-${-1 * i}`;
      arr.push({
        text: `UTC${temp}`,
        value: i,
      });
    }
    return arr;
  })();

  return {
    tz,
    tzList,
  };
}
