import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InitialLoader from "./components/InitialLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Non Stop Betting and Casino 24/7",
  description:
    "Nonstopbettingandcasino.com is a leading online betting and casino platform, offering a wide range of games and betting options for players worldwide. Enjoy seamless gaming experiences, secure transactions, and 24/7 customer support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InitialLoader />

        {children}
      </body>
    </html>
  );
}