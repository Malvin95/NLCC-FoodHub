/**
 * Loading skeleton component that mirrors the layout of `InventoryStatusCard`.
 * 
 * Features:
 * - Animated pulsing effect using Tailwind's `animate-pulse`
 * - Matches exact spacing and dimensions of the real card
 * - Placeholder blocks for category name, status pill, quantities, progress bar, and percentage
 * - Subtle gray background matching loading state conventions
 * 
 * Usage:
 * Display this component while inventory data is being fetched to provide
 * visual feedback and reduce perceived loading time.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * // Show skeleton while loading
 * {isLoading ? (
 *   <InventoryStatusCardSkeleton />
 * ) : (
 *   <InventoryStatusCard item={inventoryItem} />
 * )}
 * ```
 * 
 * @see {@link InventoryStatusCard} for the actual card component
 */
export default function InventoryStatusCardSkeleton() {
  return (
    <div role="status" aria-label="Loading inventory item status" className="p-4 rounded-lg border bg-gray-50 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2" />
      </div>
      <div className="h-3 w-20 bg-gray-200 rounded" />
      <span className="sr-only">Loading inventory item status...</span>
    </div>
  );
}
