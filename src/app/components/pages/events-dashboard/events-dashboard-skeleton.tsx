/**
 * EventsDashboardSkeleton component
 *
 * Provides a loading placeholder for the events dashboard page. Reuses the
 * shared dashboard template for consistent layout and renders the
 * UpcomingEventsSkeleton to mirror the events list while data loads.
 *
 * Layout:
 * - Header/description from DashboardPageTemplate
 * - Upcoming events list placeholder via UpcomingEventsSkeleton
 *
 * Accessibility:
 * - Skeleton list uses role="status" and screen-reader text for loading state
 * - Inherits semantic structure from the dashboard template
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { UpcomingEventsSkeleton } from "../../molecules/upcoming-events/upcoming-events-skeleton";
import { useId } from "react";

export default function EventsDashboardSkeleton() {
  const calendarStatusId = useId();

  return (
    <DashboardPageTemplate
      title="Loading events & programs"
      description="Overview of upcoming and past events"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        role="group"
        aria-label="Events and calendar layout (loading)"
      >
        <UpcomingEventsSkeleton />

        <section
          aria-label="Event Calendar (loading)"
          aria-describedby={calendarStatusId}
          aria-busy="true"
          className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors animate-pulse"
        >
          <div className="w-40 h-7 bg-gray-200 dark:bg-slate-700 rounded mb-6" />
          <div id={calendarStatusId} className="space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
          <span className="sr-only">Loading event calendar placeholder...</span>
        </section>
      </div>
      <span className="sr-only">Loading events dashboard...</span>
    </DashboardPageTemplate>
  );
}
