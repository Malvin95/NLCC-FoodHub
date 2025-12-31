"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to Cognito hosted UI
      signIn("cognito");
    }
  }, [status]);

  if (status === "loading") return null;
  if (!session) return null;

  return <>{children}</>;
}
