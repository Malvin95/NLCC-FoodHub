"use client";

import VolunteerDashboard from "@/app/components/pages/volunteer-dashboard/volunteer-dashboard";
import VolunteerDashboardSkeleton from "@/app/components/pages/volunteer-dashboard/volunteer-dashboard-skeleton";
import { Suspense } from "react";

export default function VolunteersPage() {
  return (
    <Suspense fallback={<VolunteerDashboardSkeleton />}>
      <VolunteerDashboard />
    </Suspense>
  );
}
