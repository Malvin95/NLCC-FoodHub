/**
 * InventoryDashboardSkeleton component
 *
 * Provides a loading placeholder for the inventory dashboard page. Reuses the
 * shared dashboard template for consistent layout and renders the
 * InventoryStatusBarSkeleton to mirror the inventory grid while data loads.
 *
 * Accessibility:
 * - Skeleton heading maintains h1/h2 hierarchy from template
 * - Loading state announced via InventoryStatusBarSkeleton with role="status" and aria-label
 * - Animated pulse effect provides visual feedback for ongoing data fetch
 * - Screen reader text (sr-only) clarifies page is loading for assistive tech
 * - Matches expected grid structure with 4 item placeholders for familiar loading UX
 * - Live region attributes inherited from child skeleton components
 * - Maintains dark mode contrast during loading state
 *
 * Layout:
 * - Header/description from DashboardPageTemplate
 * - Inventory status grid placeholder via InventoryStatusBarSkeleton (4 card placeholders)
 * - Loading announcement text for screen readers
 *
 * @component
 * @since 1.0.0
 * @file inventory-dashboard-skeleton.tsx
 * @returns {JSX.Element} The rendered skeleton loader
 *
 * @example
 * ```tsx
 * // Display while fetching inventory data
 * {isLoading ? <InventoryDashboardSkeleton /> : <InventoryDashboard />}
 * ```
 *
 * @example
 * ```tsx
 * // In a Suspense boundary
 * <Suspense fallback={<InventoryDashboardSkeleton />}>
 *   <AsyncInventoryDashboard />
 * </Suspense>
 * ```
 *
 * @see {@link InventoryDashboard} for the loaded dashboard
 * @see {@link InventoryStatusBarSkeleton} for the inventory grid skeleton
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import InventoryStatusBarSkeleton from "../../molecules/inventory-status-bar/inventory-status-bar-skeleton";

export default function InventoryDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="Loading inventory management"
      description="Overview of current inventory status and metrics"
    >
      <InventoryStatusBarSkeleton count={4} />
      <span className="sr-only">Loading inventory dashboard...</span>
    </DashboardPageTemplate>
  );
}
