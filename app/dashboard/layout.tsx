"use client";

import { useEffect, useState } from "react";

import { Navbar, Sidebar } from "@/components";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks";
import { logoutUserService } from "@/services/auth";
import { classNames } from "@/libs";

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
    <>
      <Sidebar {...{ toggle, setToggle }} />
      <div className="lg:pl-72">
        <Navbar {...{ setToggle }} />

        <main
          className={classNames(
            "bg-neutral-30 dark:bg-neutral-dark",
            "min-h-[calc(100vh-64px)]",
            "p-4 sm:px-6 lg:px-8"
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}
