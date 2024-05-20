import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import "../styles/index.scss";

import StoreProvider from "@/providers";
import { classNames } from "@/libs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HX Engineering",
  description: "HX Engineering",
};

dayjs.extend(relativeTime);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, "dark")}>
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
