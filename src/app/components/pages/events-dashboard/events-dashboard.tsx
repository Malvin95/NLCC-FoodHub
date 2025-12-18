/**
 * EventsDashboard page component
 *
 * Renders the events and programs overview page using the shared dashboard template
 * and the UpcomingEvents list. Provides a simple wrapper that supplies the page
 * title/description and delegates list rendering to the UpcomingEvents molecule.
 *
 * Layout:
 * - Header/description provided by DashboardPageTemplate
 * - Upcoming events list rendered via UpcomingEvents (mock data by default)
 *
 * @file events-dashboard.tsx
 */
import UpcomingEvents from "../../molecules/upcoming-events/upcoming-events";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { useId } from "react";

export default function EventsDashboard() {
    const calendarHeadingId = useId();
    const calendarStatusId = useId();

    return (
        <DashboardPageTemplate
            title={"Events & Programs"}
            description={"Overview of upcoming and past events"}
        >
            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                role="group"
                aria-label="Events and calendar layout"
            >
                <UpcomingEvents />
                <section
                    id="events-placeholder"
                    role="region"
                    aria-labelledby={calendarHeadingId}
                    aria-describedby={calendarStatusId}
                    aria-live="polite"
                    aria-atomic="false"
                    className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
                >
                    <h2 id={calendarHeadingId} className="text-foreground font-medium mb-6">
                        Event Calendar
                    </h2>
                    <div
                        id={calendarStatusId}
                        className="text-center py-8 text-muted-foreground"
                        role="status"
                        aria-live="polite"
                    >
                        Calendar view coming soon!
                        <span className="sr-only">Calendar feature is planned and not yet available.</span>
                    </div>
                </section>
            </div>
        </DashboardPageTemplate>
    );
}