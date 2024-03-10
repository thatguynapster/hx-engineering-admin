"use client";

import { useEffect, useState } from "react";

import { Navbar, Sidebar } from "@/components";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useStore } from "@/hooks";
import { logoutUserService } from "@/services/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { store } = useStore();

  const [toggle, setToggle] = useState(false);

  async function logoutUser() {
    await logoutUserService().then(() => router.push("./"));
  }

  useEffect(() => {
    console.log(store);
    if (!store?.user) {
      logoutUser();
    }
  }, [store]);

  return (
    <>
      <div>
        <Sidebar {...{ toggle, setToggle }} />
        <div className="lg:pl-72">
          <Navbar {...{ setToggle }} />

          <main className="">
            <div className="p-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
