"use client";

import { signIn } from "next-auth/react";
import { useAuth } from "@/auth/hooks/useAuth";

export default function AuthButtons() {
  const { session, status, isLoggingOut, handleLogout } = useAuth();

  if (status === "loading") return null;
  return (
    <div className="flex flex-col gap-2">
      {session ? (
        <>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Signed in as {session.user?.name || session.user?.email || "user"}
          </span>
          <button
            className="rounded px-3 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Signing out..." : "Sign out"}
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
