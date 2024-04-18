"use client";

import { useEffect, useState } from "react";

import { Navbar, Sidebar } from "@/components";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks";
import { logoutUserService } from "@/services/auth";
import { classNames, http } from "@/libs";
import { SWRConfig } from "swr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { store } = useStore();

  const [toggle, setToggle] = useState(false);

  async function logoutUser() {
    await logoutUserService(store.token!).then(() => router.push("/"));
  }

  useEffect(() => {
    if (!store?.user) {
      logoutUser();
    }
  }, [store]);

  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          http
            .get(url, {
              params: {},
              headers: { Authorization: `Bearer ${store.token}` },
            })
            .then((response: any) => response),
        dedupingInterval: 1000 * 60,
        shouldRetryOnError: false,
        refreshInterval: 1000 * 60,
      }}
    >
      <Sidebar {...{ toggle, setToggle }} />
      <div className="lg:pl-72">
        <Navbar {...{ setToggle }} />

        <main
          className={classNames(
            "bg-neutral-30 dark:bg-neutral-dark",
            "min-h-[calc(100vh-64px)]",
            "p-6 sm:px-6 lg:px-8"
          )}
        >
          {children}
        </main>
      </div>
    </SWRConfig>
  );
}
