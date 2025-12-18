import { TrendingUp, TrendingDown } from "lucide-react";
import { useId } from "react";

export interface StatCardProps {
  /** Visible label describing the statistic */
  title: string;
  /** The main numeric or textual value */
  value: string;
  /** The delta / change value (e.g. +12%, -4%) */
  change: string;
  /** Direction of change used for trend icon */
  trend: "up" | "down";
  /** Icon displayed in the colored circle – treated as decorative unless iconLabel provided */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Accent color theme */
  color: "rose" | "blue" | "green" | "purple";
  /** Optional accessible label describing the icon if it conveys meaning */
  iconLabel?: string;
  /** If true, the change value will be announced politely when updated */
  announceChanges?: boolean;
}

/**
 * Maps color variants to their corresponding Tailwind CSS classes
 * @constant
 */
const colorClasses = {
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
} as const;

/**
 * StatCard component displays a metric with an icon, value, and trend indicator
 *
 * Features:
 * - Displays a statistic with title, value, and percentage change
 * - Visual trend indicator (up/down) with color coding (green for up, red for down)
 * - Customizable icon with optional accessible label
 * - Four color themes for the icon background (rose, blue, green, purple)
 * - Full accessibility support with ARIA attributes and screen reader announcements
 * - Optional live region for announcing dynamic changes
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 *
 * @component
 * @param {StatCardProps} props - Component props
 * @returns {JSX.Element} The rendered stat card component
 *
 * @example
 * ```tsx
 * <StatCard
 *   title="Active Volunteers"
 *   value="128"
 *   change="+12%"
 *   trend="up"
 *   icon={<Users className="w-6 h-6" />}
 *   color="rose"
 *   iconLabel="Volunteers indicator"
 *   announceChanges={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Minimal usage with decorative icon
 * <StatCard
 *   title="Total Donations"
 *   value="$5,240"
 *   change="-3%"
 *   trend="down"
 *   icon={<DollarSign className="w-6 h-6" />}
 *   color="green"
 * />
 * ```
 */
export function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
  iconLabel,
  announceChanges = false,
}: StatCardProps) {
  const id = useId();
  const Icon = icon;

  return (
    <div
      role="group"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-value ${id}-change`}
      className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          role={iconLabel ? "img" : undefined}
          className={`p-3 rounded-lg ${colorClasses[color]}`}
          aria-label={iconLabel}
          aria-hidden={!iconLabel}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <div
          className={`flex items-center gap-1 ${trend === "up" ? "text-lime-800 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          id={`${id}-change`}
          aria-live={announceChanges ? "polite" : undefined}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-4 h-4" aria-hidden="true" />
          )}
          <span className="text-sm">{change}</span>
          <span className="sr-only">
            {trend === "up" ? "Increasing" : "Decreasing"} trend
          </span>
        </div>
      </div>
      <div>
        <p id={`${id}-title`} className="text-muted-foreground text-sm mb-1">
          {title}
        </p>
        <p id={`${id}-value`} className="text-foreground font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}
