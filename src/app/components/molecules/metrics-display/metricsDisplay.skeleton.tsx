/**
 * Loading skeleton for the MetricsDisplay component.
 *
 * Provides a visual placeholder while daily metrics data is being loaded,
 * mimicking the layout of the actual metrics display with shimmer/pulse effects.
 *
 * Features:
 * - Skeleton for date heading
 * - Four metric item placeholders with icon circles and text lines
 * - Activities section skeleton with pill-shaped placeholders
 * - Pulse animation for loading feedback
 * - Matches spacing and layout of actual component
 *
 * @component
 * @returns {JSX.Element} The rendered skeleton loader
 *
 * @example
 * ```tsx
 * {isLoading ? <MetricsDisplaySkeleton /> : <MetricsDisplay {...data} />}
 * ```
 */
export function MetricsDisplaySkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" aria-label="Loading metrics data">
      <span className="sr-only">Loading daily metrics. Please wait.</span>
      {/* Date heading skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse" />

      {/* Metrics skeleton */}
      <div className="space-y-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 animate-pulse">
            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Activities skeleton */}
      <div className="pt-6 border-t border-border">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              style={{ width: `${80 + index * 20}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
