/**
 * TrendChartSkeleton component displays a loading placeholder for the TrendChart
 * 
 * Features:
 * - Matches TrendChart dimensions and structure
 * - Animated pulse effect using Tailwind's animate-pulse
 * - Follows Next.js loading UI conventions
 * - Can be used with React Suspense boundaries
 * - Accessible with proper ARIA attributes
 * 
 * @component
 * @returns {JSX.Element} The rendered skeleton loader
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
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      {/* Title skeleton */}
      <div className="w-64 h-6 bg-gray-200 rounded animate-pulse mb-6" />
      
      {/* Chart area skeleton */}
      <div className="w-full h-[300px] relative">
        {/* Y-axis skeleton */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        
        {/* Chart Trend area */}
        <div className="ml-12 h-full flex flex-col justify-end space-y-4">
          {/* Grid Trends skeleton */}
          <div className="flex-1 flex flex-col justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-gray-200 animate-pulse" />
            ))}
          </div>
          
          {/* Trend chart wave skeleton */}
          <div className="w-full h-32 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,80 Q25,60 50,70 T100,40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                className="animate-pulse"
              />
              <path
                d="M0,60 Q25,40 50,50 T100,20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>
          </div>
          
          {/* X-axis skeleton */}
          <div className="flex justify-between pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend skeleton */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      
      <span className="sr-only">Loading chart data...</span>
    </div>
  );
}
