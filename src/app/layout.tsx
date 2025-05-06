import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/assets/Navbar";
import { SearchProvider } from "@/context/SearchProvider";


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
    <html>
      <body
        className={`${noto_sans_thai.className}`}
      >
        <SearchProvider> 
          <section>
            <Navbar />
          </section>
          <section>
            {children}
          </section>
        </SearchProvider>
      </body>
    </html>
  );
}
