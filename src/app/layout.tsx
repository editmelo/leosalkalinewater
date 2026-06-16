import type { Metadata } from "next";
import { Montserrat, Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-heading", weight: ["500","600","700","800"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", weight: ["300","400","600"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-tagline", style: ["italic"], weight: ["400","500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leosalkalinewater.com"),
  title: { default: "Leo's Alkaline Water — Hydrating You Is What We Do", template: "%s" },
  description: "Premium alkaline water delivered fresh across Indianapolis. Subscribe or order one-time. Join the Water Fam.",
  openGraph: {
    title: "Leo's Alkaline Water",
    description: "Premium alkaline water delivered fresh across Indianapolis. Join the Water Fam.",
    type: "website",
    images: ["/hero-poster.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable} ${playfair.variable}`}>
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
