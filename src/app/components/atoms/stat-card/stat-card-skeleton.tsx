/**
 * StatCardSkeleton component displays a loading placeholder matching StatCard's layout
 * 
 * Features:
 * - Matches StatCard dimensions and structure
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
 * // In a loading.tsx file
 * export default function Loading() {
 *   return <StatCardSkeleton />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With Suspense boundary
 * <Suspense fallback={<StatCardSkeleton />}>
 *   <AsyncStatCard />
 * </Suspense>
 * ```
 * 
 * @example
 * ```tsx
 * // Multiple cards in a grid
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 *   {Array.from({ length: 4 }).map((_, i) => (
 *     <StatCardSkeleton key={i} />
 *   ))}
 * </div>
 * ```
 */
export function StatCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading statistics"
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon skeleton */}
        <div className="p-3 rounded-lg bg-gray-100">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* Trend indicator skeleton */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div>
        {/* Title skeleton */}
        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2" />
        {/* Value skeleton */}
        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
      </div>
      <span className="sr-only">Loading statistics data...</span>
    </div>
  );
}
