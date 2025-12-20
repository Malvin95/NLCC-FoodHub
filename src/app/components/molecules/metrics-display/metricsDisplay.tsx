import { DayMetrics } from "../../pages/history-dashboard/history-dashboard";
import { Clock, Package, TrendingUp, Users } from "lucide-react";

/**
 * MetricsDisplay component shows daily volunteer activity metrics
 *
 * Features:
 * - Displays key metrics: volunteers, hours, meals distributed, families served
 * - Color-coded icons for each metric type
 * - List of activities performed on the selected day
 * - Full accessibility with semantic HTML (dl/dt/dd, ul/li)
 * - ARIA labels for screen readers
 * - Dark mode support with theme-aware colors
 *
 * @component
 * @param {DayMetrics} data - The metrics data for a specific day
 * @returns {JSX.Element} The rendered metrics display
 *
 * @example
 * ```tsx
 * <MetricsDisplay
 *   date="2024-01-15"
 *   volunteers={12}
 *   hours={36}
 *   mealsDistributed={250}
 *   familiesServed={68}
 *   activities={["Food Distribution", "Community Outreach"]}
 * />
 * ```
 */
export default function MetricsDisplay(data: DayMetrics) {
  return (
    <>
      <h2 id="day-metrics-heading" className="text-foreground mb-4">
        {new Date(data.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h2>

      {/* Metrics */}
      <ul className="space-y-4 mb-6" aria-label="Daily metrics">
        <li className="flex items-center gap-3" role="listitem">
          <div
            className="p-2 bg-green-100 dark:bg-green-950 rounded-lg"
            aria-hidden="true"
          >
            <Users
              className="w-5 h-5 text-green-600 dark:text-green-400"
              aria-hidden="true"
            />
          </div>
          <dl>
            <dt className="text-muted-foreground text-sm">Volunteers</dt>
            <dd
              className="text-foreground"
              aria-label={`${data.volunteers} volunteers`}
            >
              {data.volunteers}
            </dd>
          </dl>
        </li>

        <li className="flex items-center gap-3" role="listitem">
          <div
            className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg"
            aria-hidden="true"
          >
            <Clock
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          </div>
          <dl>
            <dt className="text-muted-foreground text-sm">Total Hours</dt>
            <dd
              className="text-foreground"
              aria-label={`${data.hours} total hours`}
            >
              {data.hours}
            </dd>
          </dl>
        </li>

        <li className="flex items-center gap-3" role="listitem">
          <div
            className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg"
            aria-hidden="true"
          >
            <Package
              className="w-5 h-5 text-purple-600 dark:text-purple-400"
              aria-hidden="true"
            />
          </div>
          <dl>
            <dt className="text-muted-foreground text-sm">Meals Distributed</dt>
            <dd
              className="text-foreground"
              aria-label={`${data.mealsDistributed} meals distributed`}
            >
              {data.mealsDistributed}
            </dd>
          </dl>
        </li>

        <li className="flex items-center gap-3" role="listitem">
          <div className="p-2 bg-(--highlight) rounded-lg" aria-hidden="true">
            <TrendingUp
              className="w-5 h-5 text-(--highlight-foreground)"
              aria-hidden="true"
            />
          </div>
          <dl>
            <dt className="text-muted-foreground text-sm">Families Served</dt>
            <dd
              className="text-foreground"
              aria-label={`${data.familiesServed} families served`}
            >
              {data.familiesServed}
            </dd>
          </dl>
        </li>
      </ul>

      {/* Activities */}
      <div className="pt-6 border-t border-border">
        <p className="text-muted-foreground text-sm mb-2">Activities</p>
        <ul className="flex flex-wrap gap-2" aria-label="Activities list">
          {data.activities.map((activity) => (
            <li
              key={activity}
              className="px-3 py-1 bg-accent text-foreground/90 rounded-full text-sm"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
