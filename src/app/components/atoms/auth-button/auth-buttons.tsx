"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex flex-col gap-2">
      {session ? (
        <>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Signed in as {session.user?.name || session.user?.email || "user"}
          </span>
          <button
            className="rounded px-3 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          className="rounded px-3 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
          onClick={() => signIn("cognito")}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
