"use client";

import { Button } from "@/components";
import { account } from "@/configs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center gap-64 min-h-screen">
      <Image src={"/img/logo.png"} alt={"HX logo"} width={311} height={264} />
      <div className="flex flex-col gap-6 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Log in to your account</h1>
          <p className="text-neutral-40">Welcome back</p>
        </div>
        <Button className="flex gap-3 justify-center border border-neutral-30 !py-2.5 rounded-md font-medium">
          <Image
            src={"/img/google.png"}
            width={24}
            height={24}
            alt={"Google Sign In"}
          />
          Sign in with Google
        </Button>
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium text-info">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
