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
      <div className="mb-4 animate-pulse">
        <div className="h-8 w-56 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-4 w-80 bg-gray-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Filter placeholder (reuses FilterBar for consistency if it has internal skeleton) */}
      <div className="mb-6">
        <FilterBar />
      </div>

      <div className="space-y-4">
        <EngagementCardSkeleton />
        <EngagementCardSkeleton />
        <EngagementCardSkeleton />
      </div>
    </DashboardPageTemplate>
  );
}
