"use client";

import { Spinner } from "@/components";
import { account } from "@/configs";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>();

  const getAccount = async () => {
    try {
      const accountData = await account.get();
      console.log(accountData);
      setUser(accountData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-8 min-h-screen">
      {user ? (
        <div className="mt-3">
          <p>Username: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <>
          <Spinner size={50} color="#0055D6" />
          <p className="text-sm text-info font-medium">
            Loading profile details...
          </p>
        </>
      )}
    </main>
  );
}
