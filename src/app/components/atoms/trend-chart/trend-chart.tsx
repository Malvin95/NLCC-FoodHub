import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockChartData } from './mock-chart-data';

/**
 * Props for the `TrendChart` component.
 * 
 * @interface TrendChartProps
 * @property {string} [chartTitle='Trends (Last 6 Months)'] The title displayed at the top of the chart.
 * @property {string} [firstLineName='Series A'] The display name for the first line (first data series). Must match a key in `data` rows.
 * @property {string} [secondLineName='Series B'] The display name for the second line (second data series). Must match a key in `data` rows.
 * @property {Array<{ month: string; [key: string]: string | number }>} [data=mockChartData] Optional custom data to display in the chart. Each item must include a `month` label and numeric values for the series. Keys must match `firstLineName` and `secondLineName`.
 */
interface TrendChartProps {
  /** The title displayed at the top of the chart */
  chartTitle?: string;
  /** The display name for the first line (first data series) */
  firstLineName?: string;
  /** The display name for the second line (second data series) */
  secondLineName?: string;
  /** Optional custom data to display in the chart */
  data?: Array<{ month: string; [key: string]: string | number }>;
}

/**
 * TrendChart displays data trends using a responsive, accessible line chart.
 * 
 * Features:
 * - Displays two data series over a 6-month period
 * - Two-line comparison with color-coded lines (rose and blue)
 * - Interactive tooltips showing formatted values on hover
 * - Responsive container that adapts to parent width
 * - Grid lines, legend, and active dots for readability and interactivity
 * - Customizable title and line names for any data type
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * Accessibility:
 * - Renders the container with `role="figure"` and an `aria-label` using `chartTitle`
 * - Tooltip content is visual; consider providing summarized values elsewhere for screen readers if critical
 * 
 * @component
 * @since 1.0.0
 * @param {TrendChartProps} props Component props.
 * @returns {JSX.Element} Rendered line chart component.
 * @see TrendChartSkeleton for loading UI.
 * @see https://recharts.org/en-US/api/LineChart Recharts LineChart API.
 * 
 * @example
 * ```tsx
 * // Basic usage with default labels
 * <TrendChart />
 * ```
 * 
 * @example
 * ```tsx
 * // With custom title and line names for attendance tracking
 * <TrendChart
 *   chartTitle="Monthly Attendance Trends"
 *   firstLineName="Active Volunteers"
 *   secondLineName="Served Clients"
 *   data={[
 *     { month: 'Jun', 'Active Volunteers': 20, 'Served Clients': 55 },
 *     { month: 'Jul', 'Active Volunteers': 35, 'Served Clients': 65 },
 *   ]}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // For donation tracking
 * <TrendChart
 *   chartTitle="Donation Trends (Last 6 Months)"
 *   firstLineName="Food Donations"
 *   secondLineName="Monetary Donations"
 *   data={[
 *     { month: 'Jun', 'Food Donations': 120, 'Monetary Donations': 450 },
 *     { month: 'Jul', 'Food Donations': 140, 'Monetary Donations': 510 },
 *   ]}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With Suspense boundary for async loading
 * <Suspense fallback={<TrendChartSkeleton />}>
 *   <TrendChart chartTitle="Analytics Dashboard" />
 * </Suspense>
 * ```
 */
export function TrendChart({
  chartTitle = 'Trends (Last 6 Months)',
  firstLineName = 'Series A',
  secondLineName = 'Series B',
  data = mockChartData,
}: TrendChartProps = {}) {
  return (
    <div role="figure" aria-label={chartTitle} className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors">
      <h2 className="text-foreground font-medium mb-6">{chartTitle}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis width="auto" />
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()}`}
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)'
            }}
          />
          <Legend />
          <Line type="monotone" stroke="#f43f5e" dataKey={firstLineName} name={firstLineName} activeDot={{ r: 8 }} />
          <Line type="monotone" stroke="#3b82f6" dataKey={secondLineName} name={secondLineName} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
