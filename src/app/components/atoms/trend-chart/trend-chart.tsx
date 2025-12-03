import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Sample data representing volunteer and client counts over the last 6 months
 * @constant
 */
const data = [
  { month: 'Jun', volunteers: 20, clients: 55 },
  { month: 'Jul', volunteers: 35, clients: 65 },
  { month: 'Aug', volunteers: 28, clients: 88 },
  { month: 'Sep', volunteers: 38, clients: 62 },
  { month: 'Oct', volunteers: 41, clients: 70 },
  { month: 'Nov', volunteers: 42, clients: 75 },
];

/**
 * Props for the TrendChart component
 * @interface TrendChartProps
 */
interface TrendChartProps {
  /** The title displayed at the top of the chart */
  chartTitle?: string;
  /** The display name for the first line (first data series) */
  firstLineName?: string;
  /** The display name for the second line (second data series) */
  secondLineName?: string;
}

/**
 * TrendChart component displays data trends using a responsive line chart
 * 
 * Features:
 * - Displays two data series over a 6-month period
 * - Two-line comparison chart with color-coded lines (rose and blue)
 * - Interactive tooltips showing formatted values on hover
 * - Responsive container that adapts to parent width
 * - Grid lines for easier value reading
 * - Legend for line identification
 * - Active dots on hover for enhanced interactivity
 * - Customizable title and line names for any data type
 * 
 * The chart uses Recharts library for rendering and includes:
 * - Cartesian grid with dashed lines
 * - X-axis showing month labels
 * - Y-axis with automatic width calculation
 * - Styled tooltips with rounded corners
 * - Monotone curve interpolation for smooth lines
 * 
 * @component
 * @param {TrendChartProps} props - Component props
 * @returns {JSX.Element} The rendered line chart component
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
  firstLineName = 'Volunteers',
  secondLineName = 'Clients'
}: TrendChartProps = {}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-gray-900 mb-6">{chartTitle}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis width="auto" />
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()}`}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          <Line type="monotone" stroke="#f43f5e" dataKey="volunteers" name={firstLineName} activeDot={{ r: 8 }} />
          <Line type="monotone" stroke="#3b82f6" dataKey="clients" name={secondLineName} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
