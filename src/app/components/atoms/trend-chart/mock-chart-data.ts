/**
 * Sample data representing generic series values over the last 6 months.
 *
 * @constant
 * @remarks
 * This mock data uses 'Series A' and 'Series B' as keys to match the TrendChart
 * component's default `firstLineName` and `secondLineName` prop values.
 * For production usage, pass the `data` prop with your domain-specific series
 * keyed by the display names you supply (e.g., 'Volunteers', 'Clients', 'Food Donations').
 *
 * @example
 * ```tsx
 * // Custom data with different series names
 * const attendanceData = [
 *   { month: 'Jun', 'Active Volunteers': 20, 'Served Clients': 55 },
 *   { month: 'Jul', 'Active Volunteers': 35, 'Served Clients': 65 },
 * ];
 *
 * <TrendChart
 *   firstLineName="Active Volunteers"
 *   secondLineName="Served Clients"
 *   data={attendanceData}
 * />
 * ```
 */
export const mockChartData = [
  { month: "Jun", "Series A": 20, "Series B": 55 },
  { month: "Jul", "Series A": 35, "Series B": 65 },
  { month: "Aug", "Series A": 28, "Series B": 88 },
  { month: "Sep", "Series A": 38, "Series B": 62 },
  { month: "Oct", "Series A": 41, "Series B": 70 },
  { month: "Nov", "Series A": 42, "Series B": 75 },
];
