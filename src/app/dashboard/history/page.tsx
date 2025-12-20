"use client";

import HistoryDashboard from "@/app/components/pages/history-dashboard/history-dashboard";
import { HistoryDashboardSkeleton } from "@/app/components/pages/history-dashboard/history-dashboard.skeleton";
import { Suspense } from "react";

export default function HistoryPage() {
  return (
    <Suspense fallback={<HistoryDashboardSkeleton />}>
      <HistoryDashboard />
    </Suspense>
  );
}
