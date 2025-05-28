import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthMenu from "@/components/AuthMenu";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reading Recorder",
  description: "自分が読んだ書籍の記録をするアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <Providers>
          <h1 className="text-4xl text-indigo-800 font-bold my-2">Reading Recorder</h1>
          <AuthMenu />
          <div className="ml-2">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
