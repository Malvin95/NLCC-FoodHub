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
            {new Date(data.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            })}
            </h2>

            {/* Metrics */}
            <dl className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg" aria-hidden="true">
                <Users className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                <dt className="text-muted-foreground text-sm">Volunteers</dt>
                <dd className="text-foreground">{data.volunteers}</dd>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg" aria-hidden="true">
                <Clock className="w-5 h-5 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                <dt className="text-muted-foreground text-sm">Total Hours</dt>
                <dd className="text-foreground">{data.hours}</dd>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg" aria-hidden="true">
                <Package className="w-5 h-5 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                <dt className="text-muted-foreground text-sm">Meals Distributed</dt>
                <dd className="text-foreground">{data.mealsDistributed}</dd>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="p-2 bg-(--highlight) rounded-lg" aria-hidden="true">
                <TrendingUp className="w-5 h-5 text-(--highlight-foreground)" aria-hidden="true" />
                </div>
                <div>
                <dt className="text-muted-foreground text-sm">Families Served</dt>
                <dd className="text-foreground">{data.familiesServed}</dd>
                </div>
            </div>
            </dl>

            {/* Activities */}
            <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm mb-2">Activities</p>
                <ul className="flex flex-wrap gap-2" aria-label="Activities list">
                    {data.activities.map((activity, index) => (
                        <li
                            key={index}
                            className="px-3 py-1 bg-accent text-foreground/90 rounded-full text-sm"
                        >
                            {activity}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
