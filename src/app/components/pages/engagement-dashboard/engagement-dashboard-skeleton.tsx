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

export default function EngagementDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="Loading engagement dashboard"
      description="Community requests, questions, and volunteer opportunities"
    >
      {/* Filter placeholder */}
      <div className="mb-6 animate-pulse" aria-hidden="true">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
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
