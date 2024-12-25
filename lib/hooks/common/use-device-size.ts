import { useMediaQuery } from "./use-media-query";

export function useDeviceSize() {
  const isDesktopSize = useMediaQuery("(min-width: 640px)");
  const isMobileSize = !isDesktopSize;

  return {
    isDesktopSize,
    isMobileSize,
  };
}
