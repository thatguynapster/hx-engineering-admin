import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HX Engineering",
  description: "HX Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Toaster position="top-right" toastOptions={{ duration: 5000 }} /> */}
      <body className={inter.className}>
        <main className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-64 min-h-screen">
          <div className="w-[156px] lg:w-[312px] h-[124px] lg:h-[248px] relative">
            <Image
              src={"/img/logo.png"}
              alt={"HX logo"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-6 w-[360px]">{children}</div>
        </main>
      </body>
    </html>
  );
}
