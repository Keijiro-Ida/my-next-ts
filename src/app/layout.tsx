import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <h1 className="text-4xl text-indigo-800 font-bold my-2">Reading Recorder</h1>
        <ul className="flex bg-blue-600 mb-4 pl-2">
          <li className="block px-4 py-2 my-1 hover:bg-grey-100 rounded">
            <Link className="no-underline text-blue-300" href="/">Home</Link>
          </li>
          <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-grey-100 rounded">
            <Link className="no-underline text-blue-300" href="/books">Search</Link>
          </li>
          <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-grey-100 rounded">
            <Link className="no-underline text-blue-300" href="https://wings.msn.to/" target="_blank">Support</Link>
          </li>
        </ul>

        <div className="ml-2">
          {children}
        </div>
      </body>
    </html>
  );
}
