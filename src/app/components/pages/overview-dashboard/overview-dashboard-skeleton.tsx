/**
 * Loading skeleton for the OverviewDashboard page.
 *
 * Features:
 * - Composes existing skeleton components to mirror the live layout
 * - Maintains responsive grid structure for stats, chart, and content feed
 * - Provides accessible loading semantics via `role="status"` and `aria-label`
 * - Uses screen-reader-only text to announce loading state
 *
 * Usage:
 * Render while dashboard data is being fetched to keep layout stable and
 * communicate loading progress to users.
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { StatCardSkeleton } from "../../atoms/stat-card/stat-card-skeleton";
import { TrendChartSkeleton } from "../../atoms/trend-chart/trend-chart-skeleton";
import { UpcomingEventsSkeleton } from "../../molecules/upcoming-events/upcoming-events-skeleton";
import InventoryStatusBarSkeleton from "../../molecules/inventory-status-bar/inventory-status-bar-skeleton";

/**
 * OverviewDashboardSkeleton mirrors the OverviewDashboard layout while data loads.
 *
 * Composition:
 * - Four `StatCardSkeleton` components for headline metrics
 * - `TrendChartSkeleton` for chart placeholder
 * - `UpcomingEventsSkeleton` plus a generic content feed placeholder
 * - `InventoryStatusBarSkeleton` with four cards
 * - Wrapped in `DashboardPageTemplate` for consistent header and padding
 *
 * Accessibility:
 * - Delegates ARIA labels to child skeletons; content feed block includes
 *   `role="status"` and descriptive `aria-label`
 * - Includes screen-reader-only text for the custom feed placeholder
 */
export default function OverviewDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="Overview"
      description="A summary of key metrics and recent activities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>

      <div className="mb-8">
        <TrendChartSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <UpcomingEventsSkeleton />
        <div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
          role="status"
          aria-label="Loading content feed"
        >
          <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
          <span className="sr-only">Loading content feed...</span>
        </div>
      </div>

      <InventoryStatusBarSkeleton count={4} />
    </DashboardPageTemplate>
  );
}
