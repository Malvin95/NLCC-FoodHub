"use client";

import OverviewDashboard from "@/app/components/pages/overview-dashboard/overview-dashboard";
import { Suspense, useState, useEffect } from "react";
import OverviewDashboardSkeleton from "../components/pages/overview-dashboard/overview-dashboard-skeleton";
import RequireAuth from "../shared/RequireAuth";

export default function OverviewPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Check if logout is in progress
    const checkLogoutStatus = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const loggingOut = localStorage.getItem("isLoggingOut") === "true";
        setIsLoggingOut(loggingOut);
      }
    };

    // Check initially
    checkLogoutStatus();

    // Listen for storage changes to update logout state without polling
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isLoggingOut") {
        const loggingOut = event.newValue === "true";
        setIsLoggingOut(loggingOut);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
        localStorage.removeItem("isLoggingOut");
      }
    };
  }, []);

  // Show skeleton during logout
  if (isLoggingOut) {
    return <OverviewDashboardSkeleton />;
  }

  return (
    <Suspense fallback={<OverviewDashboardSkeleton />}>
      <RequireAuth>
        <OverviewDashboard />
      </RequireAuth>
    </Suspense>
  );
}
