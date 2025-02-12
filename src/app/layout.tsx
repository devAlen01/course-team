import type { Metadata } from "next";
import { Rubik, Montserrat } from "next/font/google";
import "./globals.scss";
import LayoutSite from "@/components/layout/LayoutSite";
import LayoutClient from "./layout.client";

const geistMontserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const geistRubik = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Couresera",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMontserrat.style} ${geistRubik.style}`}>
        <LayoutClient>
          <LayoutSite>{children}</LayoutSite>
        </LayoutClient>
      </body>
    </html>
  );
}
