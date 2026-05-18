import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Instrument_Serif, Figtree } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const figtree = Figtree({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: {
    default: "CurrentPlate | Minimalist Recipe Blog",
    template: "%s | CurrentPlate",
  },
  description: "Discover minimalist, elegant, and easy-to-follow recipes for everyday cooking.",
  openGraph: {
    title: "CurrentPlate",
    description: "Discover minimalist, elegant, and easy-to-follow recipes for everyday cooking.",
    url: "https://currentplate.com",
    siteName: "CurrentPlate",
    images: [
      {
        url: "/images/currentplate-banner.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${figtree.variable} h-full`}
    >
      <head>
        {/* AdSense Script - Successfully updated with your client ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5151856074386100"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Pinterest Tag using Next.js Script */}
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2613026448211');
            pintrk('page');
          `}
        </Script>
        
        {/* The NoScript Image Fallback for Pinterest */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://ct.pinterest.com/v3/?event=init&tid=2613026448211&noscript=1"
          />
        </noscript>
      </head>
      <body className="flex flex-col min-h-full bg-base text-graphite font-figtree antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Header Ad Slot - Fixed height to prevent CLS, hidden on print */}
          <div className="ad-slot-header bg-base/50 border-b border-primary/10 print:hidden">
            {/* AdSense Header Ad Unit - Updated with your client ID */}
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "90px" }}
              data-ad-client="ca-pub-5151856074386100"
              data-ad-slot="header-slot-id"
              data-ad-format="horizontal"
            />
          </div>
          
          {/* Hide Header on Print */}
          <div className="print:hidden">
            <Header />
          </div>
          
          {children}
          
          {/* Hide Footer on Print */}
          <div className="print:hidden">
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}