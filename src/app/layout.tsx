import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClawSight | Solana Token Sniper",
  description: "The ultimate memecoin sniping tool on Solana. Faster than light. Sharper than claws.",
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster position="bottom-right" theme="dark" toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid #ff0033',
            color: '#fff',
          }
        }} />
      </body>
    </html>
  );
}
