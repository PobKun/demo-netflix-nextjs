import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/assets/Navbar";
import { SearchProvider } from "@/context/SearchProvider";
import { ThemeProvider, } from "next-themes";


const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Netflix Demo App",
  description: "Netflix Demo App by Pattaraphon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${noto_sans_thai.className}`}
      >
        <ThemeProvider attribute="class"  defaultTheme="dark">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
