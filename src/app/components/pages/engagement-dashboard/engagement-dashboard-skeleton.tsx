/**
 * EngagementDashboardSkeleton component
 *
 * Provides a loading placeholder that mirrors the engagement dashboard layout:
 * - Page header placeholders
 * - Filter bar placeholder
 * - A list of skeleton engagement cards
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import EngagementCardSkeleton from "../../atoms/engagement-card/engagement-card-skeleton";
import FilterBar from "../../molecules/filter-bar/filter-bar";

export default function EngagementDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="Loading engagement dashboard"
      description="Community requests, questions, and volunteer opportunities"
    >
      <div className="mb-4 animate-pulse" role="status" aria-label="Loading engagement dashboard">
        <div className="h-8 w-56 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-4 w-80 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Filter placeholder */}
      <div className="mb-6 animate-pulse" aria-hidden="true">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 px-4 rounded-md bg-gray-200 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 min-w-24"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4" aria-label="Loading engagement requests" role="status">
        <EngagementCardSkeleton />
        <EngagementCardSkeleton />
        <EngagementCardSkeleton />
      </div>
      <span className="sr-only">Loading engagement dashboard content...</span>
    </DashboardPageTemplate>
  );
}
