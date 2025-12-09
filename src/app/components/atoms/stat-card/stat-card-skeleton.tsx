/**
 * StatCardSkeleton component displays a loading placeholder matching StatCard's layout
 * 
 * Features:
 * - Matches StatCard dimensions and structure
 * - Animated pulse effect using Tailwind's animate-pulse
 * - Follows Next.js loading UI conventions
 * - Can be used with React Suspense boundaries
 * - Accessible with proper ARIA attributes
 * - Full dark mode support with theme-aware colors and shadows
 * - Smooth color transitions when switching themes
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
      className="bg-card dark:bg-slate-950 rounded-lg shadow-sm dark:shadow-md border border-border dark:border-slate-800 p-6 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon skeleton */}
        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800">
          <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        {/* Trend indicator skeleton */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="w-12 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
      <div>
        {/* Title skeleton */}
        <div className="w-32 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        {/* Value skeleton */}
        <div className="w-20 h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>
      <span className="sr-only">Loading statistics data...</span>
    </div>
  );
}
