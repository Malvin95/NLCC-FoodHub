/**
 * VolunteerDashboard page component
 *
 * Renders the volunteer management overview page using the shared dashboard template
 * and displays volunteer statistics via StatCard components. Also includes a placeholder
 * for the upcoming volunteer list section.
 *
 * Accessibility:
 * - Uses semantic page structure via DashboardPageTemplate (h1 title, h2 section headings)
 * - Stat cards use group role with proper aria-labelledby/aria-describedby
 * - Each stat card has accessible icon labels and trend descriptions for screen readers
 * - Volunteer list section marked as a landmark region with descriptive heading
 * - Full keyboard navigation support through semantic HTML
 * - Dark mode support maintains sufficient color contrast
 * - Live region support for dynamic stat updates (via StatCard announceChanges prop)
 *
 * Layout:
 * - Header/description provided by DashboardPageTemplate
 * - Grid of stat cards showing volunteer metrics (Active Volunteers, Hours This Month, New Signups)
 * - Placeholder section for future volunteer list implementation
 *
 * Features:
 * - Responsive stat card grid (1 col mobile → auto-fit desktop)
 * - Mock data support with real data integration ready
 * - Full dark mode support with theme-aware colors
 * - Consistent page structure across all dashboards
 * - Extensible for additional volunteer information
 *
 * @component
 * @since 1.0.0
 * @file volunteer-dashboard.tsx
 * @returns {JSX.Element} The rendered volunteer dashboard page
 *
 * @example
 * ```tsx
 * // Basic usage with mock data
 * <VolunteerDashboard />
 * ```
 *
 * @see {@link StatCard} for the stat card component
 * @see {@link DashboardPageTemplate} for the page layout template
 * @see {@link VolunteerDashboardSkeleton} for the loading state
 */
import { StatCard } from "../../atoms/stat-card/stat-card";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { mockStatCardData } from "./_mock-data_";

export default function VolunteerDashboard() {
  return (
    <DashboardPageTemplate
      title="Volunteer Dashboard"
      description="Overview of volunteer activities and engagement"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="region"
        aria-label="Volunteer statistics"
      >
        {mockStatCardData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            announceChanges={true}
          />
        ))}
      </div>

      <section
        className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
        aria-labelledby="volunteer-list-heading"
      >
        <h2
          id="volunteer-list-heading"
          className="text-foreground font-medium mb-4"
        >
          Volunteer List
        </h2>
        <p className="text-muted-foreground">
          Detailed volunteer information coming soon...
        </p>
      </section>
    </DashboardPageTemplate>
  );
}
