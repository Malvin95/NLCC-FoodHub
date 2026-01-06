"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

/**
 * Custom authentication hook for managing user session and logout flow.
 * 
 * Provides authentication state and logout functionality with proper
 * Cognito token revocation and session cleanup.
 * 
 * @returns {Object} Authentication state and handlers
 * @returns {Session | null} session - The current NextAuth session
 * @returns {string} status - Session status: "loading" | "authenticated" | "unauthenticated"
 * @returns {boolean} isLoggingOut - Whether logout is in progress
 * @returns {Function} handleLogout - Async function to perform complete logout
 * 
 * @example
 * const { session, handleLogout, isLoggingOut } = useAuth();
 * 
 * <button onClick={handleLogout} disabled={isLoggingOut}>
 *   {isLoggingOut ? "Signing out..." : "Sign out"}
 * </button>
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * Handles the logout process for authenticated users.
   * 
   * This function executes a three-step logout flow to ensure complete session termination:
   * 1. Revokes Cognito tokens via the backend API endpoint
   * 2. Clears the NextAuth session
   * 3. Redirects to Cognito hosted UI to clear all authentication cookies
   * 
   * The function sets a localStorage flag to notify the dashboard to display skeleton loaders
   * during the logout process.
   * 
   * @async
   * @returns {Promise<void>}
   * 
   * @remarks
   * This function requires the following NEXT_PUBLIC_ environment variables to be configured:
   * - `NEXT_PUBLIC_COGNITO_DOMAIN`: The Cognito hosted UI domain (e.g., https://your-domain.auth.region.amazoncognito.com)
   * - `NEXT_PUBLIC_COGNITO_CLIENT_ID`: The Cognito application client ID
   * - `NEXT_PUBLIC_LOGOUT_REDIRECT_URL`: (Optional) The URI to redirect to after logout; defaults to window.location.origin
   * 
   * @throws {Error} Logs errors to console but implements fallback behavior:
   * - If Cognito API call fails, continues with NextAuth signout
   * - If environment variables are missing, redirects to home page
   * - If any step fails, clears NextAuth session and redirects to home
   * 
   * @example
   * // In a logout button component
   * const { handleLogout } = useAuth();
   * <button onClick={handleLogout}>Logout</button>
   */
  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Set logout flag for dashboard to show skeleton
    if (typeof window !== "undefined" && window.localStorage) {
      // TODO: This check impacts auth flow performance.
      localStorage.setItem("isLoggingOut", "true");
    }

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

  return {
    session,
    status,
    isLoggingOut,
    handleLogout,
  };
}
