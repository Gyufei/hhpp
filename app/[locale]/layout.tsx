import "@/app/globals.css";
import { inter, SfPro } from "@/app/fonts";
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
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import GlobalProvider from "@/components/provider/global-provider";

export const metadata = {
  title: {
    template: "%s | HypeTrade",
    default: "HypeTrade",
  },
  description: "Seed Market for Hyperliquid",
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: "HypeTrade",
    description: "Seed Market for Hyperliquid",
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: "HypeTrade",
    images: "/img/1pi2tsX13qz1uu.png",
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
    title: "HypeTrade",
    description: "Seed Market for Hyperliquid",
    creator: "@HypeTradeXYZ",
    images: ["/img/1pi2tsX13qz1uu.png"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn(inter.className, SfPro.variable)}>
        <GlobalProvider>
          <JotaiProvider>
            <WalletModalProvider>
              <SWRConfigProvider>
                <NextIntlClientProvider messages={messages}>
                  <MainLayout>{children}</MainLayout>
                </NextIntlClientProvider>
              </SWRConfigProvider>
            </WalletModalProvider>
          </JotaiProvider>
        </GlobalProvider>
      </body>
      <GoogleAnalytics gaId={isProduction ? "G-FN03SV9KCF" : "G-1PQBDX806E"} />
    </html>
  );
}
