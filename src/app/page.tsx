"use client";

import { useSession } from "next-auth/react";
import AuthButtons from "./components/atoms/auth-button/auth-buttons";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <AuthButtons />
      </main>
    </div>
  );
}
