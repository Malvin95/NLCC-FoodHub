"use client";

import OverviewDashboard from "@/app/components/pages/overview-dashboard/overview-dashboard";
import { Suspense } from "react";
import OverviewDashboardSkeleton from "../components/pages/overview-dashboard/overview-dashboard-skeleton";

export default function OverviewPage() {
  return (
    <Suspense fallback={<OverviewDashboardSkeleton />}>
      <OverviewDashboard />
    </Suspense>
  );
}
