"use client";

import InventoryDashboard from "@/app/components/pages/inventory-dashboard/inventory-dashboard";
import InventoryDashboardSkeleton from "@/app/components/pages/inventory-dashboard/inventory-dashboard-skeleton";
import { Suspense } from "react";

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventoryDashboardSkeleton />}>
      <InventoryDashboard />
    </Suspense>
  );
}
