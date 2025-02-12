import { Geist, Geist_Mono as GeistMono } from "next/font/google";
import { NotificationProvider } from "context";
import { getMessages } from "@actions/index";
import { GlobalProvider } from "context";
import Navbar from "@components/navbar";
import { Toast } from "@components/ui";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | IT Patagonia",
    default: "IT Patagonia",
  },
  description: "challenge",
  icons: {
    icon: "/brand.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <GlobalProvider initialData={messages || []}>
            <Navbar />
            <main className="lg:px-18 relative flex min-h-screen w-full flex-col items-center px-8 pb-10 pt-24 md:px-14 md:pt-28">
              {children}
              <Toast />
            </main>
          </GlobalProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
