import "@/app/globals.css";
import { VideoFont } from "@/app/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils/common";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import MainLayout from "@/app/[locale]/_page-layout/main-layout";
import "react-modern-drawer/dist/index.css";
import { isProduction } from "@/lib/PathMap";
import WalletModalProvider from "@/components/provider/wallet-modal-provider";
import { redirect } from "next/navigation";
import { locales } from "../../i18n";

export const metadata = {
  title: {
    template: "%s | Tadle Market",
    default: "Tadle Market",
  },
  description: "Decentralized Pre-market Infrastructure",
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: "Tadle Market",
    description: "Decentralized Pre-market Infrastructure",
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: "Tadle Market",
    images: "/img/GGzCP6QaAAAm9YG.png",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/img/favs/favicon-32x32.png" },
      { url: "/img/favs/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/img/shortcut-icon.png",
    apple: [
      { url: "/img/favs/apple-touch-icon.png" },
      {
        url: "/img/favs/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/img/favs/apple-touch-icon-precomposed.png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadle Market",
    description: "Decentralized Pre-market Infrastructure",
    creator: "@tadle_com",
    images: ["/img/GGzCP6QaAAAm9YG.png"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (locale && !locales.includes(locale as any)) {
    redirect("/en/not-found");
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn(VideoFont.variable)}>
        <JotaiProvider>
          <WalletModalProvider>
            <SWRConfigProvider>
              <NextIntlClientProvider messages={messages}>
                <MainLayout>{children}</MainLayout>
              </NextIntlClientProvider>
            </SWRConfigProvider>
          </WalletModalProvider>
        </JotaiProvider>
      </body>
      <GoogleAnalytics gaId={isProduction ? "G-FN03SV9KCF" : "G-1PQBDX806E"} />
      {/* <GoogleTagManager
        gtmId={isProduction ? "GTM-TPXPN9FF" : "GTM-MRM39HBK"}
      /> */}
    </html>
  );
}
