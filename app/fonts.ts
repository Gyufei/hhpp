import { Inter } from 'next/font/google'
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const VideoFont = localFont({
  src: [
    {
      path: "../public/fonts/Video.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Video-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Video-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-video",
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
