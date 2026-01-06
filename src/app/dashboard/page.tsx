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
      const loggingOut = localStorage.getItem("isLoggingOut") === "true";
      setIsLoggingOut(loggingOut);
    };

    // Check initially
    checkLogoutStatus();

    // Set up an interval to check for logout state changes
    const interval = setInterval(checkLogoutStatus, 100);

    // Cleanup
    return () => {
      clearInterval(interval);
      localStorage.removeItem("isLoggingOut");
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
