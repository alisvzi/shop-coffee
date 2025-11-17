import type { Metadata } from "next";
import localFont from "next/font/local";

import QueryProvider from "@/providers/react-query-provider";
import ScrollToTop from "@/utils/ScrollToTop ";
import NextTopLoader from "nextjs-toploader";
import { DialogProvider } from "./_components/ui/dialog/DialogProvider";
import "./globals.css";

// const figtree = Figtree({
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--font-figtree",
//   weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
// });

const shabnam = localFont({
  src: [
    {
      path: "../../public/fonts/shabnam/Shabnam-Thin-FD-WOL.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/shabnam/Shabnam-Light-FD-WOL.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/shabnam/Shabnam-FD-WOL.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/shabnam/Shabnam-Medium-FD-WOL.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/shabnam/Shabnam-Bold-FD-WOL.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shabnam",
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی قهوه | Coffee - صفحه اصلی",
  description: "Coffee project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa" className={`${shabnam.variable} antialiased`}>
      {/* ${figtree.variable} */}
      <body className="bg-[#fafafa] text-base-content">
        <NextTopLoader showSpinner={false} color="var(--color-primary)" />
        <DialogProvider>
          <QueryProvider>{children}</QueryProvider>
        </DialogProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
