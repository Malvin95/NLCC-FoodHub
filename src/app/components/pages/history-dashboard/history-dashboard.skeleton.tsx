/**
 * Loading skeleton for the History Dashboard component.
 *
 * Provides a visual placeholder while historical data is being loaded,
 * mimicking the layout of the actual dashboard with shimmer/pulse effects.
 */

export function HistoryDashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar skeleton */}
      <div className="rounded-md border bg-white p-3 shadow-md dark:bg-gray-800 animate-pulse">
        <div className="space-y-2">
          {/* Header */}
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 42 }).map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gray-100 dark:bg-gray-600 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend skeleton */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></span>
        </div>
      </div>

      {/* Metrics panel skeleton */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="space-y-4">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
          {/* Metrics items */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
