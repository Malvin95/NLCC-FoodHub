"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  if (status === "loading") return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Set logout flag for dashboard to show skeleton
    localStorage.setItem("isLoggingOut", "true");

    // Show loading page with skeleton

    try {
      // Step 1: Call Cognito GlobalSignOut API to revoke tokens
      const logoutResponse = await fetch("/api/auth/cognito-logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: session?.accessToken,
        }),
      });

      if (!logoutResponse.ok) {
        console.error("Cognito logout failed:", await logoutResponse.text());
      }

      // Step 2: Clear NextAuth session
      await signOut({ redirect: false });

      // Step 3: Redirect to Cognito hosted UI logout to clear cookies
      const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
      const logoutUri =
        process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || window.location.origin;

      if (domain && clientId) {
        const cognitoLogoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
        window.location.href = cognitoLogoutUrl;
      } else {
        // Fallback if env vars missing
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
      // Fallback: at least clear NextAuth and go home
      await signOut({ callbackUrl: "/" });
    }
  };

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
