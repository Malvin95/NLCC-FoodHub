"use client";

import EngagementDashboard from "@/app/components/pages/engagement-dashboard/engagement-dashboard";
import EngagementDashboardSkeleton from "@/app/components/pages/engagement-dashboard/engagement-dashboard-skeleton";
import { Suspense } from "react";

export default function EngagementPage() {
  return (
    <Suspense fallback={<EngagementDashboardSkeleton />}>
      <EngagementDashboard />
    </Suspense>
  );
}
