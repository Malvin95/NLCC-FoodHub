"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to landing/login page instead of auto-launching Cognito
      router.replace("/");
    }
  }, [status, router]);

  if (status !== "authenticated") return null;
  if (!session) return null;

  return <>{children}</>;
}
