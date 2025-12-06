/**
 * Loading skeleton component that mirrors the layout of `InventoryStatusBar`.
 * 
 * Features:
 * - Animated pulsing effect using Tailwind's `animate-pulse`
 * - Configurable number of placeholder cards (defaults to 3)
 * - Matches exact spacing and grid layout of the real component
 * - Includes heading placeholder and responsive grid
 * - Each card skeleton matches `InventoryStatusCardSkeleton` structure
 * 
 * Usage:
 * Display this component while inventory data is being fetched. The `count`
 * prop allows you to show the expected number of items for a more accurate
 * loading state.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.count=3] - Number of skeleton cards to display in the grid
 * 
 * @example
 * ```tsx
 * // Default with 3 skeleton cards
 * {isLoading && <InventoryStatusBarSkeleton />}
 * ```
 * 
 * @example
 * ```tsx
 * // Custom count matching expected items
 * {isLoading ? (
 *   <InventoryStatusBarSkeleton count={6} />
 * ) : (
 *   <InventoryStatusBar items={inventoryItems} />
 * )}
 * ```
 * 
 * @see {@link InventoryStatusBar} for the actual component
 * @see {@link InventoryStatusCardSkeleton} for individual card skeleton structure
 */
export default function InventoryStatusBarSkeleton({count = 3}: {count?: number}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse" role="status" aria-label="Loading inventory status">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-5 w-14 bg-gray-200 rounded" />
                </div>
                <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2" />
                </div>
                <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            ))}
        </div>
        <span className="sr-only">Loading inventory status...</span>
    </div>
  );
}
