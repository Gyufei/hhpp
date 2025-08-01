import { useEffect, useState } from "react";

export function useDeviceSize() {
  const isDesktopSize = useMediaQuery("(min-width: 640px)");
  const isMobileSize = !isDesktopSize;

  return {
    isDesktopSize,
    isMobileSize,
  };
}

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
