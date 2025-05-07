import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/assets/Navbar";
import { SearchProvider } from "@/providers/SearchProvider";
import { ThemeProvider, } from "next-themes";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "@/providers/ReactQueryProvider";


const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Netflix Demo App",
  description: "Netflix Demo App by Pattaraphon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();


  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${noto_sans_thai.className}`}
      >
        <ReactQueryProvider>
          <ThemeProvider attribute="class"  defaultTheme="dark">
            <NextIntlClientProvider>
              <SearchProvider> 
                <section>
                  <Navbar />
                </section>
                <section> 
                  {children}
                </section>
                <footer className="py-8 text-center bg-white dark:bg-black">
                  <span className="text-black dark:text-white">Demo Netflix (Pattaraphon)</span>
                </footer>
              </SearchProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
