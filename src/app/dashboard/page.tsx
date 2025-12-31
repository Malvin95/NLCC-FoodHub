"use client";

import OverviewDashboard from "@/app/components/pages/overview-dashboard/overview-dashboard";
import { Suspense } from "react";
import OverviewDashboardSkeleton from "../components/pages/overview-dashboard/overview-dashboard-skeleton";
import RequireAuth from "../shared/RequireAuth";

export default function OverviewPage() {
  return (
    <Suspense fallback={<OverviewDashboardSkeleton />}>
      <RequireAuth>
        <OverviewDashboard />
      </RequireAuth>
    </Suspense>
  );
}
