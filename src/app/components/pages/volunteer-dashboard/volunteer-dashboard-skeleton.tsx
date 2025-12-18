/**
 * VolunteerDashboardSkeleton component
 *
 * Provides a loading placeholder for the volunteer dashboard page. Reuses the
 * shared dashboard template for consistent layout and renders StatCardSkeleton
 * placeholders to mirror the stat cards while data loads.
 *
 * Accessibility:
 * - Skeleton heading maintains h1/h2 hierarchy from template
 * - Stat cards grid uses semantic region landmark with aria-label and aria-busy
 * - Volunteer list uses semantic section with aria-labelledby for heading linkage
 * - Animated pulse effect provides visual feedback for ongoing data fetch
 * - Screen reader text (sr-only) clarifies page is loading for assistive tech
 * - Matches expected grid structure (3 stat cards by default) for familiar loading UX
 * - Maintains dark mode contrast during loading state
 *
 * Layout:
 * - Header/description from DashboardPageTemplate
 * - Stat card grid placeholder via StatCardSkeleton (3 card placeholders) in region
 * - Volunteer list section placeholder with semantic section markup
 * - Loading announcement text for screen readers
 *
 * @component
 * @since 1.0.0
 * @file volunteer-dashboard-skeleton.tsx
 * @returns {JSX.Element} The rendered skeleton loader
 *
 * @example
 * ```tsx
 * // Display while fetching volunteer data
 * {isLoading ? <VolunteerDashboardSkeleton /> : <VolunteerDashboard />}
 * ```
 *
 * @example
 * ```tsx
 * // In a Suspense boundary
 * <Suspense fallback={<VolunteerDashboardSkeleton />}>
 *   <AsyncVolunteerDashboard />
 * </Suspense>
 * ```
 *
 * @see {@link VolunteerDashboard} for the loaded dashboard
 * @see {@link StatCardSkeleton} for individual stat card skeleton
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { StatCardSkeleton } from "../../atoms/stat-card/stat-card-skeleton";

export default function VolunteerDashboardSkeleton() {
  return (
    <DashboardPageTemplate
      title="Loading volunteer dashboard"
      description="Overview of volunteer activities and engagement"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="region"
        aria-label="Loading volunteer statistics"
        aria-busy="true"
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>

      <section
        role="status"
        className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors animate-pulse"
        aria-labelledby="volunteer-list-skeleton-heading"
        aria-busy="true"
      >
        <div
          id="volunteer-list-skeleton-heading"
          className="w-32 h-6 bg-gray-200 dark:bg-slate-700 rounded mb-4"
          aria-hidden="true"
        />
        <div className="space-y-2" aria-hidden="true">
          <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
        <span className="sr-only">Loading volunteer list section...</span>
      </section>

      <span className="sr-only">Loading volunteer dashboard...</span>
    </DashboardPageTemplate>
  );
}
