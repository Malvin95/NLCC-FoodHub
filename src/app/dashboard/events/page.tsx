"use client";

import EventsDashboard from "@/app/components/pages/events-dashboard/events-dashboard";
import EventsDashboardSkeleton from "@/app/components/pages/events-dashboard/events-dashboard-skeleton";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsDashboardSkeleton />}>
      <EventsDashboard />
    </Suspense>
  );
}
