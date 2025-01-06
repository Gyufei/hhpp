import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const TeodorFont = localFont({
  src: [
    {
      path: "../public/fonts/Teodor-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Teodor-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Teodor-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Teodor-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-teodor",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Segoe UI",
    "Ubuntu",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
