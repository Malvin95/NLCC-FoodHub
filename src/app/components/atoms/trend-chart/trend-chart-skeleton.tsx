/**
 * TrendChartSkeleton displays a loading placeholder for `TrendChart`.
 * 
 * Features:
 * - Matches TrendChart dimensions and layout for visual stability
 * - Animated pulse effect using Tailwind's `animate-pulse`
 * - Follows Next.js `loading.tsx` UI conventions
 * - Suitable for React Suspense boundaries
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
 * 
 * Accessibility:
 * - Uses `role="status"` with an `aria-label` describing the loading state
 * - Includes visually hidden text (`sr-only`) for screen readers
 * 
 * @component
 * @since 1.0.0
 * @returns {JSX.Element} Rendered skeleton loader.
 * @see TrendChart for the chart component that this skeleton represents.
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<TrendChartSkeleton />}>
 *   <AsyncTrendChart />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // In a loading.tsx file
 * export default function Loading() {
 *   return <TrendChartSkeleton />;
 * }
 * ```
 */
export function TrendChartSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading chart data"
      className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
    >
      {/* Title skeleton */}
      <div className="w-64 h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-6" />
      
      {/* Chart area skeleton */}
      <div className="w-full h-[300px] relative">
        {/* Y-axis skeleton */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-8 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
        
        {/* Line Chart area */}
        <div className="ml-12 h-full flex flex-col justify-end space-y-4">
          {/* Grid lines skeleton */}
          <div className="flex-1 flex flex-col justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-gray-200 dark:bg-slate-700 animate-pulse" />
            ))}
          </div>
          
          {/* Line chart skeleton */}
          <div className="w-full h-32 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,80 Q25,60 50,70 T100,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-pulse text-gray-300 dark:text-slate-600"
              />
              <path
                d="M0,60 Q25,40 50,50 T100,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-pulse text-gray-300 dark:text-slate-600"
              />
            </svg>
          </div>
          
          {/* X-axis skeleton */}
          <div className="flex justify-between pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-8 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend skeleton */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-20 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-16 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
      
      <span className="sr-only">Loading chart data...</span>
    </div>
  );
}
